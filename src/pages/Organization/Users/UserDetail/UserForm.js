import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { DEF_PROPS } from 'constants/inputs';
import Menu from 'components/atoms/Menu/Menu';
import { loadUsersInDB } from 'utils/firebase/users';
import { useAuthContext } from 'hooks/AuthContext';
import clsx from 'clsx'
import { useGlobalStyles } from 'styles';
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback';
import { STATUS_OPTIONS, USER_TYPES, USER_TYPES_ARRAY } from 'constants/general';
import { compareDifferentInput } from 'utils/compareDifferentInput';
import { useOrgContext } from 'hooks/OrgContext';

const UserForm = ({ add, formik, companies, loading, initialItem }) => {
   const gClasses = useGlobalStyles()
   const [table, setTable] = useState([]);
   const { userData } = useAuthContext();
   const { org } = useOrgContext()

   useEffect(() => {
      loadData();
   }, []);
   
   const loadData = async () => {
      const data = await loadUsersInDB(table, userData)
      setTable(data)
   }

   // const formik = useFormik({
   //    initialValues: {
   //       code: '',
   //       name: '',
   //       email: '',
   //       phone: '',
   //       password: '',
   //       password2: '',
   //       company: ''
   //    },
   //    validationSchema: validationSchema,
   //    onSubmit: async (values) => {
   //       setError('deu ruim');
   //       return alert('opaaaa')
   //       try {
   //          const { code, name, email, phone, password, password2, company } = values;
   //          const { user } = await Firebase.auth().createUserWithEmailAndPassword(
   //             email,
   //             password
   //          );
   //          const dataSet = {
   //             uid: user.uid,
   //             code,
   //             name,
   //             email,
   //             phone,
   //             password,
   //             password2,
   //             company
   //          }
   //          await Firebase.firestore().collection(USERS_PATH).doc(user.uid).set(dataSet);
   //          navigate('back');
   //       } catch (error) {
   //          ShowSnackBar(`erro ao salvar e-mail`, 'error')
   //       }
   //    },
   // });


   let user_types = Object.fromEntries(Object.entries(USER_TYPES).filter(([id]) => id !== 'admin'))
   user_types = Object.values(user_types?user_types:{})

   // if (loading) return null
   return (
      <form>
         <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
            <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
               Informações de Contato
            </Typography >
         </div>

         <Grid container spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <Grid item xs={12} md={6}>
               <Menu {...DEF_PROPS.menu}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'userType')}
                  value={formik.values.userType}
                  label='Tipo Login' name='userType'
                  items={user_types}
                  nameKey='name'
                  idKey='id'
                  error={formik.touched["userType"] && Boolean(formik.errors["userType"])}
                  helperText={formik.touched["userType"] && formik.errors["userType"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6} >
               <Menu {...DEF_PROPS.menu}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'status')}
                  value={formik.values.status}
                  label='Status' name='status'
                  items={Object.values(STATUS_OPTIONS)}
                  nameKey='name'
                  idKey='id'
                  error={formik.touched["status"] && Boolean(formik.errors["status"])}
                  helperText={formik.touched["status"] && formik.errors["status"]}
                  onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField {...DEF_PROPS.id}
                  disabled={true}
                  label='ID do Usuário'
                  name='uid'
                  value={formik.values.uid}
                  error={formik.touched["uid"] && Boolean(formik.errors["uid"])}
                  helperText={formik.touched["uid"] && formik.errors["uid"]}
               />
            </Grid>

            <Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.name}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'name')}
                  name="name"
                  required={true}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.phone}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'phone')}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.emailEdit}
                  disabled={!add}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'email')}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.passwordEdit}
                  disabled={!add}
                  required={Boolean(add)}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'password')}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  {...DEF_PROPS.passwordEdit}
                  disabled={!add}
                  required={Boolean(add)}
                  inputProps={compareDifferentInput(initialItem, formik.values, 'password2')}
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

            {formik.values.userType === USER_TYPES.client.id && (
               <>
                  <Grid item xs={12} md={6}>
                     <TextField
                        {...DEF_PROPS.cpf}
                        disabled={!add}
                        required={Boolean(add)}
                        inputProps={compareDifferentInput(initialItem, formik.values, 'cpf')}
                        name="cpf"
                        value={formik.values.cpf}
                        onChange={formik.handleChange}
                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                        helperText={formik.touched.cpf && formik.errors.cpf}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Menu {...DEF_PROPS.menu}
   
                        inputProps={compareDifferentInput(initialItem, formik.values, 'companyId')}
                        value={formik.values.companyId}
                        label='Empresa' name='companyId'
                        items={Object.values(companies? companies: {})}
                        nameKey='companyName'
                        idKey='companyId'
                        error={formik.touched["companyId"] && Boolean(formik.errors["companyId"])}
                        helperText={formik.touched["companyId"] && formik.errors["companyId"]}
                        onChange={formik.handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField
                        {...DEF_PROPS.code}
                        inputProps={compareDifferentInput(initialItem, formik.values, 'code')}
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                     />
                  </Grid>
               </>
            )}

            {formik.values.userType === USER_TYPES.client.id && (
               <>
                  <Grid item xs={12} md={6}>
                     <TextField
                        {...DEF_PROPS.percent}
                        inputProps={compareDifferentInput(initialItem, formik.values, 'lunchDiscountPercentage')}
                        name="lunchDiscountPercentage"
                        label='Porcentagem do almoço'
                        value={formik.values.lunchDiscountPercentage}
                        onChange={formik.handleChange}
                        error={formik.touched.lunchDiscountPercentage && Boolean(formik.errors.lunchDiscountPercentage)}
                        helperText={formik.touched.lunchDiscountPercentage && formik.errors.lunchDiscountPercentage}
                     />
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                     <TextField
                        {...DEF_PROPS.quantity}
                        inputProps={compareDifferentInput(initialItem, formik.values, 'lunchQuantity')}
                        name="lunchQuantity"
                        label='Quantidade de almoço'
                        value={formik.values.lunchQuantity}
                        onChange={formik.handleChange}
                        error={formik.touched.lunchQuantity && Boolean(formik.errors.lunchQuantity)}
                        helperText={formik.touched.lunchQuantity && formik.errors.lunchQuantity}
                     />
                  </Grid> */}
                  <Grid item xs={12} md={6} >
                     <Menu {...DEF_PROPS.menu}
                        inputProps={compareDifferentInput(initialItem, formik.values, 'lunchTypes')}
                        value={formik.values.lunchTypes}
                        label='Tipo de almoço'
                        name='lunchTypes'
                        items={Object.values(org?.lunchTypes ? org.lunchTypes: {})}
                        nameKey='name'
                        idKey='id'
                        error={formik.touched["lunchTypes"] && Boolean(formik.errors["lunchTypes"])}
                        helperText={formik.touched["lunchTypes"] && formik.errors["lunchTypes"]}
                        onChange={formik.handleChange} />
                  </Grid>
               </>)}
         </Grid>
      </form>
   );
}


export default UserForm;