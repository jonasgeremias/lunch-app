import { Grid, TextField, Paper, Typography } from "@mui/material";
import { DEF_PROPS } from "constants/inputs";
import { useGlobalStyles } from "styles";
import clsx from 'clsx'
import colors from 'styles/colors'

const itemEdit = {
   sx: {
      color: colors.primary,
      fontWeight: '500',
   }
}

const ContactForm = ({ formik, initialItem }) => {
   const gClasses = useGlobalStyles()
   // const webScreen = useBreakPoint('up', 'xs')
      
   const getEditInput = (id) => {
      if (initialItem == null) return {}
      if (!initialItem[id]) return {}
      return formik.values[id] == initialItem[id] ? {} : itemEdit
   }
   
   return (
      <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
         <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
            <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
               Informações de Contato
            </Typography >
         </div>

         <Grid container spacing={{xs:2, md:3}} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.id}
                  label='ID da empresa'
                  name='companieId'
                  value={formik.values.companieId}
                  error={formik.touched["companieId"] && Boolean(formik.errors["companieId"])}
                  helperText={formik.touched["companieId"] && formik.errors["companieId"]}
               />
            </Grid>

            {/* { <Grid item xs={12} md={6}>
               <Menu {...DEF_PROPS.menu}
               value={formik.values.status}
               label='Status' name='status'
               items={Object.values(STATUS_OPTIONS)}
               error={formik.touched["status"] && Boolean(formik.errors["status"])}
               helperText={formik.touched["status"] && formik.errors["status"]}
               onChange={formik.handleChange} />
            </Grid>} */}

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.name}
                  inputProps={getEditInput('companieName')}
                  label='Nome da empresa'
                  name='companieName'
                  value={formik.values.companieName}
                  error={formik.touched["companieName"] && Boolean(formik.errors["companieName"])}
                  helperText={(formik.touched["companieName"] && formik.errors["companieName"])}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.cnpj}
                  inputProps={getEditInput('cnpj')}
                  label='cnpj'
                  name='cnpj'
                  value={formik.values.cnpj}
                  error={formik.touched["cnpj"] && Boolean(formik.errors["cnpj"])}
                  helperText={formik.touched["cnpj"] && formik.errors["cnpj"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.name}
                  inputProps={getEditInput('contactName')}
                  label='Nome do responsável'
                  name='contactName'
                  value={formik.values.contactName}
                  error={formik.touched["contactName"] && Boolean(formik.errors["contactName"])}
                  helperText={formik.touched["contactName"] && formik.errors["contactName"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.email}
               inputProps={getEditInput('email')}
                  label='E-mail'
                  name='email'
                  value={formik.values.email}
                  error={formik.touched["email"] && Boolean(formik.errors["email"])}
                  helperText={formik.touched["email"] && formik.errors["email"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.phone}
                  inputProps={getEditInput('phone')}
                  label='Telefone'
                  name='phone'
                  value={formik.values.phone}
                  error={formik.touched["phone"] && Boolean(formik.errors["phone"])}
                  helperText={formik.touched["phone"] && formik.errors["phone"]}
                  onChange={formik.handleChange} />
            </Grid>
         </Grid>
      </Paper >
   )
}


export default ContactForm;