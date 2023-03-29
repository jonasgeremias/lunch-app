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
const ShowFeedback = ({ title, animation, subtitle, button, fullScreen}) => {
    const classes = useStyles()
    const gClasses = useGlobalStyles()
    

    return (
        <div className={clsx(classes.container, fullScreen && classes.fullScreen)}>
            <Lottie className={classes.largeAnimation} {...LOTTIE_OPTIONS(animations[animation])}/>
            <div className={ clsx(classes.texts, gClasses.marginTop40) }>
                <Typography variant='h5' className={ classes.title } align='center'>
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