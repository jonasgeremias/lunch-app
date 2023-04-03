import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { DAYS_OF_WEEK, GET_DAY_WEEK_PT } from 'constants/general'
import { getTimestamp } from 'utils/firebase/firebase'
import { getHours, getMinutes } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';

import { convertToDateTime } from 'utils/date'
// import DialogChangeDate from './DialogChangeDate/DialogChangeDate'
import { useOrgContext } from 'hooks/OrgContext'
import { useAuthContext } from 'hooks/AuthContext'
// import { lunchChangesInitial } from './ClientUpdateLunchSettings/getInputs'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'
// import { useBreakPoint } from 'hooks/useBreakPoint'

export const CardDetail = ({ currentTime, lunchChangesToday, openLunchDialog }) => {
   const { userData, setAuthUserData } = useAuthContext()
   const { org } = useOrgContext()
   // const { company } = useCompanyContext()
   const { showSnackBar } = useSnackBar()
   // const webScreen = useBreakPoint('up', 'md')
   const gClasses = useGlobalStyles()
   const [statusDate, setStatusDate] = useState();
   // const [lunchChanges, setLunchChanges] = useState([]);
   // const [loadingDialog, setLoadingDialog] = useState(false);
   // const [showTodayDialogVisible, setShowTodayDialogVisible] = useState({ show: false, item: null });
   // @audit buscar do Foristore
   // const getLunchChanges = async () => {
      //    setLunchChanges(lunchChangesInitial)
      //    console.log('getLunchChanges', lunchChangesInitial)
      // }
      

   useEffect(() => {
      convertDates(currentTime, org)
   }, [currentTime, lunchChangesToday]);

   const convertDates = () => {
      const totalMinutes = getHours(currentTime) * 60 + getMinutes(currentTime);
      const closing = convertToDateTime(currentTime, org.closingListLunchTime)
      const closingMinutes = getHours(closing) * 60 + getMinutes(closing);
      const releasing = convertToDateTime(currentTime, org.releasingListLunchTime)
      const releasingMinutes = getHours(releasing) * 60 + getMinutes(releasing);
      const dayOfWeek = DAYS_OF_WEEK[currentTime.getDay()]; // get day of the week name

      let lunchToday = {}
      
      console.log('lunchChangesToday', lunchChangesToday)
      
      //if (lunchTodayArray?.length == 1) lunchToday = lunchTodayArray[0]
      if (Object.keys(lunchChangesToday).length !== 0) lunchToday = lunchChangesToday;
      else {
         lunchToday = {
            day: currentTime.getDate(),
            month: currentTime.getMonth() + 1,
            year: currentTime.getFullYear(),
            // datetime: currentTime,
            // lunchQuantity: userData.lunchQuantity,
            lunchTypes: userData.lunchTypes,
            restaurantApproved: false,
            // default: true
         }
      }
      console.log('lunchChangesToday', lunchChangesToday)
      let status_date = {
         closing: totalMinutes >= closingMinutes,
         releasing: totalMinutes >= releasingMinutes,
         dayOfWeek: GET_DAY_WEEK_PT[`${dayOfWeek}`],
         workDay: org.schedule[`${dayOfWeek}`],
         lunchToday: lunchToday
      }
      console.log('status_date', status_date)
      setStatusDate(status_date)
   }

   const handleClickOpenDialog = (e) => {
      if (!statusDate?.closing) {
         openLunchDialog(statusDate?.lunchToday, false)
      }
      else {
         showSnackBar('O horário para mudanças no almoço ja fechou', 'warning')
      }
   }

   const getNowDateString = (time) => {
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      const hour = time.getHours();
      const minutes = time.getMinutes();

      return `${day}/${month}/${year} ${hour}:${minutes}`
   }

   // let myLunch = org.lunchTypes.filter(item => item.id === userData.lunchTypes)
   // if (myLunch?.length !== 1) myLunch = { id: 'erro', name: 'error' }
   // else myLunch = myLunch[0]
   
   let lunchTypesToday = org.lunchTypes.filter(item => item.id === statusDate?.lunchToday?.lunchTypes)
   if (lunchTypesToday?.length !== 1) lunchTypesToday = { id: 'erro', name: '-' }
   else lunchTypesToday = lunchTypesToday[0]

   return (
      <>
            <div className={clsx(gClasses.flexJustifySpaceBetween)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Informações sobre Hoje - {`${getNowDateString(currentTime)}`}
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
                     <Button
                       className={gClasses.primaryGradient}
                        disabled={Boolean(statusDate?.closing)}
                        fullWidth edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={handleClickOpenDialog}>
                        <EditIcon /> Alterar hoje
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
      </>
   )
}
