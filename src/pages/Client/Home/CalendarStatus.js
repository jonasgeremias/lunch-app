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
import { DAYS_OF_WEEK, GET_DAY_WEEK_PT_ABREVIADO } from 'constants/general';
import { GET_DAY_WEEK_PT } from 'constants/general';
import { useBreakPoint } from 'hooks/useBreakPoint';
import { getLunchToday } from 'utils/date';

const useStyles = makeStyles((theme) => ({
   header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(1),
   },
   paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   notDay: {
      height: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      backgroundColor: theme.palette.action.hover,
      '&:hover': {
         backgroundColor: theme.palette.action.hover,
      },
   },
   day: {
      height: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      '&:hover': {
         backgroundColor: theme.palette.action.hover,
      },
      fontWeight: 'bold'
   },
   today: {
      backgroundColor: theme.palette.action.active,
      '&:hover': {
         backgroundColor: theme.palette.action.hover,
      }
   }
}
));

export default function CalendarStatus({ currentTime, changedLunchList, openLunchDialog, handleDayClick }) {
   const gClasses = useGlobalStyles()
   const [currentDate, setCurrentDate] = useState(currentTime);
   const classes = useStyles();
   const daysInMonth = [];
   const webScreen = useBreakPoint('up', 'sm')
   const startOfMonthDate = startOfMonth(currentDate);
   const endOfMonthDate = endOfMonth(currentDate);
   const startOfFirstWeek = startOfWeek(startOfMonthDate);
   const endOfLastWeek = endOfWeek(endOfMonthDate);
   
   // useEffect(() => {
   //    setCurrentDate(currentTime)
   // }, [changedLunchList])
   

   let day = startOfFirstWeek;
   while (day <= endOfLastWeek) {
      for (let i = 0; i < 7; i++) {
         daysInMonth.push(day);
         day = addDays(day, 1);
      }
   }

   const handlePrevMonth = () => {
      setCurrentDate(subDays(startOfMonth(currentDate), 1));
   };

   const handleNextMonth = () => {
      setCurrentDate(addDays(endOfMonth(currentDate), 1));
   };

   return (
      <>
         <Paper variant="outlined" className={clsx(gClasses.containerPaper, gClasses.textCenter)}>
            <div className={classes.header}>
               <IconButton onClick={handlePrevMonth}>
                  <ChevronLeftIcon />
               </IconButton>
               <Typography variant="h5" component="h2">
                  {format(currentDate, 'MMMM yyyy')}
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
                     month: currentDate.getMonth()+1,
                     year: currentDate.getFullYear()
                  }

                  let item = null;
                  if (changedLunchList?.data?.length > 0) item = changedLunchList.data.filter((item) => (item.day === date.day
                     && item.month === date.month && item.year === date.year))
                  
                  if (item != null) {
                     // @pending ver isso, mas vai ter que baixar as exceções da org comparar
                  }

                  return (
                     <Grid item xs={1.7} key={day}>
                        <div
                           className={`${classes.paper} ${isSameMonth(day, currentDate) ? classes.day : classes.notDay} ${isSameDay(day, currentDate) ? classes.today : ''}`}
                           onClick={() => console.log(day)}
                        >
                           {format(day, 'd')}
                        </div>

                     </Grid>
                  )
               }
               )}
            </Grid>
         </Paper>
      </>
   )
}


