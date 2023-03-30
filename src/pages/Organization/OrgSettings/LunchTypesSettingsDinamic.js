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
import AddIcon from '@mui/icons-material/Add';
import { DEF_PROPS } from 'constants/inputs';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
import { LoadingButton } from '@mui/lab';
import ConfirmDeleteDialog from 'components/molecules/ConfirmDeleteDialog/ConfirmDeleteDialog';
import { getHolidays } from 'utils/holidays';

const LunchTypesSettings = ({ list, setList }) => {
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [editIndex, setEditIndex] = useState(null);
   const gClasses = useGlobalStyles()

   const handleAdd = (e) => {
      e.preventDefault();
      const tempList = []
      if (list !== null) {
         if (tempList) {
            const existingIndex = tempList.findIndex((item) => item.name === name);
            if ((existingIndex !== -1) && (editIndex == null)) {
               alert('Date already exists!');
               setEditIndex(existingIndex);
               return;
            }
         }
      }

      const newItem = { name, price };
      if (editIndex !== null) {
         const newList = [...tempList];
         newList[editIndex] = newItem;
         setList(newList);
         setEditIndex(null);

      } else {
         setList([...tempList, newItem]);
      }

      setName('');
      setPrice('');
   };

   const handleDelete = (index) => {
      const newList = Object.fromEntries(
         Object.entries(list).filter(([key, value]) => key !== index)
      );
      
      setEditIndex(null)
      setList(newList, true);
   };

   const handleEdit = (index) => {
      const itemToEdit = list[index];
      setName(itemToEdit.name);
      setPrice(itemToEdit.price);
      setEditIndex(index);
   };

   const handleChangePrice = (event) => {        
      let inputValue = event.target.value.replace(/\D/g, '');
      
      if (inputValue.length > 0) {
        inputValue = `${inputValue.slice(0, -2)},${inputValue.slice(-2)}`;
      }
      
      setPrice(inputValue);
      // console.log(parseFloat(inputValue.replace(',', '.')))
    };
   
   
   return (
      <Paper variant="outlined" className={gClasses.containerPaper}>
         <Typography variant="h6" gutterBottom>
            Tipos de almoço
         </Typography>

         <Paper elevation={0} variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <form onSubmit={handleAdd}>
               <Grid container item spacing={2}>
                  <Grid container item xs={12} md={4}>
                     <TextField
                        {...DEF_PROPS.name}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </Grid>
                  <Grid container item xs={12} md={4}>
                     <TextField
                        {...DEF_PROPS.price}
                        required
                        value={price}
                        onChange={handleChangePrice}
                     />
                  </Grid>

                  <Grid container item xs={12} md={4}>
                     <Button variant="contained" color="primary" type="submit" disableElevation>
                        {editIndex !== null ? <EditIcon /> : <AddIcon />}
                     </Button>
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
                     return (
                        <ListItem key={key} className={gClasses.hover}>
                           <Grid container item xs={4}>
                              <ListItemText primary={<Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>}/>
                           </Grid>
                           <Grid container item xs={4}>
                              <ListItemText disableTypography primary={<Typography variant="subtitle1" fontWeight="bold">{'R$ ' + item.price}</Typography>} />
                           </Grid>
                           <Grid container item xs={4}>
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

      </Paper>)
}

export default LunchTypesSettings