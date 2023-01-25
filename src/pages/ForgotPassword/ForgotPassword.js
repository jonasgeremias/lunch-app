import React, { useState } from 'react'
import useStyles from './useStyles'
import { Typography, TextField, Button, Paper } from '@mui/material'
// import { sendEmail, changeEmail } from './actions'
import { useGlobalStyles } from 'styles'
import { DEF_PROPS_LOGIN } from 'constants/inputs'
import clsx from 'clsx'
import { validateInput } from 'utils'
import { changeInput } from 'utils'
import { useNavigate } from 'react-router-dom'
import { sendResetEmail } from 'utils/firebase/auth'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';

const FORGOT_INITIAL_STATE = {
  mail: '',
  email_error: '',
  loading: false,
}

const ForgotPassword = () => {
  const [forgotForm, setForgotForm] = useState(FORGOT_INITIAL_STATE) // @pending remover inicial data
  const { email, email_error, loading } = forgotForm;
  const gClasses = useGlobalStyles()
  const navigate = useNavigate()
  const { showSnackBar } = useSnackBar();

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleResetPasswordEmail()
    }
  }

  const handleResetPasswordEmail = async () => {
    console.log('handleResetPasswordEmail')
    const { email, email_error } = forgotForm;
    const { isValid } = validateInput.forgotPassword(email)

    if (!Boolean(email_error) && isValid) {
      setForgotForm({ ...forgotForm, loading: true })
      const { error, message } = await sendResetEmail(email)
      console.log('logIn', error, message)
      showSnackBar(message, error ? 'error' : 'success')
      setForgotForm(FORGOT_INITIAL_STATE)
    }
  }

  const handleBack = () => {
    navigate('/signin')
  }

  const handleChangeValue = id => ({ target }) => {
    const change = changeInput(target.value.replace(/ /g, ''), id)
    setForgotForm({ ...forgotForm, [change.id]: change.payload, [`${change.id}_error`]: change.error })
  }

  return (
    <div className={gClasses.root}>
      <Paper className={gClasses.forgotArea} elevation={1}>
        <form>

          <Typography gutterBottom variant='h4' className={gClasses.bold}>Não se preocupe</Typography>
          <Typography >Digite o e-mail associado a sua conta, que iremos enviar uma mensagem com instruções de redefinição de senha</Typography>
          <div className={gClasses.height24} />


          <TextField {...DEF_PROPS_LOGIN.email} defaultValue={forgotForm.email} onChange={handleChangeValue('email')} error={Boolean(forgotForm.email_error)}
            onKeyPress={handleKeyPress} helperText={forgotForm.email_error} variant='outlined' />


          <div className={gClasses.height24} />
          <div className={gClasses.flexJustifySpaceBetween}>
            <Button disabled={loading} size='large' color="primary" onClick={handleBack} className={gClasses.textTransformNone}>
              Voltar
            </Button>

            <div className={gClasses.marginTop24}>
              <Button className={clsx(gClasses.primaryGradient, gClasses.textTransformNone)} fullWidth disabled={Boolean(loading || !email || email_error)} variant="contained" size='large' color="primary" onClick={handleResetPasswordEmail} disableElevation>
                {loading ? 'Enviando' : 'Enviar'}
              </Button>
            </div>

          </div>
        </form>
      </Paper>
    </div>
  )
}

export default ForgotPassword