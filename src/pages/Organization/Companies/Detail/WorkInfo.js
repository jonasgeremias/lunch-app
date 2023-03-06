// import { LoadingButton } from '@mui/lab'
// import { Button, CircularProgress, Grid } from '@mui/material'
// import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'
// import { useFormik } from 'formik'
// import { useAuthContext } from 'hooks/AuthContext'
// import { useOrgContext } from 'hooks/OrgContext'
// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import { useGlobalStyles } from 'styles'
// import { setCompanieData } from 'utils/firebase/companies'
// import ContactForm from '../ContactForm/ContactForm'
// import { initialValues, updateInitialValues, validationSchema } from '../ContactForm/getInputs'

// export const WorkInfo2 = ({ item, setItem}) => {
//    const gClasses = useGlobalStyles()
//    const [loading, setLoading] = useState(false)
//    const { showSnackBar } = useSnackBar()

//    // Para add no form
//    const { org } = useOrgContext()
//    const { user } = useAuthContext()


//    const formik = useFormik({
//       initialValues: initialValues,
//       validationSchema: validationSchema,
//       enableReinitialize: true,
//       onReset: () => {
//          formik.setValues(updateInitialValues(item))
//       },
//       onSubmit: async (values) => {
//          setLoading(true)
//          const dataset = { ...item, ...values }
//          const { error, message, data } = await setCompanieData(dataset, !item, user, org)
//          setLoading(false)
//          showSnackBar(message, error ? 'error' : 'success');
//          if (!error) {
//               setItem(data)
//          }
//       },
//    });

//    useEffect(() => {
//       formik.setValues(updateInitialValues(item))
//    }, [item])

//    const handleClick = (e) => {
//       console.log('handleClick')
//       formik.submitForm()
//    }

//    const handleCancel = (e) => {
//       console.log('handleCancel')
//       formik.setValues(updateInitialValues(item))
//    }

//    return (
//       <Grid container>
//          <Grid item xs={12}>
//             <ContactForm formik={formik} initialItem={item}/>
//          </Grid>
//          <Grid container justifyContent="flex-end" className={gClasses.marginVertical8}>
//             <Button onClick={handleCancel} color="inherit" disabled={Boolean(loading)}>Restaurar</Button>
//             <LoadingButton
//                disabled={Boolean(loading)}
//                color="primary"
//                onClick={handleClick}
//                variant='contained'
//                loading={loading}
//                startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
//             >
//                Salvar
//             </LoadingButton>
//          </Grid>
//       </Grid>
//    )
// }



//---------------
// import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
// import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

// const useStyles = makeStyles({
//   root: {
//     padding: '20px'
//   },
//   header: {
//     marginBottom: '20px'
//   },
//   label: {
//     fontWeight: 'bold'
//   },
//   input: {
//     marginTop: '10px',
//     width: '100%'
//   },
//   button: {
//     marginTop: '20px'
//   },
//   calendar: {
//     marginTop: '20px'
//   }
// });

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const defaultSettings = {
//   workingDays: {
//     Monday: true,
//     Tuesday: true,
//     Wednesday: true,
//     Thursday: true,
//     Friday: true,
//     Saturday: false,
//     Sunday: false
//   },
//   vacationDays: {
//     start: '',
//     end: ''
//   }
// };

// const ViewScreen = () => {
//   const classes = useStyles();
//   const [settings, setSettings] = useState(defaultSettings);

//   const handleWorkingDaysChange = (event) => {
//     setSettings({
//       ...settings,
//       workingDays: {
//         ...settings.workingDays,
//         [event.target.name]: event.target.checked
//       }
//     });
//   };

//   const handleVacationDaysChange = (event) => {
//     setSettings({
//       ...settings,
//       vacationDays: {
//         ...settings.vacationDays,
//         [event.target.name]: event.target.value
//       }
//     });
//   };

//   const handleSubmit = () => {
//     // Send settings to server or update local storage
//   };

//   return (
//     <Box className={classes.root}>
//       <Typography variant="h4" className={classes.header}>Company Settings</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Typography variant="h6" className={classes.label}>Working Days</Typography>
//           {daysOfWeek.map((day) => (
//             <FormControlLabel
//               key={day}
//               control={<Checkbox checked={settings.workingDays[day]} onChange={handleWorkingDaysChange} name={day} />}
//               label={day}
//             />
//           ))}
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" className={classes.label}>Vacation Days</Typography>
//           <TextField
//             label="Start Date"
//             type="date"
//             className={classes.input}
//             value={settings.vacationDays.start}
//             onChange={handleVacationDaysChange}
//             name="start"
//           />
//           <TextField
//             label="End Date"
//             type="date"
//             className={classes.input}
//             value={settings.vacationDays.end}
//             onChange={handleVacationDaysChange}
//             name="end"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>Save Settings</Button>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" className={classes.label}>Working Day Calendar</Typography>
//           <Box className={classes.calendar}>
//             {/* Render calendar with working days and vacation days */}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ViewScreen;
import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Checkbox, FormControlLabel, TextField, Paper } from '@mui/material';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
import { DEF_PROPS } from "constants/inputs";
import { DataGrid } from "@mui/x-data-grid";
import Menu from "components/atoms/Menu/Menu";


