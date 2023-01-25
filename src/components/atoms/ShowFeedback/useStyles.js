import { DRAWER_WIDTH } from 'constants/general'

// import {createTheme } from '@mui/material/styles';
import {makeStyles} from '@mui/styles';

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        height: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        [theme.breakpoints.up('md')]: {
            paddingLeft: DRAWER_WIDTH.web,
        }
    },
    hideDrawer: {
        paddingLeft: 0
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    largeAnimation: {
        width: '10em',
        [theme.breakpoints.down('xl')]: {
            width: '12em',
        },
        [theme.breakpoints.down('sm')]: {
            width: '15em',
        },
        [theme.breakpoints.down('xs')]: {
            width: '20em',
        },
    },
    animation: {
        width: '5em',
        // [theme.breakpoints.up('xl')]: {
        //     width: '5em',
        // },
        // [theme.breakpoints.down('xl')]: {
        //     width: '6em',
        // },
        // [theme.breakpoints.down('sm')]: {
        //     width: '5em',
        // },
        // [theme.breakpoints.down('xs')]: {
        //     width: '5em',
        // },
        marginBottom: -20
    },
    texts: {
        marginTop: 30,
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        }
    }
}))