// import { makeStyles } from '@mui/styles';
import {makeStyles} from '@mui/styles';

export default makeStyles(theme => ({
    actions: {
        margin: theme.spacing(-1),
        padding: 0,
        marginTop: theme.spacing(3)
    },
    background: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        width: '100%',
    },
    float: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(3),
        width: 'fit-content' 
    }
}))