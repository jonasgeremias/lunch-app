import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { changeInput } from 'utils'

import Typography from '@mui/material/Typography'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { DEF_PROPS_LOGIN } from 'constants/inputs'
import { validateInput } from 'utils'
import { useNavigate } from 'react-router-dom'


const USER_INITIAL_STATE = {
   email: 'admin@admin.com',
   email_error: '',
   password: '123456',
   password_error: '',
   loading: false,
}

const SignInForm = ({ login }) => {
   const gClasses = useGlobalStyles()

   const navigate = useNavigate();

   // const dispatch = useDispatch()
   const [sigInForm, setSigInForm] = useState(USER_INITIAL_STATE) // @pending remover inicial data

   const handleKeyPress = ({ key }) => {
      if (key === 'Enter') {
         handleLogin()
      }
   }

   const handleLogin = () => {
      console.log('Login')
      const { email, email_error, password, password_error } = sigInForm;
      const {isValid} = validateInput.sign(email, password)

      if (!Boolean(email_error) && !Boolean(password_error) && isValid) {
         login(email, password)
      }
   }

   const handleForgotPass = () => {
      navigate("/forgotpassword");
   }

   const handleChangeValue = id => ({ target }) => {
      const change = changeInput(target.value.replace(/ /g, ''), id)
      setSigInForm({ ...sigInForm, [change.id]: change.payload, [`${change.id}_error`]: change.error })
   }

   return (
      <form className={gClasses.signInTab}>
         <Typography variant="h4" align='center' className={clsx(gClasses.bold)}>
            Login
         </Typography>
         <div className={clsx(gClasses.bold, gClasses.marginTop24)}>
            <TextField {...DEF_PROPS_LOGIN.email} defaultValue={sigInForm.email} onChange={handleChangeValue('email')} error={Boolean(sigInForm.email_error)}
               onKeyPress={handleKeyPress} helperText={sigInForm.email_error} variant='outlined'
            />
            <TextField {...DEF_PROPS_LOGIN.password} defaultValue={sigInForm.password} onChange={handleChangeValue('password')}
               onKeyPress={handleKeyPress} helperText={sigInForm.password_error} variant='outlined' error={Boolean(sigInForm.password_error)}
            />

            <div className={gClasses.marginTop24}>
               <Button className={gClasses.primaryGradient} fullWidth disabled={sigInForm.loading} variant="contained" size='large' color="primary" onClick={handleLogin} disableElevation>
                  {sigInForm.loading ? 'Carregando' : 'Fazer login'}
               </Button>
            </div>

            <div className={gClasses.marginTop24}>
               <Button size='small' onClick={handleForgotPass} color='primary' className={clsx(gClasses.textTransformNone, gClasses.marginTop24, gClasses.marginBottom16)} fullWidth>
                  Esqueceu a senha?
               </Button>
            </div>
         </div>

      </form>
   )
}

export default SignInForm