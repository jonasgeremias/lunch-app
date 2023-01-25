import {makeStyles} from '@mui/styles';

export default makeStyles(theme => ({
    background: {
        position: 'absolute',
        display: 'flex',
        padding: theme.spacing(4, 5, 6, 5),
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(4, 4, 6, 4),
        },
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        backgroundColor: '#fff',
        zIndex: 20
    },
}))