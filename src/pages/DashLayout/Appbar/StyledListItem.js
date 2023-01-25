import ListItem from '@mui/material/ListItem'
import withStyles  from '@mui/styles/withStyles'

const StyledListItem = withStyles(theme => ({
    root: {
        "&$selected": {
            borderLeft: '10px solid black',
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            borderLeftColor: theme.palette.primary.main,
            backgroundColor: 'rgba(20, 20, 20, .1)'
        }
    },
    selected: {}
}))(ListItem)

export default StyledListItem