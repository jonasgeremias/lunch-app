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
   IconButton, Box, Grid, Paper, CircularProgress, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DEF_PROPS } from 'constants/inputs';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx'
import { compareDifferentInput } from 'utils/compareDifferentInput';

const LunchTypesSettings = ({ formik, initialItem }) => {
   const gClasses = useGlobalStyles();
   
   const handleChangePrice = (event) => {        
      let inputValue = event.target.value.replace(/\D/g, '');
      
      if (inputValue.length > 0) {
        inputValue = `${inputValue.slice(0, -2)},${inputValue.slice(-2)}`;
      }
      
      event.target.value = inputValue
      formik.handleChange(event)
    };
    
    
   return (
      <Paper variant="outlined" className={gClasses.containerPaper}>
         <Typography variant="h6" gutterBottom>
            Tipos de almoço
         </Typography>
         
         <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            {formik.values.lunchTypes.map((item, index) => (
               <Grid container spacing={{xs:2, md:3}}  key={item.id} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
                  <Grid item xs={6} md={5} >
                     <TextField
                        {...DEF_PROPS.name}
                        inputProps={compareDifferentInput(initialItem.lunchTypes[index], item,'name')}
                        name={`lunchTypes[${index}].name`}
                        value={item.name}
                        disabled={item.id == 'not'}
                        onChange={formik.handleChange}
                        error={formik.touched.lunchTypes?.[index]?.name && Boolean(formik.errors.lunchTypes?.[index]?.name)}
                        helperText={formik.touched.lunchTypes?.[index]?.name && formik.errors.lunchTypes?.[index]?.name}
                     />
                  </Grid>
                  <Grid item xs={6} md={5}>
                     <TextField
                        {...DEF_PROPS.price}
                        disabled={item.id == 'not'}
                        required={true}
                        name={`lunchTypes[${index}].price`}
                        value={item.price}
                        onChange={formik.handleChange}
                        error={formik.touched.lunchTypes?.[index]?.price && Boolean(formik.errors.lunchTypes?.[index]?.price)}
                        helperText={formik.touched.lunchTypes?.[index]?.price && formik.errors.lunchTypes?.[index]?.price}
                     />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <FormControlLabel
                        control={
                           <Checkbox
                              disabled={item.id == 'not'}
                              {...DEF_PROPS.checkbox}
                              name={`lunchTypes[${index}].enable`}
                              checked={item.enable}
                              onChange={handleChangePrice}
                           />
                        }
                        label="Habilitar"
                     />
                  </Grid>
               </Grid >
            ))}
         </Grid>




         {/* <Grid container item spacing={2}>
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
               </Grid> */}




      </Paper >)
}

export default LunchTypesSettings