import { useEffect, useState } from "react"
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import {  Grid } from "@mui/material"
import { Firebase } from "utils"
import { useFormik } from 'formik';
import { setCompanieData } from "utils/firebase/companies"
import { useSnackBar } from "components/atoms/Snackbar/Snackbar"
import { useOrgContext } from "hooks/OrgContext"
import { useAuthContext } from "hooks/AuthContext"
import ContactForm from "../ContactForm/ContactForm"
import { initialValues, updateInitialValues, validationSchema } from "../ContactForm/getInputs";

const AddEditDialog = ({ companieData, visible, onClose, updateCompanieData }) => {
   const [loading, setLoading] = useState(false)
   const [adding, setAdding] = useState(false)
   const { showSnackBar } = useSnackBar()

   // Para add no form
   const { org } = useOrgContext()
   const { user } = useAuthContext()

   let formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onReset: () => {
         formik.values.companieId = Firebase.firestore().collection('companies').doc().id;
      },

      onSubmit: async (values) => {
         setLoading(true)
         const dataset = { ...companieData, ...values }
         const { error, message, data } = await setCompanieData(dataset, adding, user, org)
         setLoading(false)
         showSnackBar(message, error ? 'error' : 'success');
         if (!error) {
            updateCompanieData(data)
         }
         onClose()
      },
   });

   useEffect(() => {
      if (!!visible) {
         if (Object.keys(companieData).length === 0) {
            setAdding(true)
            formik.handleReset()
         }
         else {
            setAdding(false)
            formik.setValues(updateInitialValues(companieData))
         }
      } else formik.handleReset()
   }, [visible])

   return (
      <DialogContainer loading={Boolean(loading)} title={`${adding ? 'Adicionar' : 'Editar'} Empresa`} onClose={onClose}
         open={Boolean(visible)} maxWidth='lg' showCancel={onClose} onAccept={formik.handleSubmit} acceptLabel="Salvar">
         <Grid container>
            <Grid item xs={12}>
               <ContactForm formik={formik} initialItem={companieData}/>
            </Grid>
         </Grid>
      </DialogContainer>
   )
}

export default AddEditDialog