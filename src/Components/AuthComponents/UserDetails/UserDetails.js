import { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Layouts/Loader';
import BigLoader from '../../Layouts/BigLoader';
import useStyles from '../authStyles';
import { getCookie, setCookie } from '../../../helpers/CookiesHelper';
import axios from 'axios';

const UserDetails = () => {
    const classes = useStyles();
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [componentLoader, setComponentLoader] = useState(true);

    /**
     * Get User Details from Cookie & set state Values
     */
    const setUserDetails = () => {
        if (getCookie('google_login_data')) {
            const { firstName, lastName } = JSON.parse(getCookie('google_login_data'));
            setFirstName(firstName);
            setLastName(lastName);
        }
    }

    /**
     * Check User's Authorization & Redirection
     */
    useEffect(() => {
        if (getCookie('firebase_access_Token')) {
            setUserDetails();
            setComponentLoader(false);
        } else {
            history.push('/signup');
        }
    }, []);

    /**
     * Handler for User's Registration with DataBase
     * @param {object} event - to prevent default behaviour
     */
    const registerUserWithDB = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !city) {
            toast.error('Enter First Name, Last Name & City');
            return;
        }

        try {
            const signUpWithDbData = {
                firebase_id_token: getCookie('firebase_access_Token'),
                first_name: firstName,
                last_name: lastName,
                city
            }

            const signUpWithDb = await axios.post('https://b1.wealth42.com/nick-fury/api/user-view', signUpWithDbData);

            if (signUpWithDb.data && signUpWithDb.data.status == 'ERROR') {
                throw signUpWithDb.data.message.substring(0, 80) + '...';
            }

            setCookie('db_access_token', signUpWithDb.data.data.jwt_token, 15);
            setCookie('firebase_access_Token', null, 1);
            toast('Signin Successful');
            history.push('/');
        } catch (error) {
            toast.error('Failed to Signup ,' + error)
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
                        <div className={classes.paper} style={{ marginTop: '50px' }}>
                            <Typography component="h1" variant="h5">
                                Please confirm the details
                            </Typography>
                            <Typography variant="subtitle1">
                                we have fetched this from Google
                            </Typography>
                            <br />
                            <img src="./images/default_pic.png" alt="default-pic" style={{ maxWidth: '300' }} />
                            <br />
                            <form onSubmit={registerUserWithDB} className={classes.form} noValidate>
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="text" label="First Name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="text" label="Last Name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                                <TextField className={classes.formField} variant="filled" margin="normal" required fullWidth type="text" label="City"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                />
                                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                                    Next
                                </Button>
                            </form>
                        </div>
                    </Container>
                )
            }
        </>
    );
}

export default UserDetails;