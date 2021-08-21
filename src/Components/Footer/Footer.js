import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        background: '#42474E',
    },
});

const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <footer className="my-sticky-footer" style={{
            textAlign: 'center',
            background: '#42474E',
            position: 'sticky',
            bottom: '0',
        }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction
                    icon={
                        <NavLink to="/">
                            <img src="./images/svgs/footer-nav/home.svg" alt="home" />
                        </NavLink>
                    }
                />

                <BottomNavigationAction
                    icon={
                        <NavLink to="/therapist">
                            <img src="./images/svgs/footer-nav/calender.svg" alt="calender" />
                        </NavLink>
                    }
                />

                <BottomNavigationAction
                    icon={
                        <NavLink to="/chat">
                            <img src="./images/svgs/footer-nav/chat.svg" alt="chat" />
                        </NavLink>
                    }
                />
            </BottomNavigation>
        </footer >
    );
}

export default Footer;