import React from 'react'
import { useGlobalStyles } from 'styles'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'

/**Container tab subtitle, with an optional description */
const TabSubtitle = ({ children, description, className, descriptionClassName, colorDescription }) => {
    const gClasses = useGlobalStyles()

    return (
        <>
            <Typography variant='h5' className={ clsx(gClasses.bold, !description && gClasses.marginBottom10, className) }>
                { children }
            </Typography>
            { description ? <Typography variant='h6' color={colorDescription? colorDescription :'textSecondary'} className={ clsx(gClasses.marginBottom10, descriptionClassName)}>{ description }</Typography> : null }
        </>
    )
}

export default TabSubtitle