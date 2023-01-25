import React from 'react'
import Typography from '@mui/material/Typography'
import useStyles from './useStyles'
// import Lottie from 'react-lottie'
import animations from 'assets/animations'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'

import { LOTTIE_OPTIONS } from 'constants/general'
import Lottie from "lottie-react";

/**Show an animation with a text to user */
const ShowFeedback = ({ title, animation, subtitle, button, large, fullScreen, style, className, hideDrawer }) => {
    const classes = useStyles()
    const gClasses = useGlobalStyles()
    

    return (
        <div className={ clsx(classes.container, fullScreen && classes.fullScreen, hideDrawer && classes.hideDrawer, className) } style={ style }>
            <div className={ clsx(classes.animation, large && classes.largeAnimation) }>
                <Lottie {...LOTTIE_OPTIONS(animations[animation])}/>
            </div>
            <div className={ clsx(classes.texts, large && gClasses.marginTop40) }>
                <Typography variant={ large ? 'h5' : 'h6' } className={ classes.title } align='center'>
                    { title }
                </Typography>
                <Typography align='center' className={ gClasses.opacity70 }>
                    { subtitle }
                </Typography>
            </div>
            { button ?
                <Link to={ button.to } className={ clsx(gClasses.marginTop16, gClasses.textDecorationNone ) }>
                    <Button variant="outlined" color="primary">{ button.label }</Button>
                </Link> : null
            }
        </div> 
    )
}
export default ShowFeedback