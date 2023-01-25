import {makeStyles} from '@mui/styles';

const theme = makeStyles(theme => ({
    // root: {
    //     backgroundColor: '#f4f5fc',
    //     height: '100vh',
    //     width: '100%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     margin: 0
    // },
    // paper: {
    //     overflow: 'hidden',
    //     height: '70%',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     width: '70%',
    //     margin: 0,
    //     borderRadius: 10,
    //     [theme.breakpoints.down('md')]: {
    //         width: '85%',
    //     },
    //     [theme.breakpoints.down('sm')]: {
    //         width: '100%',
    //         borderRadius: 0,
    //         height: '100%',
    //         flexDirection: 'column',
    //     },
    // },
    tabsArea: {
      //   width: '45%',
      //   height: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            // height: '70%',
        },
        [theme.breakpoints.up('xl')]: {
            width: '40%',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoArea: {
        backgroundImage: process.env.PUBLIC_URL + 'logo-v.png',
        width: '55%',
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    version: {
        fontSize: 16,
        color: theme.palette.primary.main,
        fontWeight: 600,
    }
}))

export default theme