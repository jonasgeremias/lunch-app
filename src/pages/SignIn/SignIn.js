import { useContext } from 'react'
import Paper from '@mui/material/Paper'
import useStyles from './useStyles'

import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'
import { AuthContext } from 'hooks/AuthContext'
import { Navigate } from 'react-router-dom'

import logo from "assets/images/logo512.png"

// import ForgotPasswordTab from './ForgotPasswordTab'
import SignInForm from './SignInForm/SignInForm'
import { ORIGIN_ROUTES } from 'constants/routes'
import { useGlobalStyles } from 'styles'

const SignIn = () => {
   const authContext = useContext(AuthContext);
   const { user, logIn } = authContext;
   const classes = useStyles()
   const gclasses = useGlobalStyles()

   if (!!user) return <Navigate to={ORIGIN_ROUTES} />
   return (
      <div className={gclasses.root}>
         <Paper className={gclasses.paper} elevation={1}>
            <Hidden smDown>
               <div className={classes.infoArea}>
                  <img src={logo} alt="Logo do sistema" width='75%' />
                  <Typography variant='h5' className={classes.version}>Versão {process.env.REACT_APP_VERSION}</Typography>
               </div>
            </Hidden>

            <div className={classes.tabsArea}>
               <SignInForm login={logIn}/>
            </div>

            <Hidden smUp>
               <div style={{ textAlign: 'center', width: '100%'}}>
                  <img src={logo} alt="Logo do sistema" width='40%' />
                  <Typography variant='h5' className={classes.version}>Versão {process.env.REACT_APP_VERSION}</Typography>
               </div>
            </Hidden>
         </Paper>
      </div>)
}

export default SignIn;