const ADD_EXCEPTION_COLUMNS = [
   { width: 250, sortable: true, editable: false, field: 'date', headerName: 'Data' },
   { width: 250, sortable: true, editable: false, field: 'type', headerName: 'Tipo' },
   { width: 250, sortable: true, editable: false, field: 'description', headerName: 'Descição' }
];

const TYPE_EXCEPTION_OPTIONS = {
   dayoff: { id: 'dayoff', name: 'Dia útil' },
   dayon: { id: 'dayon', name: 'Dia não útil' }
}

function AddDate() {
   const [item, setItem] = useState({});
   const [dates, setDates] = useState([]);
   const [table, setTable] = useState([]);
   const gClasses = useGlobalStyles()

   useEffect(() => {
      const newTable = dates.map(row => {
         console.log('row', row)
         row.type = TYPE_EXCEPTION_OPTIONS[row.type].name
         return row;
      })
     setTable(newTable)
   }, [dates])
   
   const updateData = (item) => {
      console.log('item', item)
      const obj = dates.find(row => row.id === item.id);
      if (!obj) {
         console.log('Add new companie')
         dates.push({...item, id: item.date})
      }
      const temp_table = dates.map(row => {
         if (row.id != item.id) return row;
         return item
      })
      setTable(temp_table)
   }
   
   const handleChange = (e, id) => {
      setItem({...item, [id]: e.target.value});
   };

   const handleAddDate = (e) => {
      e.preventDefault();
      updateData({ date: item.date, description: item.description, type: item.type})
   };

   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <Typography variant="h5" align="center" gutterBottom>
            Adicionar exceção
         </Typography>
         <Paper variant="outlined" className={clsx(gClasses.container)}>
            <form onSubmit={handleAddDate}>
               <Grid container item spacing={2}>
                  <Grid container item xs={4} md={4}>
                     <TextField
                        {...DEF_PROPS.date}
                        value={item.date}
                        onChange={(e) => handleChange(e, 'date')}
                     />
                  </Grid>
                  <Grid container item xs={4} md={4}>
                     <TextField
                        {...DEF_PROPS.description}
                        label="Descrição"
                        value={item.description}
                        onChange={(e) => handleChange(e, 'description')}
                        fullWidth
                     />
                  </Grid>
                  <Grid container item xs={4} md={4}>
                     <Menu {...DEF_PROPS.menu}
                        value={item.type}
                        label='Tipo de dia'
                        name='type'
                        items={Object.values(TYPE_EXCEPTION_OPTIONS)}
                        onChange={(e) => handleChange(e, 'type')} />
                  </Grid>

                  <Grid container item xs={6} md={4}>
                     <Button fullWidth variant="contained" type="submit">
                        Adicionar
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
         
         <DataGrid
            autoHeight
            columns={ADD_EXCEPTION_COLUMNS}
            rows={table} />

      </Paper >
   );
}

const days = [
   { id: 'Monday', name: 'Segunda' },
   { id: 'Tuesday', name: 'Terça' },
   { id: 'Wednesday', name: 'Quarta' },
   { id: 'Thursday', name: 'Quinta' },
   { id: 'Friday', name: 'Sexta' },
   { id: 'Saturday', name: 'Sabado' },
   { id: 'Sunday', name: 'Domingo' }];

const WorkScheduleForm = () => {
   const gClasses = useGlobalStyles()

   const [schedule, setSchedule] = useState({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
   });

   const [vacationDays, setVacationDays] = useState({})

   const handleScheduleChange = (id, value) => {
      setSchedule({ ...schedule, [id]: value });
   };

   const handleVacationDaysChange = (id, value) => {
      setVacationDays({ ...vacationDays, [id]: value });
   };

   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <Typography variant="h6" gutterBottom>
            Dias úteis da Semana
         </Typography>

         <Grid container item spacing={2}>
            {days.map((day) => (
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
         <AddDate />


      </Paper>
   );
};

export default WorkScheduleForm;


