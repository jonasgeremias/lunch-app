import { useEffect, useState } from "react"
import { useGlobalStyles } from "styles"
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import { DEF_PROPS, MASK } from "constants/inputs"
import { Button, Grid, TextField } from "@mui/material"
import clsx from 'clsx'
import { STATUS_OPTIONS, STATUS_OPTIONS_ARRAY } from "constants/general"
import Menu from 'components/atoms/Menu/Menu'
import { Firebase } from "utils"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { setCompanieData } from "utils/firebase/companies"
import { useSnackBar } from "components/atoms/Snackbar/Snackbar"
import { useOrgContext } from "hooks/OrgContext"
import { useAuthContext } from "hooks/AuthContext"

/******************************************************************************
 * Formulario de cadastro de empresa
 *****************************************************************************/
const validationSchema = Yup.object().shape({
   companieId: Yup.string().required("Campo obrigatório"),
   companieName: Yup.string().required("Campo obrigatório").min(2, 'digite pelo menos 2 caracteres.'),
   cnpj: Yup.string().required("Campo obrigatório"),
   status: Yup.mixed().oneOf(STATUS_OPTIONS_ARRAY).defined('').required("Campo obrigatório"),
   email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
   contactName: Yup.string().required("Campo obrigatório"),
   phone: Yup.string().matches().required("Campo obrigatório")
});

const initialValues = {
   companieId: '',
   companieName: '',
   cnpj: '',
   status: 'active',
   email: '',
   contactName: '',
   phone: ''
};


const updateValues = (companieData) => {
   const { companieId, companieName, cnpj, status, email, contactName, phone } = companieData;
   const initialData = {
      companieId: companieId || '',
      companieName: companieName || '',
      cnpj: cnpj || '',
      status: status || 'active',
      email: email || '',
      contactName: contactName || '',
      phone: phone || ''
   }
   // console.log('updateValues', initialData)
   return initialData
}


const AddEditDialog = ({ companieData, visible, onClose }) => {
   const [loading, setLoading] = useState(false)
   const [adding, setAdding] = useState(false)
   const gClasses = useGlobalStyles()
   const {showSnackBar} = useSnackBar()
   
   // Para add no form
   const {org} = useOrgContext()
   const {user} = useAuthContext()

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onReset: () => {
         formik.values.companieId = Firebase.firestore().collection('companies').doc().id;
         // console.log('values', formik.values)
      },
      onSubmit: async (values) => {
         setLoading(true)
         console.log(JSON.stringify(values, null, 2));
         const  {error, message} = await setCompanieData(values, adding, user, org)
         
         setLoading(false)
         showSnackBar(message, error? 'error' :  'success');
         if (!error) onClose()
      },
   });
      
   useEffect(() => {
      
      console.log('useefect', visible, companieData)
      
      if (visible) {
         if (Object.keys(companieData).length === 0) {
            setAdding(true)
            formik.handleReset()
         }
         else {
            setAdding(false)
            formik.values = updateValues(companieData)
         }
      }      
      // console.log('visible', visible, companieData)
   }, [visible])



   
   // const handleSave = (e) => {
   //    e.preventDefault();
   //    console.log(formik.errors)
   //    setLoading(true)
   //    setTimeout(() => {
   //       onClose();
   //       setLoading(false)
   //    }, 500);
   // }

   // // Campo que está sendo alterado
   // const handleChangeValue = id => ({ target }) => {
   //    // dispatch(changeValue(target.value, id))
   // }

   // const handleKeyPress = ({ key }) => {
   //    if (key === 'Enter') {
   //       handleSave()
   //    }
   // }

   return (
      <DialogContainer loading={Boolean(loading)} title={`${adding ? 'Adicionar' : 'Editar'} Empresa`} onClose={onClose}
         open={Boolean(visible)} maxWidth='sm' showCancel={onClose} onAccept={formik.handleSubmit} acceptLabel="Salvar">

         <Grid container spacing={1}>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.id}
                  label='ID da empresa'
                  name='companieId'
                  value={formik.values.companieId}
                  error={formik.touched["companieId"] && Boolean(formik.errors["companieId"])}
                  helperText={formik.touched["companieId"] && formik.errors["companieId"]}
               />
            </Grid>


            <Grid item xs={12}>
               <Menu {...DEF_PROPS.menu}
                  value={formik.values.status}
                  label='Status' name='status'
                  items={Object.values(STATUS_OPTIONS)}
                  error={formik.touched["status"] && Boolean(formik.errors["status"])}
                  helperText={formik.touched["status"] && formik.errors["status"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.name}
                  label='Nome da empresa'
                  name='companieName'
                  value={formik.values.companieName}
                  error={formik.touched["companieName"] && Boolean(formik.errors["companieName"])}
                  helperText={formik.touched["companieName"] && formik.errors["companieName"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.cnpj}
                  label='cnpj'
                  name='cnpj'
                  value={formik.values.cnpj}
                  error={formik.touched["cnpj"] && Boolean(formik.errors["cnpj"])}
                  helperText={formik.touched["cnpj"] && formik.errors["cnpj"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.name}
                  label='Nome do responsável'
                  name='contactName'
                  value={formik.values.contactName}
                  error={formik.touched["contactName"] && Boolean(formik.errors["contactName"])}
                  helperText={formik.touched["contactName"] && formik.errors["contactName"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.email}
                  label='E-mail'
                  name='email'
                  value={formik.values.email}
                  error={formik.touched["email"] && Boolean(formik.errors["email"])}
                  helperText={formik.touched["email"] && formik.errors["email"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
               <TextField {...DEF_PROPS.phone}
                  label='Telefone'
                  name='phone'
                  value={formik.values.phone}
                  error={formik.touched["phone"] && Boolean(formik.errors["phone"])}
                  helperText={formik.touched["phone"] && formik.errors["phone"]}
                  onChange={formik.handleChange} />
            </Grid>
         </Grid>

      </DialogContainer>
   )
}

export default AddEditDialog