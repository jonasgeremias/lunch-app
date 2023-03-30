import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { LOTTIE_OPTIONS } from 'constants/general'
import Lottie from "lottie-react";
import animations from 'assets/animations/index'
import { getTimestamp } from 'utils/firebase/firebase'
import { DEF_PROPS } from 'constants/inputs'
import { compareDifferentInput } from 'utils/compareDifferentInput'
import Menu from 'components/atoms/Menu/Menu'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import EditIcon from '@mui/icons-material/Edit';
import { getHours, getMinutes } from 'date-fns';
import { convertToDateTime } from 'utils/date'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




export const CardDetail = ({ formik, initialItem, status }) => {
   const { userData, company, org } = status;

   const gClasses = useGlobalStyles()
   const [statusToday, setStatusToday] = useState('')
   const [loading, setLoading] = useState(false)
   const [dialogVisible, setDialogVisible] = useState(false)

   const [timer, setTimer] = useState(false)
   const [dataNow, setDataNow] = useState(false)


   const getTimestampLocale = (date) => {
      return date.toLocaleString('en-US', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: 'numeric',
         minute: 'numeric',
         hour12: false
      })
   }


   const convertDates = async () => {

      const now = getTimestamp()
      const timestamp = now.toDate()
      const totalMinutes = getHours(timestamp) * 60 + getMinutes(timestamp);

      const closing = convertToDateTime(timestamp, org.closingListLunchTime)
      const closingMinutes = getHours(closing) * 60 + getMinutes(closing);

      const releasing = convertToDateTime(timestamp, org.releasingListLunchTime)
      const releasingMinutes = getHours(releasing) * 60 + getMinutes(releasing);


      const dayOfWeek = daysOfWeek[now.getDay()]; // get day of the week name

      let data = {
         now,
         closing: totalMinutes >= closingMinutes,
         releasing: totalMinutes >= releasingMinutes,
         dayOfWeek: dayOfWeek,
         workDay: org.schedule[`${dayOfWeek}`]
      }

      console.log('convertDates', data)

      setDataNow(data)
   }

   useEffect(() => {
      const timer = setInterval(() => {
         convertDates()
      }, 1000 * 60)
      setTimer(timer)
      convertDates()
   }, [])










   //-------------------------

   let myLunch = org.lunchTypes.filter(item => item.id === userData.lunchTypes)
   if (myLunch?.length !== 1) myLunch = { id: 'erro', name: 'error' }
   else myLunch = myLunch[0]

   const onCancel = (e) => {
      setDialogVisible(false)
   }

   const onConfirm = (e) => {
      setDialogVisible(false)
   }


   return (
      <>
         <Paper variant="outlined" className={gClasses.containerPaper}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Informações sobre Hoje
               </Typography >
            </div>

            <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <Grid item xs={12} md={6} className={gClasses.flexAlignCenter}>
                  <Typography variant='body' color='textSecondary'>Hora atual:</Typography>
                  <Typography variant='h4' color='textSecondary' className={gClasses.padding12}>{getTimestampLocale(dataNow)}</Typography>
               </Grid>

               <Grid item xs={12} md={6} className={gClasses.flexAlignCenter}>
                  <Typography variant='body' color='textSecondary'>Dia util:</Typography>
                  <Typography variant='h4' color='textSecondary' className={gClasses.padding12}>{dataNow.workDay}</Typography>
               </Grid>




               <Grid item xs={12} md={6} >
                  <Button edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={() => !dialogVisible && setDialogVisible(true)}>
                     <EditIcon /> Editar
                  </Button>
               </Grid>
            </Grid>
         </Paper>

         <Paper variant="outlined" className={gClasses.containerPaper}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Informações sobre seu almoço
               </Typography >
            </div>

            <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <Grid item xs={12} md={6} className={gClasses.flexAlignCenter}>
                  <Typography variant='body' color='textSecondary'>Seu almoço é sempre:</Typography>
                  <Typography variant='h4' color='textSecondary' className={gClasses.padding12}>{myLunch.name}</Typography>
               </Grid>
               <Grid item xs={12} md={6} >
                  <Button edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={() => !dialogVisible && setDialogVisible(true)}>
                     <EditIcon /> Editar
                  </Button>
               </Grid>
            </Grid>
         </Paper>



         {/* <Typography variant='h6' className={gClasses.opacity70}>
            Sempre:
            </Typography>
            <Typography variant='h2' color={myLunch.id == 'not' ? 'info' : 'error'}>
            {myLunch.name}
            </Typography>
            
            
            <Button className={clsx(gClasses.primaryGradient, gClasses.textTransformNone)} variant="contained" size='large' color="primary" disableElevation>
            Alterar padrão
            </Button>
            
            <Paper variant="outlined" align='center' className={clsx(gClasses.containerPaper, gClasses.marginTop40)} >
            <Typography variant='h4' align='center' className={gClasses.opacity70}>
            Sua escolha para hoje é
            </Typography>
            <Typography variant='h3' color='error'>
            {userData.lunchTypes}
            </Typography>
            <Button className={clsx(gClasses.primaryGradient, gClasses.textTransformNone)} variant="contained" size='large' color="primary" disableElevation>
               Alterar padrão
               </Button>
               </Paper>
               
               <Paper variant="outlined" align='center' className={clsx(gClasses.containerPaper, gClasses.marginTop40)} >
               <Typography variant='h4' align='center' className={gClasses.opacity70}>
               hoje o dia é {workDay ? 'de trabalho' : 'de descanso'}
               </Typography>
               </Paper>
               
               <Box sx={{ maxWidth: 300 }}>
               <Lottie  {...LOTTIE_OPTIONS(animations[`lunch`])} />
            </Box> */}


         <DialogContainer loading={loading} showCancel title={'Alterar opção de almoço'} onClose={onCancel} open={dialogVisible} maxWidth='xs'
            acceptLabel='Salvar' onAccept={onConfirm}
         >
            <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <Grid item xs={12} md={6} >
                  <Menu {...DEF_PROPS.menu}
                     inputProps={compareDifferentInput(initialItem, formik.values, 'lunchTypes')}
                     value={formik.values.lunchTypes}
                     label='Tipo de almoço é sempre:'
                     name='lunchTypes'
                     items={Object.values(org?.lunchTypes ? org.lunchTypes : {})}
                     nameKey='name'
                     idKey='id'
                     error={formik.touched["lunchTypes"] && Boolean(formik.errors["lunchTypes"])}
                     helperText={formik.touched["lunchTypes"] && formik.errors["lunchTypes"]}
                     onChange={formik.handleChange} />
               </Grid>
               <Grid item xs={12} md={6}>
                  <TextField
                     {...DEF_PROPS.quantity}
                     disabled={true}
                     inputProps={compareDifferentInput(initialItem, formik.values, 'lunchQuantity')}
                     name="lunchQuantity"
                     label='Quantidade de almoço'
                     value={formik.values.lunchQuantity}
                     onChange={formik.handleChange}
                     error={formik.touched.lunchQuantity && Boolean(formik.errors.lunchQuantity)}
                     helperText={formik.touched.lunchQuantity && formik.errors.lunchQuantity}
                  />
               </Grid>
            </Grid>
         </DialogContainer>

      </>
   )
}
