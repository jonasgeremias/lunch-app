import {makeStyles} from '@mui/styles';

export default makeStyles(theme => ({
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
        paddingTop: 4,
        paddingBotton: 4
    },
    avatar:{
      width: 24, 
      height: 24
    },
    tablePagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
}))