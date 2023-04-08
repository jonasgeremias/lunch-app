import { Grid, TextField } from '@mui/material'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import { DEF_PROPS } from 'constants/inputs'
import React, { useEffect } from 'react'
import { useGlobalStyles } from 'styles'
import { compareDifferentInput } from 'utils/compareDifferentInput'
import clsx from 'clsx'
import Menu from 'components/atoms/Menu/Menu'
import { initialValuesChangeDate, validationSchemaChangeDate } from '../ClientUpdateLunchSettings/getInputs'
import { useFormik } from 'formik'
import { updateInitialValues } from 'utils/updateInitialValues'
import { setLunchChangeByClient } from 'utils/firebase/users'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'

export default function DialogChangeDate({ lunchChanges, org, userData, loading, onCloseDialog, dialogVisible, onConfirmDialog }) {
   const gClasses = useGlobalStyles()
   const { showSnackBar } = useSnackBar()

   // const userData = useSelector(state => state.app.user)
   const formik = useFormik({
      initialValues: initialValuesChangeDate,
      validationSchema: validationSchemaChangeDate,
      onSubmit: async (values) => {
         const dataset = { uid: userData.uid, changedLunchItem: values }
         console.log('send', dataset)
         const { error, message, data } = await setLunchChangeByClient(dataset, userData, org)
         if (!error) {
            console.log('onSubmit rx', error, message, data)
         }
         showSnackBar(message, error ? 'error' : 'success');
         onConfirmDialog()
      },
   });


   useEffect(() => {
      if (dialogVisible) {
         const data = updateInitialValues(lunchChanges, initialValuesChangeDate)
         console.log('useEffect', data)
         formik.setValues(data)
      }
   }, [dialogVisible])

   return (
      <DialogContainer
         loading={loading}
         showCancel
         title={`Alterar almoço de`}
         onClose={onCloseDialog}
         open={dialogVisible}
         maxWidth='xs'
         acceptLabel='Salvar'
         onAccept={() => formik.submitForm()}
      >
         <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <Grid item xs={12} md={6} >
               <Menu {...DEF_PROPS.menu}
                  inputProps={compareDifferentInput(lunchChanges, formik.values, 'lunchTypes')}
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
            {/*<Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.quantity}
                  disabled={true}
                  inputProps={compareDifferentInput(lunchChanges, formik.values, 'lunchQuantity')}
                  name="lunchQuantity"
                  label='Quantidade de almoço'
                  value={formik.values.lunchQuantity}
                  onChange={formik.handleChange}
                  error={formik.touched.lunchQuantity && Boolean(formik.errors.lunchQuantity)}
                  helperText={formik.touched.lunchQuantity && formik.errors.lunchQuantity}
               />
            </Grid> */}
         </Grid>
      </DialogContainer>
   )
}
