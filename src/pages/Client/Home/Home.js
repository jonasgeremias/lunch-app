import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Paper, Grid, TextField } from '@mui/material';
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
import { useOrgContext } from 'hooks/OrgContext'
import { useCompanyContext } from 'hooks/CompanyContext'

import CalendarStatus from './CalendarStatus';
import { CardDetail } from './CardDetail';
import { initialValuesClientHome, validationSchemaClientHome } from './getInputs';
import { useFormik } from 'formik';
import { updateInitialValues } from 'utils/updateInitialValues';
import { compareDifferentInput, objectIsEqual } from 'utils/compareDifferentInput';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { DEF_PROPS } from 'constants/inputs'
import Menu from 'components/atoms/Menu/Menu'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import { setUserDataByClient } from 'utils/firebase/users';


export default function ClientHome() {
   const gClasses = useGlobalStyles()
   const { userData, setAuthUserData } = useAuthContext()
   const { org } = useOrgContext()
   const { company } = useCompanyContext()
   const { showSnackBar } = useSnackBar()
   const [dialogVisible, setDialogVisible] = useState(false)
   const [alterConfigLunchTypeToday, setAlterConfigLunchTypeToday] = useState(false)
   const [loading, setLoading] = useState(false);
   const [lunchChanges, setLunchChanges] = useState([]);

   // const userData = useSelector(state => state.app.user)
   const formik = useFormik({
      initialValues: initialValuesClientHome,
      validationSchema: validationSchemaClientHome,
      onSubmit: async (values) => {
         setLoading(true)
         const dataset = { ...userData, ...values }
         const { error, message, data } = await setUserDataByClient(dataset, userData, org)

         if (!error) {
            const updateItem = { ...userData, ...data }
            setTimeout(setAuthUserData(updateItem), 500)
         }
         setLoading(false)
         setDialogVisible(false)
         showSnackBar(message, error ? 'error' : 'success');
      },
   });

   useEffect(() => {
      console.log('userData', userData)
      formik.setValues(updateInitialValues(userData, initialValuesClientHome))
   }, [userData])

   
   const onConfirmDialog = (e) => {
      formik.submitForm()
   }

   const onCloseDialog = (e) => {
      setDialogVisible(false)
   }

   // console.log(userData, company, org)
   const handleDayClick = (e) => {
      console.log('handleDayClick', e)
   }

   return (
      <Grid container justifyContent="center" alignItems="center">
         <Grid xs={12} md={8} item>
            <Paper variant="outlined" className={clsx(gClasses.containerPaper)}>
               <CardDetail
                  lunchChanges={lunchChanges}
                  formik={formik}
                  handleDayClick={handleDayClick}
                  data={{ userData, company, org }}
                  setDialogVisible={setDialogVisible}
                  />
            </Paper>

            <DialogContainer
               loading={loading}
               showCancel
               title={alterConfigLunchTypeToday ? 'Alterar almoço de hoje' : 'Alterar configuração de almoço'}
               onClose={onCloseDialog}
               open={dialogVisible}
               maxWidth='xs'
               acceptLabel='Salvar'
               onAccept={onConfirmDialog}
               >
               <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
                  <Grid item xs={12} md={6} >
                     <Menu {...DEF_PROPS.menu}
                        inputProps={compareDifferentInput(userData, formik.values, 'lunchTypes')}
                        value={formik.values.lunchTypes}
                        label='Tipo de almoço é sempre:'
                        name='lunchTypes'
                        items={Object.values(org?.lunchTypes ? org.lunchTypes : {})}
                        nameKey='name'
                        idKey='id'
                        error={formik.touched["lunchTypes"] && Boolean(formik.errors["lunchTypes"])}
                        helperText={formik.touched["lunchTypes"] && formik.errors["lunchTypes"]}
                        onChange={formik.handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField
                        {...DEF_PROPS.quantity}
                        disabled={true}
                        inputProps={compareDifferentInput(userData, formik.values, 'lunchQuantity')}
                        name="lunchQuantity"
                        label='Quantidade de almoço'
                        value={formik.values.lunchQuantity}
                        onChange={formik.handleChange}
                        error={formik.touched.lunchQuantity && Boolean(formik.errors.lunchQuantity)}
                        helperText={formik.touched.lunchQuantity && formik.errors.lunchQuantity}
                        />
                  </Grid>
               </Grid>
            </DialogContainer>



         <CalendarStatus formik={formik} handleDayClick={handleDayClick} />

         </Grid>
      </Grid>
   )
}
