// import Detail from './CompanieTab/CompanieTab';
// const Detail = ({ add }) => (<CompanieTab add={add} />);
// export default Detail;



import { useBreakPoint } from 'hooks/useBreakPoint';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalStyles } from 'styles';
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { useEffect } from 'react';
import { getCompanyData, setCompanyData } from 'utils/firebase/companies';
import { useNavigate } from 'react-router-dom';
import { COMPANIES_PATH, ORIGIN_ROUTES } from 'constants/routes';
import { Firebase } from 'utils';
import { initialValues, validationSchema } from './getInputs'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useOrgContext } from 'hooks/OrgContext';
import { useAuthContext } from 'hooks/AuthContext';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import ContactForm from './ContactForm';
import { objectIsEqual } from 'utils/compareDifferentInput';
import { updateInitialValues } from 'utils/updateInitialValues';
import SaveIcon from '@mui/icons-material/Save';
import FAB from 'components/atoms/FAB/FAB';

const Detail = ({ add }) => {
   let { id } = useParams();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const { showSnackBar } = useSnackBar()
   const [item, setItem] = useState(initialValues)
   const [differentData, setDifferentData] = useState(false)

   let navigate = useNavigate();

   const [loading, setLoading] = useState(false)
   const { org } = useOrgContext()
   const { user } = useAuthContext()

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onReset: () => {
         formik.setValues(updateInitialValues(item, initialValues))
      },
      onSubmit: async (values) => {
         setLoading(true)
         const dataset = { ...item, ...values }
         console.log('onSubmit', dataset)
         const { error, message, data, newDoc } = await setCompanyData(dataset, add, user, org)
         setLoading(false)
         showSnackBar(message, error ? 'error' : 'success');
         if (!error) {
            setItem(data)
         }

         if (newDoc) navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}/${dataset.companyId}`, { replace: true });
      },
   });

   useEffect(() => {
      formik.setValues(updateInitialValues(item, initialValues))
   }, [item])

   useEffect(() => {
      setDifferentData(!objectIsEqual(item, formik.values))
   }, [formik.values])


   // Se não achou no banco, volta para Empresas
   useEffect(() => {
      setLoading(true)
      if (!add) {
         getCompanyData(id).then((item) => {
            if (item == null) {
               navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}`);
            }
            setItem({ ...item })
         }).catch(() => {
            navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}`);
         })
      }
      else {
         const id = Firebase.firestore().collection(COMPANIES_PATH).doc().id;
         setItem({ ...item, companyId: id })
      }
      setLoading(false)
   }, [])

   const handleClickBack = () => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}`);
   }

   return (
      <>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.containerPaper)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle
                  colorDescription={differentData ? 'error' : null}
                  description={webScreen ? differentData ? 'Dados alterados! Click em salvar!' : `Aqui você pode editar as informações sobre a empresa.` : ''}
                  descriptionClassName={clsx(gClasses.marginBottom30, gClasses.padding12)}>
                  {add ? "Adicionar Empresa" : "Editar Empresa"}
               </TabSubtitle >
            </div>
            <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <ContactForm formik={formik} initialItem={item} />
            </Paper >
            <Grid container justifyContent="space-between">

               <Grid className={gClasses.marginVertical8}>
                  <Button onClick={handleClickBack}
                     startIcon={<ArrowBackIosNewIcon />}
                     variant="outlined"
                     color="error">Voltar
                  </Button>
               </Grid>

               <Grid className={gClasses.marginVertical8}>
                  <Button onClick={(e) => formik.setValues(updateInitialValues(item, initialValues))} color="error" variant='outlined' disabled={Boolean(loading)}>Restaurar dados</Button>
                  {/* <LoadingButton
                     disabled={Boolean(loading)}
                     color="primary"
                     onClick={(e) => formik.submitForm()}
                     variant='contained'
                     loading={loading}
                     // startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
                     startIcon={<SaveIcon/>}
                  >
                     Salvar
                  </LoadingButton> */}
               </Grid>

               <FAB
                  disabled={Boolean(loading)}
                  onClick={(e) => formik.submitForm()}
                  icon={<SaveIcon />}
               />
            </Grid>
         </Paper>
      </>
   );
}

export default Detail;