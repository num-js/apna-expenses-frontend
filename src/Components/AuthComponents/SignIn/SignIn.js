import { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Layouts/Loader';
import BigLoader from '../../Layouts/BigLoader';
import useStyles from '../authStyles';
import { getCookie, setCookie } from '../../../helpers/CookiesHelper';
import axios from 'axios';
import { INDEX, SIGNUP } from '../../../routes/routesConstants';
import FetchAPIData from '../../../helpers/FetchAPIData';

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
        //     setComponentLoader(false);
        // }
    }, []);

    const userLoginHandler = async () => {
        // try {


        // } catch (error) {
        //     toast.error('Failed to Signup ,' + error)
        // }
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

            const userSigninData = {
                email,
                password
            }

            const response = await FetchAPIData('post', '/signin', userSigninData);

            if (response) {
                toast.success(response.data.message);
                setCookie('apna-expenses-token', response.data.token);
                history.push(INDEX);
            }
            setSignInLoader(false);
        } catch (error) {
            toast.error('Failed to SignIn ,' + error);
            setSignInLoader(false);
        }
    }

    return (
        <>
            {
                !componentLoader ? (
                    <BigLoader />
                ) : (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                                <img src="./images/svgs/character_lappy.svg" alt="character-svg" style={{ maxWidth: '75%' }} />
                            <Typography component="h1" variant="h5">
                                    Welcome! to <span className="text-pink-600"> Apna Expenses </span>
                                </Typography>
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
                                            <Link to={SIGNUP}>
                                            <spna style={{ marginLeft: '10px', color: 'white' }}>Sign Up</spna>
                                        </Link>
                                    </Grid>
                                </Grid>
                                </form>
                        </div>
                    </Container>
                )
            }
        </>
    );
}

export default SignIn;