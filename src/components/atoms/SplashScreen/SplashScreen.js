import React from 'react'
import Dialog from '@mui/material/Dialog'
import useStyles from './useStyles'

import logo from 'assets/images/logo512.png'

/**Splash screen, rendered when the aplication in loading data from firestore. Show the aplication logo */
const SplashScreen = () => {
    const classes = useStyles()
    
    return (
        <Dialog disableEscapeKeyDown open fullScreen>
            <div className={ classes.background }>
                {/* <img src={ 'images.internal.logo } alt="Logo do sistema" height='23%'/> */}
                <img src={logo} alt="Logo do sistema" height='30%'/>
            </div>
        </Dialog>
    )
}
export default SplashScreen