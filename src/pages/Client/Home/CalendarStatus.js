import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth, isSameDay, addDays, subDays } from 'date-fns';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx';
import { useGlobalStyles } from 'styles';
import { DAYS_OF_WEEK, GET_DAY_WEEK_PT_ABREVIADO, MONTHS } from 'constants/general';
import { GET_DAY_WEEK_PT } from 'constants/general';
import { useBreakPoint } from 'hooks/useBreakPoint';
import { getLunchToday, testDateBeforeCurrent } from 'utils/date';
import { useOrgContext } from 'hooks/OrgContext';

import colors from 'styles/colors';
import { useAuthContext } from 'hooks/AuthContext';
import { Tooltip } from '@mui/material';

// calendar: {
//    today: {text: '#4A4A4A', background: '#54871E'},
//    notDay: {text: '#4A4A4A', background: '#54871E'},
//    notWorkDay: {text: '#4A4A4A', background: '#9C1128'},
//    lunchNot: {text: '#4A4A4A', background: '#CF9911'},
//    lunchOption: {text: '#4A4A4A', background: '#0288D1'}
//  }

const useStyles = makeStyles((theme) => ({
   header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(1),
      fontWeight: 'bold'
   },
   paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   notDay: {
      backgroundColor: colors.calendar.notDay.background,
      color: colors.calendar.notDay.text,
   },
   day: {
      height: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
         filter: 'brightness(0.8)',
         transition: 'background-color 0.3s ease',
      },
   },
   workDay: {
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      fontWeight: 'bold'
   },
   notWorkDay: {
      backgroundColor: colors.calendar.notWorkDay.background,
      color: colors.calendar.notWorkDay.text,
      fontWeight: 'bold'
   },
   today: {
      border: '3px solid ' + colors.calendar.today.background,
   },
   not: {
      backgroundColor: colors.calendar.lunchNot.background,
      color: colors.calendar.lunchNot.text,
   },
   lunch: {
      backgroundColor: colors.calendar.lunchOption.background,
      color: colors.calendar.lunchOption.text,
   },
   delivery: {
      backgroundColor: colors.calendar.deliveryOption.background,
      color: colors.calendar.deliveryOption.text,
   }
}
));


