import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OptionButton from './OptionButton';
import useStyles from './navStyles';
import FetchAPIData from '../../../helpers/FetchAPIData';
import { toast } from 'react-toastify';

const NavBar = () => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');

    const fetchUserData = async () => {
        try {
            const userData = await FetchAPIData('get', '/user-view');
            if (userData.data.status == 'OK') {
                setUserName(userData.data.data.first_name);
            }
        } catch (error) {
            toast.error('Failed to Fetch User Data');
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Hii {userName}
                    </Typography>
                    <OptionButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;