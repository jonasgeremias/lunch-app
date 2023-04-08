import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { DAYS_OF_WEEK, GET_DAY_WEEK_PT } from 'constants/general'
import { getTimestamp } from 'utils/firebase/firebase'
import { getHours, getMinutes } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { convertToDateTime } from 'utils/date'
// import DialogChangeDate from './DialogChangeDate/DialogChangeDate'
import { useOrgContext } from 'hooks/OrgContext'
import { useAuthContext } from 'hooks/AuthContext'
// import { lunchChangesInitial } from './ClientUpdateLunchSettings/getInputs'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'
// import { useBreakPoint } from 'hooks/useBreakPoint'

export const CardDetail = ({ currentTime, lunchChangesToday, openLunchDialog }) => {
   const { userData } = useAuthContext()
   const { org } = useOrgContext()
   const { showSnackBar } = useSnackBar()
   const gClasses = useGlobalStyles()
   const [statusDate, setStatusDate] = useState();
   const [lunchTodayNotDefault, setLunchTodayNotDefault] = useState(false);

   useEffect(() => {
      convertDates(currentTime, org)
   }, [currentTime, lunchChangesToday, userData]);

   const convertDates = () => {
      const totalMinutes = getHours(currentTime) * 60 + getMinutes(currentTime);
      const closing = convertToDateTime(currentTime, org.closingListLunchTime)
      const closingMinutes = getHours(closing) * 60 + getMinutes(closing);
      const releasing = convertToDateTime(currentTime, org.releasingListLunchTime)
      const releasingMinutes = getHours(releasing) * 60 + getMinutes(releasing);
      const dayOfWeek = DAYS_OF_WEEK[currentTime.getDay()]; // get day of the week name

      let lunchToday = {}
      
      const lunch_today = (Object.keys(lunchChangesToday).length !== 0) && (lunchChangesToday.lunchTypes != 'default');
      console.log('lunch_today', lunch_today)
      
      
      if (lunch_today) lunchToday = lunchChangesToday;
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
      // console.log('lunchChangesToday', lunchChangesToday)
      let status_date = {
         closing: totalMinutes >= closingMinutes,
         releasing: totalMinutes >= releasingMinutes,
         dayOfWeek: GET_DAY_WEEK_PT[`${dayOfWeek}`],
         workDay: org.schedule[`${dayOfWeek}`],
         lunchToday: lunchToday
      }

      setLunchTodayNotDefault(lunch_today) // indica que não é a configuração e sim uma exceção
      setStatusDate(status_date)
   }

   const handleClickOpenDialog = (e) => {
      if (!statusDate?.closing) {
         openLunchDialog(statusDate?.lunchToday, false)
      }
      else { // Aqui nem chega a acontecer porque o botão é desabilitado
         showSnackBar('O horário para mudanças no almoço ja fechou', 'warning')
      }
   }

   const getNowDateString = (time) => {
      const year = (time.getFullYear()).toString().padStart(4, '0');
      const month = (time.getMonth() + 1).toString().padStart(2, '0');
      const day = (time.getDate()).toString().padStart(2, '0');
      const hour = (time.getHours()).toString().padStart(2, '0');
      const minutes = (time.getMinutes()).toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hour}:${minutes}`
   }

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
              
               {!lunchTodayNotDefault && <Typography variant='h6' padding={1} color='secondary'>(Configuração)</Typography>}
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