export default function CalendarStatus({ currentTime, changedLunch, openLunchDialog }) {
   const gClasses = useGlobalStyles()
   const classes = useStyles();
   const webScreen = useBreakPoint('up', 'sm')

   const { org } = useOrgContext()
   const { userData } = useAuthContext()
   const [currentDate, setCurrentDate] = useState(currentTime);
   const [referenceDate, setReferenceDate] = useState(currentTime);

   // @pending
   const startOfMonthDate = startOfMonth(referenceDate);
   const endOfMonthDate = endOfMonth(referenceDate);
   const startOfFirstWeek = startOfWeek(startOfMonthDate);
   const endOfLastWeek = endOfWeek(endOfMonthDate);
   const daysInMonth = [];

   // useEffect(() => {
   //    // console.log('changedLunch', changedLunch);
   // }, [changedLunch])

   let day = startOfFirstWeek;
   while (day <= endOfLastWeek) {
      for (let i = 0; i < 7; i++) {
         daysInMonth.push(day);
         day = addDays(day, 1);
      }
   }

   const handlePrevMonth = () => {
      setReferenceDate(subDays(startOfMonth(referenceDate), 1));
   };

   const handleNextMonth = () => {
      setReferenceDate(addDays(endOfMonth(referenceDate), 1));
   };

   const isWorkDay = (date, org) => {
      const arrayDatesExceptions = Object.values(org?.datesExceptions)
      // Aqui tem um map para ver cada exceção
      if (arrayDatesExceptions?.length > 0) {
         for (let id in arrayDatesExceptions) {
            const item = arrayDatesExceptions[id]
            const dateObject = new Date(item.date.replace('-', '/'));
            // Se encontrou uma exceção
            if (getLunchToday(date, dateObject)) {
               if (item.typeOfDay == 'off') return false;
               else return true;
            }
         }
      }
      // aqui precisa analisar os dias da semana caso nao tenha uma exceção
      return org?.schedule[`${date.dayWeek}`];
   }

   // @audit parei aqui, bug de não salvar a lista, e não está buscando o valor da exceção (changedLunch)
   const handleDayClick = (day) => {
      
      
      const lunch = {
         day: day.getDate(),
         month: day.getMonth() + 1,
         year: day.getFullYear(),
         lunchTypes: userData.lunchTypes,
         restaurantApproved: false,
         dayWeek: DAYS_OF_WEEK[day.getDay()]
      }
            
      const sameMonth = isSameMonth(day, referenceDate)
      const workDay = sameMonth ? isWorkDay(lunch, org) : false;
      const dayBeforeCurrentDate = testDateBeforeCurrent(day, referenceDate)
      
      
      
      
      
      if (sameMonth && workDay && !dayBeforeCurrentDate)
         openLunchDialog( lunch, false)
      
      
      console.log('day', sameMonth, workDay,dayBeforeCurrentDate)
   }
   
   
   return (
      <>
         <Paper variant="outlined" className={clsx(gClasses.containerPaper, gClasses.textCenter)}>
            <div className={classes.header}>
               <IconButton onClick={handlePrevMonth}>
                  <ChevronLeftIcon />
               </IconButton>
               <Typography variant="h5" component="h2">
                  {MONTHS[`${referenceDate.getMonth() + 1}`] + `, ${referenceDate.getFullYear()}`}
               </Typography>
               <IconButton onClick={handleNextMonth}>
                  <ChevronRightIcon />
               </IconButton>
            </div>
            <Grid container item >
               {DAYS_OF_WEEK.map((dayOfWeek) => (
                  <Grid item xs={1.7} key={dayOfWeek}>
                     {webScreen ?
                        <div className={classes.paper}>{GET_DAY_WEEK_PT[`${dayOfWeek}`]}</div>
                        :
                        <div className={classes.paper}>{GET_DAY_WEEK_PT_ABREVIADO[`${dayOfWeek}`]}</div>
                     }
                  </Grid>
               ))}
               {daysInMonth.map((day) => {
                  const date = {
                     day: day.getDate(),
                     month: day.getMonth() + 1,
                     year: day.getFullYear(),
                     dayWeek: DAYS_OF_WEEK[day.getDay()]
                  }

                  // Verificando se teve mudança no almoço.
                  let item = null;
                  if (changedLunch?.data?.changedLunchList?.length > 0) item = changedLunch.data.changedLunchList.filter((item) => (item.day === date.day
                     && item.month === date.month && item.year === date.year))


                  let myLunch = userData.lunchTypes;
                  // @pending ver isso, mas vai ter que baixar as exceções da org comparar
                  if (item?.length > 0) {
                     if (item[0]?.lunchTypes != 'default')
                        myLunch = item[0]?.lunchTypes
                  }

                  const notDay = !isSameMonth(day, referenceDate)

                  // Se não é um dia do mês nem verifica se é util
                  const workDay = !notDay ? isWorkDay(date, org) : false;
                  const dayBeforeCurrentDate = !testDateBeforeCurrent(day, referenceDate)
                  const today = isSameDay(day, currentDate);


                  let myClass = `${classes.paper} ${classes.day} `;
                  if (notDay) myClass += `${classes.notDay} `;
                  else myClass += `${workDay ? classes.workDay : classes.notWorkDay} `;
                  if (today) myClass += `${classes.today} `;

                  if (workDay)
                     myClass += `${classes[`${myLunch}`]} `;

                  let lunchTypesToday = org.lunchTypes.filter(item => item.id === myLunch)
                  if (lunchTypesToday?.length !== 1) lunchTypesToday = { id: 'erro', name: '-' }
                  else lunchTypesToday = lunchTypesToday[0]

                  return (
                     <Grid item xs={1.7} key={day}>
                        {workDay ?
                           <Tooltip placement="top" title={lunchTypesToday.name}>
                              <div
                                 className={myClass}
                                 onClick={() => handleDayClick(day)}
                              >
                                 {format(day, 'd')}
                              </div>
                           </Tooltip> : <div
                              className={myClass}
                           >
                              {format(day, 'd')}
                           </div>
                        }

                     </Grid>
                  )
               }
               )}
            </Grid>
         </Paper>
      </>
   )
}


