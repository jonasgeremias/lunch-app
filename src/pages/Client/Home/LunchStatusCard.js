import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { LOTTIE_OPTIONS } from 'constants/general'
import Lottie from "lottie-react";
import animations from 'assets/animations/index'
import { getTimestamp } from 'utils/firebase/firebase'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const LunchStatusCard = ({ userData, company, org }) => {
   const gClasses = useGlobalStyles()
   console.log('LunchStatusCard', userData, company, org)

   const [statusToday, setStatusToday] = useState('')

   useEffect(() => {
      console.log('init card')
   }, [])



   const date = new Date(); // current date
   const dayOfWeek = daysOfWeek[date.getDay()]; // get day of the week name

   const dateNow = getTimestamp()
   const dateClosing = new Date(company.dateClosing);
   const workDay = org.schedule[`${dayOfWeek}`]


   console.log('LunchStatusCard', date, dayOfWeek, dateNow, dateClosing, workDay)

   return (
      <Paper variant="outlined" align='center' className={gClasses.lunchStatusCard} >

         <Typography variant='h4' align='center' className={gClasses.opacity70}>
            Bem vindo(a) {userData.name}
         </Typography>

         <Paper variant="outlined" align='center' className={clsx(gClasses.containerPaper, gClasses.marginTop40)} >
            <Typography variant='h4' align='center' className={gClasses.opacity70}>
               Sua escolha de almoço é sempre
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
         </Box>


         {/* <div className={clsx(gClasses.flexColumn, gClasses.textCenter)}>
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.flexJustifySpaceBetween}>
            </div>
         </div>
         <Button className={clsx(gClasses.primaryGradient, gClasses.textTransformNone)} fullWidth variant="contained" size='large' color="primary" disableElevation>
            Alterar Almoço
         </Button> */}
      </Paper>
   )
}
