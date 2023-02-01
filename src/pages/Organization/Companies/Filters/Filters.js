import React from 'react'
import { DEF_PROPS } from 'constants/inputs'
import { STATUS_OPTIONS, STATUS_OPTIONS_ARRAY } from 'constants/general'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import Menu from 'components/atoms/Menu/Menu'
import { Grid, TextField, Button } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useBreakPoint } from 'hooks/useBreakPoint'

const InputDate = (props) => {
   const webScreen = useBreakPoint('up', 'md')
   return (webScreen ? <DesktopDatePicker {...props} /> : <MobileDatePicker {...props} />)
}

const Filters = ({ formikFilters }) => {
   const gClasses = useGlobalStyles()
   const { startDate, endDate, companieName, status, email, phone, cnpj } = formikFilters.values

   return (
      <>
         <form onSubmit={formikFilters.handleSubmit} className={gClasses.marginVertical16}>
            <Grid container spacing={1}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item container xs={12} sm={6} md={3}>
                     <InputDate
                        {...DEF_PROPS.datePicker}
                        label="Data inicial"
                        value={startDate}
                        onChange={val => formikFilters.setFieldValue("startDate", val)}
                        renderInput={(params) => (<TextField {...params} {...DEF_PROPS.datePicker.renderinput} name='startDate'
                           error={formikFilters.touched["startDate"] && Boolean(formikFilters.errors["startDate"])}
                           helperText={formikFilters.touched["startDate"] && formikFilters.errors["startDate"]}
                        />)}
                     />
                  </Grid>

                  <Grid item container xs={12} sm={6} md={3}>
                     <InputDate
                        {...DEF_PROPS.datePicker}
                        label="Data final"
                        value={endDate}
                        onChange={val => formikFilters.setFieldValue("endDate", val)}
                        renderInput={(params) => (<TextField {...params} {...DEF_PROPS.datePicker.renderinput} name='endDate'
                           error={formikFilters.touched["endDate"] && Boolean(formikFilters.errors["endDate"])}
                           helperText={formikFilters.touched["endDate"] && formikFilters.errors["endDate"]}
                        />)}
                     />
                  </Grid>
               </LocalizationProvider>
               <Grid item container xs={12} sm={6} md={3}>
                  <TextField {...DEF_PROPS.text} label='Nome' name='companieName' value={companieName} onChange={formikFilters.handleChange}
                  />
               </Grid>
               <Grid item container xs={12} sm={6} md={3}>
                  <TextField {...DEF_PROPS.cnpj} required={false} label='CNPJ' name='cnpj' value={cnpj} onChange={formikFilters.handleChange}
                  />
               </Grid>
               <Grid item container xs={12} sm={6} md={3}>
                  <Menu value={status} label='Status' name='status' items={Object.values(STATUS_OPTIONS)} onChange={formikFilters.handleChange} fullWidth size='small' includeEmpty
                  />
               </Grid>
               <Grid item container xs={12} sm={6} md={3}>
                  <TextField {...DEF_PROPS.email} required={false} label='E-mail' name='email' value={email} onChange={formikFilters.handleChange}
                  />
               </Grid>
               <Grid item container xs={12} sm={6} md={3}>
                  <TextField {...DEF_PROPS.phone} label='Telefone' name='phone' value={phone} onChange={formikFilters.handleChange}
                  />
               </Grid>
            </Grid>
            <div className={clsx(gClasses.fullWidth, gClasses.flexJustifyEnd, gClasses.marginTop16)}>
               <div className={gClasses.flex1} />
               <Button onClick={formikFilters.handleReset} variant='outlined' className={gClasses.marginRight10}>
                  Limpar
               </Button>
               <Button variant='contained' color='primary' type="submit">
                  Aplicar filtros
               </Button>
            </div>
         </form>
      </>
   )
}

export default Filters