import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Auth, googleLoginProvider } from '../../../firebase-configs/firebase';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import useStyles from '../authStyles';
import { setCookie } from '../../../helpers/CookiesHelper';
import axios from 'axios';


const GoogleSignIn = () => {
    const history = useHistory();
    const classes = useStyles();

    /**
     * Login with Firebase Token
     * @param {String} firebaseAccessToken 
     */
    const userLoginHandler = async (firebaseAccessToken) => {
        try {
            const firebaseIdToken = {
                firebase_id_token: firebaseAccessToken
            }

            const signInData = await axios.post('https://b1.wealth42.com/nick-fury/api/firebase-view', firebaseIdToken);

            if (signInData.data.status && signInData.data.status == 'ERROR') {
                throw signInData.data.message.substring(0, 80) + '...';
            }

            setCookie('db_access_token', signInData.data.data.jwt_token, 15);
            toast('Signin Successful');
            history.push('/');
        } catch (error) {
            toast.error('Failed to Signup ,' + error)
        }
    }


    /**
     * Handler for Login with Google
     */
    const googleLoginHandler = async () => {
        try {
            const googleLoginData = await Auth.signInWithPopup(googleLoginProvider)

            if (googleLoginData) {
                const firebaseAccessToken = await Auth.currentUser.getIdToken(true).then((token) => token);

                if (firebaseAccessToken) {
                    setCookie('firebase_access_Token', firebaseAccessToken, 10);
                    if (googleLoginData.additionalUserInfo.isNewUser) {
                        const userDetails = {
                            firstName: googleLoginData.additionalUserInfo.profile.given_name,
                            lastName: googleLoginData.additionalUserInfo.profile.family_name,
                        }

                        setCookie('google_login_data', JSON.stringify(userDetails), 1);
                        toast.warning('SignUp in progress.. Redirecting. ');
                        history.push('/user-details');
                    } else {
                        userLoginHandler(firebaseAccessToken);
                    }
                }
            }
        } catch (error) {
            toast.error('Failed to SignIn ,' + error)
        }
    }

    return (
        <>
            <Box pt={3} pb={5}>
                <Grid container alignItems="center" justify="center">
                    <Grid item>
                        {/* <button
                            className={classes.googleButton}
                            onClick={googleLoginHandler}
                        >
                            <img src="./images/svgs/gmail-logo.svg" alt="google-logo" style={{ maxWidth: '46px', maxHeight: '46px' }} />
                        </button> */}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default GoogleSignIn;