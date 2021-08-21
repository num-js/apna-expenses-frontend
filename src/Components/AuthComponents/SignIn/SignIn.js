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

const SignIn = () => {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInLoader, setSignInLoader] = useState(false);
    const [componentLoader, setComponentLoader] = useState(true);

    /**
     * Check User's Authorization & Redirection
     */
    useEffect(() => {
        // if (getCookie('db_access_token')) {
        //     history.push('/');
        // } else {
            setComponentLoader(false);
        // }
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
            setSignInLoader(false);
            toast('Signin Successful');
            history.push('/');
        } catch (error) {
            toast.error('Failed to Signup ,' + error)
        }
    }


    /**
     * Handler for Signin
     * @param {object} event - to prevent default behaviour
     */
    const signInHandler = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error('Enter Email and Password');
            return false;
        }

        try {
            setSignInLoader(true);
            const signInResponse = await Auth.signInWithEmailAndPassword(email, password);
            const firebaseAccessToken = await Auth.currentUser.getIdToken(true).then((token) => token);
            userLoginHandler(firebaseAccessToken);
        } catch (error) {
            toast.error('Failed to SignIn ,' + error);
            setSignInLoader(false);
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
                            <img src="./images/svgs/character_lappy.svg" alt="character-svg" style={{ maxWidth: '345' }} />
                            <Typography component="h1" variant="h5">
                                Welcome back to mozo
                            </Typography>
                            <Typography variant="subtitle1"> continue with </Typography>
                            <form className={classes.form} onSubmit={signInHandler}>
                                <TextField className={classes.formField} variant="filled" margin="normal" type="email" required fullWidth label="Email Address" autoComplete="email" autoFocus
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth label="Password" type="password" autoComplete="current-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button size="large" type="submit" fullWidth variant="contained" className={classes.submit} >
                                    Sign In &nbsp; {signInLoader && <Loader />}
                                </Button>
                                <Grid container alignItems="center" justify="center">
                                    <Grid item>
                                        Don't have an account?
                                        <Link to="signup">
                                            <spna style={{ marginLeft: '10px', color: 'white' }}>Sign Up</spna>
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

export default SignIn;