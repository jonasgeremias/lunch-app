import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'

/**Circular progress indicator, with a text label */
const TextCircularProgress = ({ label, circleSize=24, className }) => {
    const gClasses = useGlobalStyles()

    return (
        <div className={ clsx(gClasses.flexColumnAlignCenterJustifyCenter, className) }>
            <CircularProgress size={ circleSize } className={ gClasses.marginBottom10 }/>
            <Typography>{ label || 'Carregando' }</Typography>
        </div>
    )
}
export default TextCircularProgress