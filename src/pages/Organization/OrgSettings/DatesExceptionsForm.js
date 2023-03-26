import React, { useEffect, useState } from 'react';
import {
   Container,
   Typography,
   TextField,
   FormControl,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
   Button,
   List,
   ListItem,
   ListItemText,
   ListItemSecondaryAction,
   IconButton, Box, Grid, Paper, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DEF_PROPS } from 'constants/inputs';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
import { LoadingButton } from '@mui/lab';
import ConfirmDeleteDialog from 'components/molecules/ConfirmDeleteDialog/ConfirmDeleteDialog';
import { getHolidays } from 'utils/holidays';

const DatesExceptionsForm = ({ list, setList }) => {
   const [date, setDate] = useState('');
   const [year, setYear] = useState(new Date().getFullYear());
   const [loading, setDLoading] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [description, setDescription] = useState('');
   const [typeOfDay, setTypeOfDay] = useState('off');
   const [editIndex, setEditIndex] = useState(null);
   const gClasses = useGlobalStyles()

   const handleAdd = (e) => {
      e.preventDefault();
      const tempList = []
      if (list !== null) {
         if (tempList) {
            const existingIndex = tempList.findIndex((item) => item.date === date);
            if ((existingIndex !== -1) && (editIndex == null)) {
               alert('Date already exists!');
               setEditIndex(existingIndex);
               return;
            }
         }
      }

      const newItem = { date, description, typeOfDay };
      if (editIndex !== null) {
         const newList = [...tempList];
         newList[editIndex] = newItem;
         setList(newList);
         setEditIndex(null);

      } else {
         setList([...tempList, newItem]);
      }

      setDate('');
      setDescription('');
      setTypeOfDay('off');
   };

   const handleDelete = (index) => {
      const newList = Object.fromEntries(
         Object.entries(list).filter(([key, value]) => key !== index)
      );

      setList(newList, true);
   };

   const handleEdit = (index) => {
      const itemToEdit = list[index];
      setDate(itemToEdit.date);
      setDescription(itemToEdit.description);
      setTypeOfDay(itemToEdit.typeOfDay);
      setEditIndex(index);
   };

   // const getBrasilHolidays = () => {
   //    const holidaysInYear = getHolidays(year);
   //    setList(holidaysInYear)
   // }
   
   const handleConfirmDeleteHolidays = () => {
      setList([], true)
      setDeleteDialog(false)
   }

   return (
      <Paper variant="outlined" className={gClasses.containerPaper}>
            <Grid container justifyContent="space-between" className={gClasses.marginVertical8}>
               <Grid item className={gClasses.marginVertical8} textAlign="left">
                  <Typography variant="h6" gutterBottom>
                     Adicionar feriado / ou dia específico de trabalho
                  </Typography>
               </Grid>
               <Grid item className={gClasses.marginVertical8} textAlign="right">
                  <Button
                     disabled={Boolean(loading)}
                     onClick={(e) => setDeleteDialog(true)}
                     color="error"
                  >
                     Apagar todos os feriados/dias uteis
                  </Button>
                  {/* @info para buscar feriados do ano 
                     <LoadingButton
                     disabled={Boolean(loading) || Object.keys(list).length !== 0}
                     color="primary"
                     onClick={(e) => getBrasilHolidays()}
                     variant='outlined'
                     loading={loading}
                     startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
                  >
                     {`Buscar Feriados deste ano (${year})`}
                  </LoadingButton> */}

               </Grid>
            </Grid>


         <Paper elevation={0} variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <form onSubmit={handleAdd}>
               <Grid container item spacing={2}>
                  <Grid container item xs={12} md={4}>
                     <TextField
                        {...DEF_PROPS.date}
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                     />
                  </Grid>
                  <Grid container item xs={12} md={4}>
                     <TextField
                        {...DEF_PROPS.description}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </Grid>
                  <Grid container item xs={12} md={4}>
                     <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo de dia</FormLabel>
                        <RadioGroup
                           row
                           aria-label="Tipo de dia"
                           name="typeOfDay"
                           value={typeOfDay}
                           onChange={(e) => setTypeOfDay(e.target.value)}
                        >
                           <FormControlLabel value="off" control={<Radio />} label="Não útil" />
                           <FormControlLabel value="on" control={<Radio />} label="Útil" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  <Grid container item xs={12} md={4}>
                     <Button variant="contained" fullWidth color="primary" type="submit">{editIndex !== null ? 'Edit' : 'Add'}</Button>
                  </Grid>
               </Grid>
            </form>
            {<List>
               {list ?
                  Object.keys(list).sort((a, b) => {
                     const dateA = new Date(a);
                     const dateB = new Date(b);
                     return dateA - dateB;
                  }).map((key) => {
                     const item = list[key]
                     const date = new Date(item.date);
                     const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                     const formattedDate = date.toLocaleDateString(undefined, options);
                     const isOff = item.typeOfDay === 'off';
                     const isOn = item.typeOfDay === 'on';
                     return (
                        <ListItem key={key} className={gClasses.hover}>
                           <Grid container item xs={7}>

                              <ListItemText primary={`(${date.toLocaleDateString('pt-BR')}) : ${formattedDate}`} secondary={<Typography variant="subtitle1" fontWeight="bold">{item.description}</Typography>} />
                           </Grid>

                           <Grid container item xs={2}>

                              {isOff && (<ListItemText disableTypography primary={<Typography variant="subtitle1" color="error">Dia não útil</Typography>} />)}
                              {isOn && (<ListItemText disableTypography primary={<Typography variant="subtitle1" color="primary">Dia útil</Typography>} />)}
                              {!isOn && !isOff && (<ListItemText disableTypography primary={<Typography variant="subtitle1" color="secondary">{item.typeOfDay}</Typography>} />)}

                           </Grid>
                           <Grid container item xs={3}>

                              <ListItemSecondaryAction>
                                 <IconButton edge="end" size='large' aria-label="edit" color="primary" onClick={() => handleEdit(key)}>
                                    <EditIcon />
                                 </IconButton>
                                 <IconButton edge="end" size='large' aria-label="delete" color="error" onClick={() => handleDelete(key)}>
                                    <DeleteIcon />
                                 </IconButton>
                              </ListItemSecondaryAction>
                           </Grid>
                        </ListItem>
                     );
                  })
                  : null}
            </List>
            }
         </Paper>

         <ConfirmDeleteDialog
            variantTitle='h4'
            visible={Boolean(deleteDialog)}
            onCancel={() => setDeleteDialog(false)}
            onConfirm={handleConfirmDeleteHolidays}
            title='Confirmar exclusão' description='Tem certeza que deseja excluir todos os feriados e dias uteis configurados?'
         />



      </Paper>)
}

export default DatesExceptionsForm