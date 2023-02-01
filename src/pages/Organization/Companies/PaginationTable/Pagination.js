import React from 'react'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import useStyles from './useStyles'
import { Typography } from '@mui/material'

const Pagination = ({ page, onChangePage, hasNextPage }) => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={ classes.tablePagination }>
            <IconButton onClick={ () => { onChangePage(page - 1) } } disabled={ page === 0 }>
                { theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
            </IconButton>
            <Typography>{ page + 1 }</Typography>
            <IconButton onClick={ () => { onChangePage(page + 1) }} disabled={ !hasNextPage }>
                { theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> }
            </IconButton>
        </div>
    )
}

export default Pagination