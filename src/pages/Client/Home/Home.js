import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
import { useOrgContext } from 'hooks/OrgContext'
import { useCompanyContext } from 'hooks/CompanyContext'

import CalendarStatus from './CalendarStatus';
import { CardDetail } from './CardDetail';
import { initialValuesClientHome, validationSchemaClientHome } from './getInputs';
import { useFormik } from 'formik';
import { updateInitialValues } from 'utils/updateInitialValues';
import { objectIsEqual } from 'utils/compareDifferentInput';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';


export default function ClientHome() {
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext()
   const { org } = useOrgContext()
   const { company } = useCompanyContext()
   
   const [item, setItem] = useState(initialValuesClientHome)
   const { showSnackBar } = useSnackBar()
   const [differentData, setDifferentData] = useState(false)
   const [editing, setEditing] = useState(false);
   
   // const userData = useSelector(state => state.app.user)
   const formik = useFormik({
      initialValues: initialValuesClientHome,
      validationSchema: validationSchemaClientHome,
      onSubmit: async (values) => {
         // const ret = await loadUsersInDB({ ...table, filters: values }, userData)
         console.log('onSubmit', values)
         // setTable(ret)
      },
   });
   
   useEffect(() => {
      formik.setValues(updateInitialValues(item, initialValuesClientHome))
   }, [item])

   useEffect(() => {
      setDifferentData(!objectIsEqual(item, formik.values))
   }, [formik.values])
   
   

   console.log(userData, company, org)
   const handleDayClick = (e) => {
      console.log('handleDayClick', e)
   }
   const status = { userData, company, org }

   return (
      <>
         <Paper variant="outlined" className={clsx(gClasses.containerPaper)}>
            {/* <CalendarStatus formik={formik} handleDayClick={handleDayClick} status={status} /> */}
            <CardDetail formik={formik} handleDayClick={handleDayClick} status={status} />
         </Paper>
         
      </>
   )
}
