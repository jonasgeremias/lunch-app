import { Grid, TextField, Paper, Typography } from "@mui/material";
import { DEF_PROPS } from "constants/inputs";
import { useGlobalStyles } from "styles";
import clsx from 'clsx'
import { compareDifferentInput } from "utils/compareDifferentInput";


const ContactForm = ({ formik, initialItem }) => {
   const gClasses = useGlobalStyles()
      
   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
            <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
               Informações da organização
            </Typography >
         </div>

         <Grid container spacing={{xs:2, md:3}} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.id}
                  label='ID da organização'
                  name='orgId'
                  value={formik.values.orgId}
                  error={formik.touched["orgId"] && Boolean(formik.errors["orgId"])}
                  helperText={formik.touched["orgId"] && formik.errors["orgId"]}
               />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.name}
                  inputProps={compareDifferentInput(initialItem, formik.values,'name')}
                  label='Nome da organização'
                  name='name'
                  value={formik.values.name}
                  error={formik.touched["name"] && Boolean(formik.errors["name"])}
                  helperText={(formik.touched["name"] && formik.errors["name"])}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.time}
                  inputProps={compareDifferentInput(initialItem, formik.values,'closingListLunchTime')}
                  label='Hora de fechamento da lista do almoço'
                  name='closingListLunchTime'
                  value={formik.values.closingListLunchTime}
                  error={formik.touched["closingListLunchTime"] && Boolean(formik.errors["closingListLunchTime"])}
                  helperText={formik.touched["closingListLunchTime"] && formik.errors["closingListLunchTime"]}
                  onChange={formik.handleChange} />
            </Grid>
            
            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.time}
                  inputProps={compareDifferentInput(initialItem, formik.values,'releasingListLunchTime')}
                  label='Hora de liberação para o restaurante'
                  name='releasingListLunchTime'
                  value={formik.values.releasingListLunchTime}
                  error={formik.touched["releasingListLunchTime"] && Boolean(formik.errors["releasingListLunchTime"])}
                  helperText={formik.touched["releasingListLunchTime"] && formik.errors["releasingListLunchTime"]}
                  onChange={formik.handleChange} />
            </Grid>

         </Grid>
      </Paper >
   )
}


export default ContactForm;