import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    formField: {
        background: '#FFFFFF',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#2D3A4D',
        fontWeight: 700,
        background: '#2BFEBA',
        height: '53px',
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: '#2BFE6E',
        },
    },
    googleButton: {
        padding: '7px 25px',
        cursor: 'pointer',
        borderRadius: '30px',
        background: '#C5331E',
        border: '0px'
    }
}));

export default useStyles;