import { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Layouts/Loader';
import BigLoader from '../../Layouts/BigLoader';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import useStyles from '../authStyles';
import { getCookie, setCookie } from '../../../helpers/CookiesHelper';
import axios from 'axios';
import { Auth } from '../../../firebase-configs/firebase';

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpLoader, setSignUpLoader] = useState(false);
    const [componentLoader, setComponentLoader] = useState(true);

    /**
     * Check User's Authorization & Redirection
     */
    useEffect(() => {
        if (getCookie('db_access_token')) {
            history.push('/');
        } else {
            setComponentLoader(false);
        }
    }, []);

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
            toast('SignIn Successful');
            history.push('/');
        } catch (error) {
            toast.error('Failed to Signup ,' + error)
        }
    }

    /**
     * Handler for Signup
     * @param {object} event - to prevent default behaviour
     */
    const signUpHandler = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error('Enter Email and Password');
            return;
        }

        try {
            setSignUpLoader(true);
            const signupData = await Auth.createUserWithEmailAndPassword(email, password);
            if (signupData) {
                const firebaseAccessToken = await Auth.currentUser.getIdToken(true).then((token) => token);
                if (firebaseAccessToken) {
                    if (signupData.additionalUserInfo.isNewUser) {
                        setCookie('firebase_access_Token', firebaseAccessToken, 10);
                        toast.warning('SignUp in progress.. Redirecting. ');
                        history.push('/user-details');
                    } else {
                        userLoginHandler(firebaseAccessToken);
                    }
                }
            }
        } catch (error) {
            toast.error('Failed to Signup ,' + error)
            setSignUpLoader(false);
        }
    }

    return (
        <>
            {
                componentLoader ? (
                    <BigLoader />
                ) : (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <img src="./images/svgs/character_lappy_support.svg"  alt="character-svg" style={{ maxWidth: '345' }} />
                            <Typography component="h1" variant="h5">
                                Welcome to muzo
                            </Typography>
                            <Typography variant="subtitle1">
                                continue with
                            </Typography>
                            <form onSubmit={signUpHandler} className={classes.form} noValidate>
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="email" label="Email Address" autoComplete="email" autoFocus
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth label="Password" type="password" autoComplete="current-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                                    Sign Up &nbsp; {signUpLoader && <Loader />}
                                </Button>
                                <Grid container alignItems="center" justify="center">
                                    <Grid item>
                                        Have an account?
                                        <Link to="/signin">
                                            <spna style={{ marginLeft: '10px', color: 'white' }}>Sign In</spna>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                            <GoogleSignIn />
                        </div>
                    </Container>
                )
            }
        </>
    );
}

export default SignUp;