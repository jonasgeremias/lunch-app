import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { Firebase } from 'utils';
import { DEF_PROPS } from 'constants/inputs';
import { USERS_PATH } from 'constants/routes';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import Menu from 'components/atoms/Menu/Menu';
import { LoadingButton } from '@mui/lab';
// import { firebase.auth(), db } from '../firebase';

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Digite o nome'),
   email: Yup.string().email('E-mail inválido').required('Digite o e-mail'),
   company: Yup.string().required('Selecione a empresa'),
   phone: Yup.string().required('Digite o telefone'),
   cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido').required('Digite o CPF'),
   code: Yup.number().typeError('Código deve ser um número').required('Digite o código de matrícula'),
   password: Yup.string().required('Digite uma senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
   password2: Yup.string().oneOf([Yup.ref('password'), null], 'Senhas diferentes').required('Digite a senha de confirmação'),
});

const COMPANIES = [
   { companyId: '1', companyName: 'Empresa 1' },
   { companyId: '2', companyName: 'Empresa 2' },
   { companyId: '3', companyName: 'Empresa 3' },
   { companyId: '4', companyName: 'Empresa 4' },
   { companyId: '5', companyName: 'Empresa 5' },
   { companyId: '6', companyName: 'Empresa 6' },
   { companyId: '7', companyName: 'Empresa 7' }
]

const CreateUserScreen = ({ companies }) => {
   // if (!companies) companies = COMPANIES;
   console.log('companies', companies)
   const navigate = useNavigate();
   const [error, setError] = useState('');
   const { ShowSnackBar } = useSnackBar();
   const formik = useFormik({
      initialValues: {
         code: '',
         name: '',
         email: '',
         phone: '',
         password: '',
         password2: '',
         company: ''
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
         setError('deu ruim');
         return alert('opaaaa')
         try {
            const { code, name, email, phone, password, password2, company } = values;
            const { user } = await Firebase.auth().createUserWithEmailAndPassword(
               email,
               password
            );

            const dataSet = {
               uid: user.uid,
               code,
               name,
               email,
               phone,
               password,
               password2,
               company
            }
            await Firebase.firestore().collection(USERS_PATH).doc(user.uid).set(dataSet);

            navigate('back');
         } catch (error) {
            ShowSnackBar(`erro ao salvar e-mail`, 'error')
         }
      },
   });

   return (
         <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
               {<Grid item xs={12} >
                  <Menu {...DEF_PROPS.menu}
                     value={formik.values.company}
                     label='Empresa' name='company'
                     items={Object.values(companies)}
                     nameKey='companyName'
                     idKey='companyId'
                     error={formik.touched["company"] && Boolean(formik.errors["company"])}
                     helperText={formik.touched["company"] && formik.errors["company"]}
                     onChange={formik.handleChange} />
               </Grid>}
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.code}
                     name="code"
                     required={true}
                     value={formik.values.code}
                     onChange={formik.handleChange}
                     error={formik.touched.code && Boolean(formik.errors.code)}
                     helperText={formik.touched.code && formik.errors.code}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.name}
                     name="name"
                     required={true}
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.cpf}
                     name="cpf"
                     value={formik.values.cpf}
                     onChange={formik.handleChange}
                     error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                     helperText={formik.touched.cpf && formik.errors.cpf}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.emailEdit}
                     name="email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     error={formik.touched.email && Boolean(formik.errors.email)}
                     helperText={formik.touched.email && formik.errors.email}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.phone}
                     name="phone"
                     required={true}
                     value={formik.values.phone}
                     onChange={formik.handleChange}
                     error={formik.touched.phone && Boolean(formik.errors.phone)}
                     helperText={formik.touched.phone && formik.errors.phone}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.passwordEdit}
                     name="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={
                        formik.touched.password && Boolean(formik.errors.password)
                     }
                     helperText={formik.touched.password && formik.errors.password}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     {...DEF_PROPS.passwordEdit}
                     name="password2"
                     label="Senha de confirmação"
                     value={formik.values.password2}
                     onChange={formik.handleChange}
                     error={
                        formik.touched.password2 && Boolean(formik.errors.password2)
                     }
                     helperText={formik.touched.password2 && formik.errors.password2}
                  />
               </Grid>
               {error && (
                  <Grid item xs={12}>
                     <Typography variant="body2" color="error" align="center">
                        {error}
                     </Typography>
                  </Grid>
               )}
               <Grid item xs={12}>
                  <LoadingButton
                     color="primary"
                     type="submit"
                     variant='contained'
                     fullWidth
                     disabled={formik.isSubmitting}
                     loading={formik.isSubmitting}
                  >
                     Salvar
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
   );
}


export default CreateUserScreen;