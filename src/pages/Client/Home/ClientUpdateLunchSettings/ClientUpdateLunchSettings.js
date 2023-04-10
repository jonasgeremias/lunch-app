import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import Menu from 'components/atoms/Menu/Menu'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import { DEF_PROPS } from 'constants/inputs'
import { useFormik } from 'formik'
import { useAuthContext } from 'hooks/AuthContext'
// import { useCompanyContext } from 'hooks/CompanyContext'
import { useOrgContext } from 'hooks/OrgContext'
import { useGlobalStyles } from 'styles'
import { compareDifferentInput } from 'utils/compareDifferentInput'
import { initialValuesClientHome, validationSchemaClientHome } from './getInputs'
import clsx from 'clsx';
import { updateInitialValues } from 'utils/updateInitialValues'
import { setLunchChangeByClient, updateLunchSettingsByClient } from 'utils/firebase/users'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'

export default function ClientUpdateLunchSettings({ updateLunch, closeUpdateLunchDialog, updateListChangedLunches }) {
   const gClasses = useGlobalStyles()
   const { userData, setAuthUserData } = useAuthContext()
   const { org } = useOrgContext()
   // const { company } = useCompanyContext()
   const [loading, setLoading] = useState(false);
   const {showSnackBar} = useSnackBar()
   
   const formik = useFormik({
      initialValues: initialValuesClientHome,
      validationSchema: validationSchemaClientHome,
      onSubmit: async (values) => {
         setLoading(true)

         if (updateLunch?.settings == true) {
            const dataset = { ...userData, ...values }
            const { error, message, data } = await updateLunchSettingsByClient(dataset, userData, org)
            if (!error) {
               const updateItem = { ...userData, ...data }
               setTimeout(setAuthUserData(updateItem), 500)
            }
            showSnackBar(message, error ? 'error' : 'success');
         } else {
            const {year, month, day} = updateLunch.item;
            const dataset = {year, month, changedLunchItem: { year, month, day, lunchTypes : values.lunchTypes }}
            const { error, message, data } = await setLunchChangeByClient(dataset, userData, org)
            if (!error) {
               updateListChangedLunches({error: false, year, month, data})
            }
            showSnackBar(message, error ? 'error' : 'success');
         }

         closeUpdateLunchDialog() // fecha o dialogo
         setLoading(false) // Habilita o botão
      },
   });
   
   useEffect(() => {
      if (updateLunch?.open) {         
         if (updateLunch?.settings) {
            formik.setValues({lunchTypes: userData.lunchTypes})
         } else if (updateLunch?.item !== null) {
            formik.setValues({lunchTypes: updateLunch?.item?.lunchTypes})
         }
         else formik.setValues(initialValuesClientHome)
         
         // formik.setValues(updateInitialValues(userData, initialValuesClientHome))
      }
   }, [updateLunch])

   const onConfirmDialog = (e) => {
      formik.submitForm()
   }
   
   const stringDateFromYMD = (lunch) => {
      if (lunch?.day && lunch?.month && lunch?.year) {
         const day = String(lunch.day).padStart(2, '0');
         const month = String(lunch.month).padStart(2, '0');
         const year = String(lunch.year).padStart(4, '0');
         return `${day}/${month}/${year}`;
      }
      else return ''
   }
   
   let options = Object.values(org?.lunchTypes ? org.lunchTypes : {})  
   if (!updateLunch?.settings) options.push({enable: true, name: 'Pela Configuração', id: 'default'})
   
   return (
      <DialogContainer
         loading={loading}
         showCancel
         title={updateLunch?.settings ? 'Alterar configuração de almoço' : `Alterar almoço em ${stringDateFromYMD(updateLunch.item)}`}
         onClose={() => closeUpdateLunchDialog(false)}
         open={Boolean(updateLunch?.open)}
         maxWidth='xs'
         acceptLabel='Salvar'
         onAccept={onConfirmDialog}
      >
         <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <Grid item xs={12} >
               <Menu {...DEF_PROPS.menu}
                  inputProps={compareDifferentInput(userData, formik.values, 'lunchTypes')}
                  value={formik.values.lunchTypes}
                  label='Tipo de almoço é sempre:'
                  name='lunchTypes'
                  items={options}
                  nameKey='name'
                  idKey='id'
                  error={formik.touched["lunchTypes"] && Boolean(formik.errors["lunchTypes"])}
                  helperText={formik.touched["lunchTypes"] && formik.errors["lunchTypes"]}
                  onChange={formik.handleChange} />
            </Grid>
            {/* <Grid item xs={12} md={6}>
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
            </Grid> */}
         </Grid>
      </DialogContainer>
   )
}
