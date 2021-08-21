import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Auth } from '../../../firebase';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../../../helpers/CookiesHelper';

const ITEM_HEIGHT = 48;
const OptionButton = () => {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        handleClose();
        await Auth.signOut();
        setCookie('db_access_token', null, 1);
        history.push('/signin');
    }

    const goToAddNote = () => {
        handleClose();
        history.push('/add-note');
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: 'white' }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={goToAddNote}>
                    + Add Note
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default OptionButton;