import { LoadingButton } from '@mui/lab'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar'
import { COMPANIE_PATH, ORIGIN_ROUTES } from 'constants/routes'
import { useFormik } from 'formik'
import { useAuthContext } from 'hooks/AuthContext'
import { useOrgContext } from 'hooks/OrgContext'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStyles } from 'styles'
import { setCompanieData } from 'utils/firebase/companies'
import ContactForm from '../ContactForm/ContactForm'
import { initialValues, updateInitialValues, validationSchema } from '../ContactForm/getInputs'

export const ContactInfo = ({ item, setItem }) => {
   const gClasses = useGlobalStyles()
   const [loading, setLoading] = useState(false)
   const { showSnackBar } = useSnackBar()
   let navigate = useNavigate();

   // Para add no form
   const { org } = useOrgContext()
   const { user } = useAuthContext()

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onReset: () => {
         formik.setValues(updateInitialValues(item))
      },
      onSubmit: async (values) => {
         setLoading(true)
         const dataset = { ...item, ...values }
         const { error, message, data } = await setCompanieData(dataset, !item, user, org)
         setLoading(false)
         showSnackBar(message, error ? 'error' : 'success');
         if (!error) {
            setItem(data)
         }
      },
   });

   useEffect(() => {
      formik.setValues(updateInitialValues(item))
   }, [item])

   const handleClick = (e) => {
      formik.submitForm()
   }

   const handleClickBack = (e) => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}`);
   }

   const handleCancel = (e) => {
      formik.setValues(updateInitialValues(item))
   }

   return (
      <Grid container>
         <Grid item xs={12}>
            <ContactForm formik={formik} initialItem={item} />
         </Grid>

            <Grid container justifyContent="flex-end" className={gClasses.marginVertical8}>
               <Button onClick={handleCancel} color="inherit" disabled={Boolean(loading)}>Restaurar</Button>
               <LoadingButton
                  disabled={Boolean(loading)}
                  color="primary"
                  onClick={handleClick}
                  variant='contained'
                  loading={loading}
                  startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
               >
                  Salvar
               </LoadingButton>
            </Grid>
      </Grid>
   )
}
