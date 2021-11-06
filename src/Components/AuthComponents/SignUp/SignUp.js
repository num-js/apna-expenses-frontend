import { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Layouts/Loader';
import BigLoader from '../../Layouts/BigLoader';
import useStyles from '../authStyles';
import { SIGNIN } from '../../../routes/routesConstants';
import FetchAPIData from '../../../helpers/FetchAPIData';

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpLoader, setSignUpLoader] = useState(false);
    const [componentLoader, setComponentLoader] = useState(true);

    /**
     * Check User's Authorization & Redirection
     */
    useEffect(() => {
        // if (getCookie('db_access_token')) {
        //     history.push('/');
        // } else {
        // setComponentLoader(false);
        // }
    }, []);

    /**
     * Handler for Signup
     * @param {object} event - to prevent default behaviour
     */
    const signUpHandler = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            toast.error('Enter Name, Email and Password');
            return;
        }

        try {
            setSignUpLoader(true);

            const userSignupData = {
                name,
                email,
                password
            }

            const response = await FetchAPIData('post', '/signup', userSignupData);

            if (response) {
                toast.success(response.data.message);
                history.push(SIGNIN);
            }
            setSignUpLoader(false);
        } catch (error) {
            setSignUpLoader(false);
            toast.error('Failed to Signup ,' + error)
            setSignUpLoader(false);
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
                                <img src="./images/svgs/character_lappy_support.svg" alt="character-svg" style={{ maxWidth: '75%' }} />
                            <Typography component="h1" variant="h5">
                                    Welcome! to <span className="text-pink-600"> Apna Expenses </span>
                            </Typography>
                            <form onSubmit={signUpHandler} className={classes.form} noValidate>
                                    <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="text" label="Name" autoComplete="name" autoFocus
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="email" label="Email Address" autoComplete="email"
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
                                            <Link to={SIGNIN}>
                                            <spna style={{ marginLeft: '10px', color: 'white' }}>Sign In</spna>
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

export default SignUp;