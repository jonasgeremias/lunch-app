import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth, isSameDay, addDays, subDays } from 'date-fns';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

export default function CalendarStatus({status, handleDayClick}) {
   const [currentDate, setCurrentDate] = useState(new Date());
   const classes = useStyles();
   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const daysInMonth = [];
   const startOfMonthDate = startOfMonth(currentDate);
   const endOfMonthDate = endOfMonth(currentDate);
   const startOfFirstWeek = startOfWeek(startOfMonthDate);
   const endOfLastWeek = endOfWeek(endOfMonthDate);

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
      <Paper elevation={0} variant='outlined'>
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
            {daysOfWeek.map((dayOfWeek) => (
               <Grid item xs={1.7} key={dayOfWeek}>
                  <div className={classes.paper}>{dayOfWeek}</div>
               </Grid>
            ))}
            {daysInMonth.map((day) => (
               <Grid item xs={1.7} key={day}>
                  <div
                     className={`${classes.paper} ${isSameMonth(day, currentDate) ? classes.day : classes.notDay} ${isSameDay(day, new Date()) ? classes.today : ''}`}
                     onClick={() => console.log(day)}
                     >
                     {format(day, 'd')}
                  </div>
               </Grid>
            ))}
         </Grid>
      </Paper>
      )
}
