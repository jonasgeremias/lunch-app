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
   IconButton, Box, Grid, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DEF_PROPS } from 'constants/inputs';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
// import { updateExceptionsDatesinDB } from 'utils/firebase/companies';

const DatesExceptionsForm = ({ list, setList }) => {
   const [date, setDate] = useState('');
   const [description, setDescription] = useState('');
   const [typeOfDay, setTypeOfDay] = useState('on');
   // const [list, setList] = useState([]);
   const [editIndex, setEditIndex] = useState(null);
   const gClasses = useGlobalStyles()

   const handleAdd = () => {

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

         // updateExceptionsDatesinDB()

         setList(newList);
         setEditIndex(null);

      } else {
         setList([...tempList, newItem]);
      }

      setDate('');
      setDescription('');
      setTypeOfDay('on');
   };

   const handleDelete = (index) => {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
   };

   const handleEdit = (index) => {
      const itemToEdit = list[index];
      setDate(itemToEdit.date);
      setDescription(itemToEdit.description);
      setTypeOfDay(itemToEdit.typeOfDay);
      setEditIndex(index);
   };

   console.log(list)

   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <Typography variant="h6" gutterBottom>
            Adicionar feriado / ou dia esecifico de trabalho
         </Typography>

         <form onSubmit={(e) => { e.preventDefault(); handleAdd() }}>
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
                        <FormControlLabel value="on" control={<Radio />} label="Útil" />
                        <FormControlLabel value="off" control={<Radio />} label="Não útil" />
                     </RadioGroup>
                  </FormControl>
               </Grid>
               <Grid container item xs={12} md={4}>

                  <Button variant="contained" fullWidth color="primary" type="submit">{editIndex !== null ? 'Edit' : 'Add'}</Button>
               </Grid>
            </Grid>
         </form>
         {list.length > 0 &&
            <List>
               {list.map((item, index) => {
                  const date = new Date(item.date);
                  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                  const formattedDate = date.toLocaleDateString(undefined, options);
                  const isOff = item.typeOfDay === 'off';
                  return (
                     <ListItem key={index}>
                        <ListItemText primary={`(${item.date}) : ${formattedDate}`} secondary={<Typography variant="subtitle1" fontWeight="bold">{item.description}</Typography>} />
                        {isOff ? (<ListItemText disableTypography primary={<Typography variant="subtitle1" color="error">Dia não útil</Typography>} />
                        ) : (<ListItemText disableTypography primary={<Typography variant="subtitle1" color="primary">Dia útil</Typography>} />)}
                        <ListItemSecondaryAction>
                           <IconButton edge="end" size='large' aria-label="edit" color="primary" onClick={() => handleEdit(index)}>
                              <EditIcon />
                           </IconButton>
                           <IconButton edge="end" size='large' aria-label="delete" color="error" onClick={() => handleDelete(index)}>
                              <DeleteIcon />
                           </IconButton>
                        </ListItemSecondaryAction>
                     </ListItem>
                  );
               })}
            </List>
            }
      </Paper>)
}

export default DatesExceptionsForm