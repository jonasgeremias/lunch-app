import {makeStyles} from '@mui/styles';
import { DRAWER_WIDTH } from 'constants/general'

const useStyles = makeStyles(theme => ({
    "&$selected": {
        borderLeft: '10px solid black',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        borderLeftColor: theme.palette.primary.main,
        backgroundColor: 'rgba(20, 20, 20, .1)'
    },
    web: {
        position: 'fixed',
        whiteSpace: 'nowrap',
        height: '100vh',
        width: DRAWER_WIDTH.web,
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: theme.zIndex.drawer,
    },
    drawerItem: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    mobile: {
        position: 'fixed',
        top: 48,
        left: 0,
        bottom: 0,
        whiteSpace: 'nowrap',
        height: '100vh',
        width: DRAWER_WIDTH.mobile,
        zIndex: theme.zIndex.appBar,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },
    drawerList: {
        marginTop: 10
    }
}))

export default useStyles