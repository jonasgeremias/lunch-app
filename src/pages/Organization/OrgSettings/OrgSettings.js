import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useGlobalStyles } from 'styles'
import WorkScheduleForm from './WorkScheduleForm';
import DatesExceptionsForm from './DatesExceptionsForm';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './getInputs';
// import { useNavigate } from 'react-router-dom';
import { useOrgContext } from 'hooks/OrgContext';
import { useAuthContext } from 'hooks/AuthContext';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
// import { ORIGIN_ROUTES } from 'constants/routes';
import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle';
import { LoadingButton } from '@mui/lab';
import { useBreakPoint } from 'hooks/useBreakPoint';
import { getOrgData, setOrgData } from 'utils/firebase/organization';
import ContactForm from './ContactForm';
import { objectIsEqual } from 'utils/compareDifferentInput';
import LunchTypesSettings from './LunchTypesSettings';
import { updateInitialValues } from 'utils/updateInitialValues';
import FAB from 'components/atoms/FAB/FAB';
import SaveIcon from '@mui/icons-material/Save';

const OrgSettings = () => {
   const gClasses = useGlobalStyles()
   const { org, setOrg } = useOrgContext()
   const { user } = useAuthContext()
   const { showSnackBar } = useSnackBar()
   const webScreen = useBreakPoint('up', 'md')
   const [item, setItem] = useState(initialValues)
   const [differentData, setDifferentData] = useState(false)
   const [loading, setLoading] = useState(true)
   const [tried, setTried] = useState(0)
      
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
         const { error, message, data } = await setOrgData(dataset, false, user, org)

         setLoading(false)
         showSnackBar(message, error ? 'error' : 'success');
         if (!error) {
            setItem(data)
            setOrg(data) // Atualiza o contexto
         }
      },
   });

   const getOrganizationData = () => {
      getOrgData(org.orgId).then((item) => {
         if (item == null) {
            return setTried(tried + 1)
         }
         setItem({ ...item })
         setLoading(false)
      }).catch(() => {
         setTried(tried + 1)
      })
   }

   useEffect(() => {
      setLoading(true)
      if (tried < 10) {
         getOrganizationData();
      } else showSnackBar('verifique sua conexão com internet', 'error')
   }, [tried])

   useEffect(() => {
      formik.setValues(updateInitialValues(item, initialValues))
   }, [item])

   const setSchedule = (field, status) => {
      const newSchedule = { ...formik.values.schedule, [field]: status }
      formik.setValues({ ...formik.values, schedule: newSchedule })
   }

   // const setLunchTypes = (list, deleteList = false) => {
   //    console.log('setLunchTypes', list, deleteList)
   //    const uniques = Object.values(list).reduce((acc, curr) => {
   //       const { name, price} = curr;
   //       acc[name] = { name, price};
   //       return acc;
   //    }, {});
   //    let newLunchTypes = {}
   //    if ('lunchTypes' in formik.values && !deleteList) {
   //       newLunchTypes = { ...formik.values.lunchTypes, ...uniques }
   //    }
   //    else newLunchTypes = { ...uniques }
   //    formik.setValues({ ...formik.values, lunchTypes: newLunchTypes })
   // }
   
   const setDatesExceptions = (list, deleteList = false) => {
      console.log('setDatesExceptions', deleteList)

      const uniques = Object.values(list).reduce((acc, curr) => {
         const { date, description, typeOfDay } = curr;
         acc[date] = { date, description, typeOfDay };
         return acc;
      }, {});

      let newDatesExceptions = {}
      if ('datesExceptions' in formik.values && !deleteList) {
         newDatesExceptions = { ...formik.values.datesExceptions, ...uniques }
      }
      else newDatesExceptions = { ...uniques }

      formik.setValues({ ...formik.values, datesExceptions: newDatesExceptions })
   }
   
   useEffect(() => {
      setDifferentData(!objectIsEqual(item, formik.values))
   }, [formik.values])
   
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.containerPaper)}>
            <Grid container justifyContent="space-between" className={gClasses.marginVertical8}>
               <Grid item className={gClasses.marginVertical8} textAlign="left">
                  <TabSubtitle
                     colorDescription={differentData ? 'error' : null}
                     description={webScreen ? differentData ? 'Dados alterados! Click em salvar!' : `Aqui você pode editar as informações sobre a organização.` : ''}
                     descriptionClassName={clsx(gClasses.marginBottom30, gClasses.padding12)}>
                     Dados da organização
                  </TabSubtitle >
               </Grid>

               <Grid container className={gClasses.marginVertical8} justifyContent='space-between'>
                  <Button onClick={(e) => formik.setValues(updateInitialValues(item, initialValues))} color="error" variant='outlined' disabled={Boolean(loading)}>Restaurar dados</Button>
                  <LoadingButton
                     startIcon={<SaveIcon/>}
                     disabled={Boolean(loading)}
                     color="primary"
                     onClick={(e) => formik.submitForm()}
                     variant='contained'
                     loading={loading}
                     // startIcon={loading ? <CircularProgress color='inherit' size={20} /> : null}
                  >
                     Salvar
                  </LoadingButton>
               </Grid>
            </Grid>
         </Paper>

         <ContactForm formik={formik} initialItem={item} />
         <LunchTypesSettings formik={formik} initialItem={item} />
         <WorkScheduleForm schedule={formik.values.schedule} setSchedule={setSchedule} />
         <DatesExceptionsForm list={formik.values.datesExceptions} setList={setDatesExceptions} />
         
         <FAB 
            disabled={Boolean(loading)}
            onClick={(e) => formik.submitForm()}
            icon={<SaveIcon/>}
         />
      </div>
   )
}




export default OrgSettings;