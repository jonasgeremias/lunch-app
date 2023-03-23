import { useBreakPoint } from 'hooks/useBreakPoint';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalStyles } from 'styles';
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { getUserData, loadUsersInDB, setUserData } from 'utils/firebase/users';
import { useNavigate } from 'react-router-dom';
import { USERS_PATH, ORIGIN_ROUTES } from 'constants/routes';
import { Firebase } from 'utils';
import { initialValues, updateInitialValues, validationSchema } from './getInputs'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useOrgContext } from 'hooks/OrgContext';
import { AuthContext, useAuthContext } from 'hooks/AuthContext';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';

import { objectIsEqual } from 'utils/compareDifferentInput';
// import UserForm from './UserForm';
import { loadCompaniesInDB } from 'utils/firebase/companies';
import UserForm from './UserForm';

const UserDetail = ({ add }) => {
   let { id } = useParams();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const { showSnackBar } = useSnackBar()
   const [item, setItem] = useState(initialValues)
   const [differentData, setDifferentData] = useState(false)
   const [companies, setCompanies] = useState({})
   let navigate = useNavigate();
   const { userData } = useContext(AuthContext)
   const [loading, setLoading] = useState(true)
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
         console.log('onSubmit', dataset)
         showSnackBar('Gravando', 'success')
         // const { error, message, data, newDoc } = await setUserData(dataset, add, user, org)
         // setLoading(false)
         // showSnackBar(message, error ? 'error' : 'success');
         // if (!error) {
         //    setItem(data)
         // }
         // if (newDoc) navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}/${dataset.companyId}`, { replace: true });
         setLoading(false)
      },
   });

   useEffect(() => {
      formik.setValues(updateInitialValues(item))
   }, [item, companies])

   useEffect(() => {
      console.log('item', item, formik.values)
      setDifferentData(!objectIsEqual(item, formik.values))
   }, [formik.values])

   const loadData = async () => {

      setLoading(true)
      if (!add) {
         console.log('id', id, add)
         await getUserData(id).then((item) => {
            if (item == null) {
               console.log('item', item)
               navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}`);
            }
            setItem({ ...item })
         }).catch((e) => {
            console.log('e', e)
            navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}`);
         })

         setCompanies(await loadCompaniesInDB(companies, userData))

      }
      else {
         const id = Firebase.firestore().collection(USERS_PATH).doc().id;
         setItem({ ...item, uid: id })
         setCompanies(await loadCompaniesInDB(companies, userData))

         console.log('opa novo user', companies, item)

      }
      setLoading(false)
   }

   // Se não achou no banco, volta para Empresas
   useEffect(() => {
      loadData()
   }, [])

   const handleClickBack = () => {
      navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}`);
   }

   return (
      <Paper elevation={0} variant="outlined" className={gClasses.containerPaper}>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle
                  colorDescription={differentData ? 'error' : null}
                  description={webScreen ? differentData ? 'Dados alterados! Click em salvar!' : `Aqui você pode editar as informações sobre a empresa.` : ''}
                  descriptionClassName={clsx(gClasses.marginBottom30, gClasses.padding12)}>
                  {add ? "Adicionar Usuário" : "Editar Usuário"}
               </TabSubtitle >
            </div>
            
            <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <UserForm formik={formik} initialItem={item} companies={companies.allData} loading={loading} />
            </Paper >
            
            <Grid container justifyContent="space-between">

               <Grid justifyContent="flex-start" className={gClasses.marginVertical8}>
                  <Button onClick={handleClickBack}
                     startIcon={<ArrowBackIosNewIcon />}
                     variant="outlined"
                     color="error">Voltar
                  </Button>
               </Grid>

               <Grid justifyContent="flex-end" className={gClasses.marginVertical8}>
                  <Button onClick={(e) => formik.setValues(updateInitialValues(item))} color="inherit" disabled={Boolean(loading)}>Restaurar dados</Button>
                  <LoadingButton
                     disabled={Boolean(loading)}
                     color="primary"
                     onClick={(e) => formik.submitForm()}
                     variant='contained'
                     loading={loading}
                     startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
                  >
                     Salvar
                  </LoadingButton>
               </Grid>
            </Grid>
         </Paper>

      </Paper>
   );
}

export default UserDetail;