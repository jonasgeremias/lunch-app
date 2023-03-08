import React from "react";
import {  Grid, Typography } from "@mui/material";
import { Checkbox, FormControlLabel, Paper } from '@mui/material';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
import ExceptionsDatesForm from './ExceptionsDatesForm';

const DAYS_OF_WEEK = [
   { id: 'Monday', name: 'Segunda' },
   { id: 'Tuesday', name: 'Terça' },
   { id: 'Wednesday', name: 'Quarta' },
   { id: 'Thursday', name: 'Quinta' },
   { id: 'Friday', name: 'Sexta' },
   { id: 'Saturday', name: 'Sabado' },
   { id: 'Sunday', name: 'Domingo' }
];

const WorkScheduleForm = ({schedule, setSchedule}) => {
   const gClasses = useGlobalStyles()
   
   const handleScheduleChange = (id, value) => {
      setSchedule({ ...schedule, [id]: value });
   };
   
   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <Typography variant="h6" gutterBottom>
            Dias úteis da Semana
         </Typography>

         <Grid container item spacing={2}>
            {DAYS_OF_WEEK.map((day) => (
               <Grid item key={day.id}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={schedule[day.id]}
                           onChange={(e) => handleScheduleChange(day.id, e.target.checked)}
                           name={day.id}
                           color="primary"
                        />
                     }
                     label={day.name}
                  />

               </Grid>
            ))}
         </Grid>
         <ExceptionsDatesForm/>
      </Paper>
   );
};

export default WorkScheduleForm;


