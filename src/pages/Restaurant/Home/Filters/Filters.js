import React from 'react'
import { DEF_PROPS } from 'constants/inputs'
import { USER_TYPES, STATUS_OPTIONS } from 'constants/general'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import Menu from 'components/atoms/Menu/Menu'
import { Grid, TextField, Button, Paper } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { useOrgContext } from 'hooks/OrgContext'

const Filters = ({ formikFilters }) => {
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const { lunchDate, lunchType } = formikFilters.values;
   const { org } = useOrgContext()

   return (
      <form onSubmit={formikFilters.handleSubmit} className={gClasses.marginVertical16}>
         <div className={clsx(gClasses.flexJustifySpaceBetween)}>
            <TabSubtitle description={webScreen ? `Aqui você pode filtrar os usuários` : ''}
               descriptionClassName={gClasses.marginBottom30}>
               Filtrar almoço
            </TabSubtitle >
         </div>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
            <Grid container spacing={1}>
               <Grid item xs={12} sm={6} md={3}>
                  <TextField
                     {...DEF_PROPS.date}
                     required
                     name='lunchDate'
                     value={lunchDate}
                     onChange={formikFilters.handleChange}
                  />
               </Grid>
               <Grid item xs={12} sm={6} md={3} >
                  <Menu {...DEF_PROPS.menu}
                     value={formikFilters.values.lunchTypes}
                     includeEmpty
                     fullWidth
                     label='Tipo de almoço é sempre:'
                     name='lunchTypes'
                     items={Object.values(org?.lunchTypes ? org.lunchTypes : {})}
                     nameKey='name'
                     idKey='id'
                     error={formikFilters.touched["lunchTypes"] && Boolean(formikFilters.errors["lunchTypes"])}
                     helperText={formikFilters.touched["lunchTypes"] && formikFilters.errors["lunchTypes"]}
                     onChange={formikFilters.handleChange} />
               </Grid>
               <Grid item xs={12} sm={6}  justifyContent="space-between">
                  {/* <div className={clsx(gClasses.fullWidth, gClasses.flexJustifyEnd, gClasses.marginTop16)}> */}
                     <Button onClick={formikFilters.handleReset} variant='outlined' className={gClasses.marginRight10}>
                        Limpar
                     </Button>
                     <Button variant='contained' color='primary' type="submit">
                        Aplicar filtros
                     </Button>
                  {/* </div> */}
               </Grid>
            </Grid>

         </Paper>
      </form>
   )
}

export default Filters