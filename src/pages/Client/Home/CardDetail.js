import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { LOTTIE_OPTIONS } from 'constants/general'
import Lottie from "lottie-react";
import animations from 'assets/animations/index'
import { getTimestamp } from 'utils/firebase/firebase'

import EditIcon from '@mui/icons-material/Edit';
import { getHours, getMinutes } from 'date-fns';
import { convertToDateTime } from 'utils/date'
import DialogChangeDate from './DialogChangeDate/DialogChangeDate'

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const getDayWeek = {
   Sunday: "Domingo",
   Monday: "Segunda",
   Tuesday: "Terça",
   Wednesday: "Quarta",
   Thursday: "Quinta",
   Friday: "Sexta",
   Saturday: "Sábado"
}

const lunchChangesInitial = [
   { day: 30, mes: 3, ano: 2023, datetime: '2023/03/29', lunchQuantity: 1, lunchTypes: "not", restaurantApproved: true },
   { day: 31, mes: 3, ano: 2023, datetime: '2023/03/31', lunchQuantity: 1, lunchTypes: "lunch", restaurantApproved: false },
   { day: 1, mes: 4, ano: 2023, datetime: '2023/04/01', lunchQuantity: 1, lunchTypes: "delivery", restaurantApproved: false }
]



export const CardDetail = ({ data, formik, setDialogVisible }) => {
   const { userData, org } = data;
   const gClasses = useGlobalStyles()
   const [currentTime, setCurrentTime] = useState(getTimestamp().toDate());
   const [statusDate, setStatusDate] = useState();
   const [lunchChanges, setLunchChanges] = useState([]);
   const [loadingDialog, setLoadingDialog] = useState(false);
   const [showTodayDialogVisible, setShowTodayDialogVisible] = useState({ show: false, item: null });

   // @audit buscar do Foristore
   const getLunchChanges = async () => {
      setLunchChanges(lunchChangesInitial)
      console.log('getLunchChanges', lunchChangesInitial)
   }

   useEffect(() => {
      const interval = setInterval(() => {
         const now = getTimestamp().toDate();
         setCurrentTime(now);
      }, 1000 * 30);
      getLunchChanges()
      return () => clearInterval(interval);
   }, []);


   useEffect(() => {
      convertDates()
   }, [currentTime]);


   const getLunchToday = (item) => {
      const date = new Date(item.datetime)
      console.log('getLunchToday', date, currentTime)
      return (date.getDate() === currentTime.getDate()
         && date.getMonth() === currentTime.getMonth()
         && date.getFullYear() === currentTime.getFullYear())
   }

   const convertDates = () => {
      const totalMinutes = getHours(currentTime) * 60 + getMinutes(currentTime);
      const closing = convertToDateTime(currentTime, org.closingListLunchTime)
      const closingMinutes = getHours(closing) * 60 + getMinutes(closing);
      const releasing = convertToDateTime(currentTime, org.releasingListLunchTime)
      const releasingMinutes = getHours(releasing) * 60 + getMinutes(releasing);
      const dayOfWeek = daysOfWeek[currentTime.getDay()]; // get day of the week name
      const lunchTodayArray = lunchChanges.filter(getLunchToday)
      let lunchToday = {}

      if (lunchTodayArray?.length == 1) lunchToday = lunchTodayArray[0]
      else {
         lunchToday = {
            day: currentTime.getDate(),
            mes: currentTime.getMonth() + 1,
            ano: currentTime.getFullYear(),
            datetime: currentTime,
            lunchQuantity: userData.lunchQuantity,
            lunchTypes: userData.lunchTypes,
            restaurantApproved: false,
            default: true
         }
      }
      let status_date = {
         closing: totalMinutes >= closingMinutes,
         releasing: totalMinutes >= releasingMinutes,
         dayOfWeek: getDayWeek[`${dayOfWeek}`],
         workDay: org.schedule[`${dayOfWeek}`],
         lunchToday: lunchToday
      }
      console.log('status_date', status_date)
      setStatusDate(status_date)
   }


   const handleTodayDialogVisible = (item) => {
      setShowTodayDialogVisible({show: true, item })
   }


   let myLunch = org.lunchTypes.filter(item => item.id === userData.lunchTypes)
   if (myLunch?.length !== 1) myLunch = { id: 'erro', name: 'error' }
   else myLunch = myLunch[0]

   let lunchTypesToday = org.lunchTypes.filter(item => item.id === statusDate?.lunchToday?.lunchTypes)
   if (lunchTypesToday?.length !== 1) lunchTypesToday = { id: 'erro', name: 'error' }
   else lunchTypesToday = lunchTypesToday[0]

   return (
      <>
         <Paper variant="outlined" className={gClasses.containerPaper}>
            <div className={clsx(gClasses.flexJustifySpaceBetween)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Informações sobre Hoje
               </Typography >
            </div>
            <Grid container align='center' spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8, gClasses.textCenter)}>

               <Grid item xs={12} align='center'>
                  {
                     statusDate?.closing ? <Typography variant='h5' color='error'>O horário para mudanças no almoço ja fechou.</Typography>
                        : <Typography variant='h5' color='info'>Você ainda pode alterar seu almoço.</Typography>
                  }
               </Grid>

               <Grid item xs={12} align='center'>
                  <Typography variant='h6' color='textSecondary'>{`O almoço pode ser alterado até as`}</Typography>
                  <Typography variant='h6' fontWeight='bold' color='textSecondary'>{`${org.closingListLunchTime}`}</Typography>
               </Grid>
               <Grid item xs={12} align='center'>
                  <Typography variant='h5' color='textSecondary'> Seu almoço de hoje é:</Typography>
                  <Typography variant='h3' padding={5} color={lunchTypesToday.id == 'not' ? 'error' : 'info'}>{lunchTypesToday.name}</Typography>
               </Grid>
               <Grid item xs={12} align='center'>
                  <Grid item xs={12} md={4} align='center'>
                     <Button fullWidth edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={() => handleTodayDialogVisible(lunchTypesToday)}>

                        <EditIcon /> Alterar hoje
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>

         <Paper variant="outlined" className={clsx(gClasses.containerPaper, gClasses.textCenter)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Configuração de almoço
               </Typography >
            </div>

            <Grid container align='center' spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8, gClasses.textCenter)}>
               <Grid item xs={12} align='center'>
                  <Typography variant='body' color='textSecondary'>Seu almoço é sempre:</Typography>
                  <Typography variant='h5' padding={1} color={myLunch.id == 'not' ? 'error' : 'info'}>{myLunch.name}</Typography>
               </Grid>
               <Grid item xs={12} align='center'>
                  <Grid item xs={12} md={4} align='center'>
                     <Button fullWidth edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={() => setDialogVisible(true)}>
                        <EditIcon /> Alterar
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>

         <DialogChangeDate
            lunchChanges={statusDate?.lunchToday}
            org={org}
            userData={userData}
            loading={loadingDialog}
            onCloseDialog={()=> {console.log('Close'); setShowTodayDialogVisible({show: false, item: null })}}
            dialogVisible={showTodayDialogVisible.show}
            onConfirmDialog={()=> {setShowTodayDialogVisible({show: false, item: null })}}
         />
      </>
   )
}
