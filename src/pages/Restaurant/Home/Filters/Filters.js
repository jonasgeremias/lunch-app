import React from 'react'
import { DEF_PROPS } from 'constants/inputs'
import { USER_TYPES, STATUS_OPTIONS } from 'constants/general'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import Menu from 'components/atoms/Menu/Menu'
import { Grid, TextField, Button, Paper } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'

const Filters = ({ formikFilters }) => {
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const { startDate, endDate, name, userType, status, email, phone } = formikFilters.values

   return (
      <form onSubmit={formikFilters.handleSubmit} className={gClasses.marginVertical16}>
         <div className={clsx(gClasses.flexJustifySpaceBetween)}>
            <TabSubtitle description={webScreen ? `Aqui você pode filtrar os usuários` : ''}
               descriptionClassName={gClasses.marginBottom30}>
               Filtrar Usuário
            </TabSubtitle >
         </div>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
         <Grid container spacing={1}>
            {/* <Grid item container xs={12} sm={6} md={3}>
               <TextField
                  {...DEF_PROPS.date}
                  required={false}
                  label="Data inicial"
                  value={startDate}
                  name='startDate'
                  onChange={formikFilters.handleChange}
               />
            </Grid>

            <Grid item container xs={12} sm={6} md={3}>
               <TextField
                  {...DEF_PROPS.date}
                  required={false}
                  label="Data final"
                  value={endDate}
                  name='endDate'
                  onChange={formikFilters.handleChange}
               />
            </Grid> */}

            <Grid item container xs={12} sm={6} md={3}>
               <TextField {...DEF_PROPS.text} label='Nome' required={false} name='name' value={name} onChange={formikFilters.handleChange}
               // onKeyPress={handleKeyPress}
               />
            </Grid>
            <Grid item container xs={6} md={3}>
               <Menu value={userType} label='Tipo de usuário' required={false} name='userType' items={Object.values(USER_TYPES)} onChange={formikFilters.handleChange} fullWidth size='small' includeEmpty
               // onKeyPress={handleKeyPress}
               />
            </Grid>
            <Grid item container xs={6} md={3}>
               <Menu value={status} label='Status' name='status' required={false} items={Object.values(STATUS_OPTIONS)} onChange={formikFilters.handleChange} fullWidth size='small' includeEmpty
               />
            </Grid>
            <Grid item container xs={12} sm={6} md={3}>
               <TextField {...DEF_PROPS.email} label='E-mail' name='email'  required={false} value={email} onChange={formikFilters.handleChange}
               />
            </Grid>
            <Grid item container xs={12} sm={6} md={3}>
               <TextField {...DEF_PROPS.phone} label='Telefone' name='phone' required={false} value={phone} onChange={formikFilters.handleChange}
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
         </Paper>
      </form>
   )
}

export default Filters