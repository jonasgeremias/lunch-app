import { useBreakPoint } from 'hooks/useBreakPoint';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalStyles } from 'styles';
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Grid, Paper, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { useEffect } from 'react';
import { getCompanieData, updateFieldValueInDoc } from 'utils/firebase/companies';
import { ContactInfo } from './ContactInfo';
import { initialValues } from '../ContactForm/getInputs';
import { useNavigate } from 'react-router-dom';
import { COMPANIE_PATH, ORIGIN_ROUTES } from 'constants/routes';
import { Firebase } from 'utils';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WorkScheduleForm from './WorkInfo';
import DatesExceptionsForm from './DatesExceptionsForm';

const Detail = ({ add }) => {
   let { id } = useParams();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const { showSnackBar } = useSnackBar()
   const [item, setItem] = useState(initialValues)
   let navigate = useNavigate();
   
   const setSchedule = (field, status) => {
      const newSchedule = {...item.schedule, [field]: status }
      updateFieldValueInDoc(id, 'schedule', newSchedule).then((doc) => {
         setItem({...item, schedule: newSchedule})
      }).catch((e => {console.error(e); showSnackBar('Erro ao salvar', 'error')}))
   }
   
   const setDatesExceptions = (list) => {
      console.log('setDatesExceptions', list)
      const newDatesExceptions = {...item.datesExceptions, ...list}
      console.log('newDatesExceptions', newDatesExceptions)
      updateFieldValueInDoc(id, 'datesExceptions', newDatesExceptions).then((doc) => {
         setItem({...item, datesExceptions: newDatesExceptions})
         
         console.log('item', item)
      }).catch((e => {console.error(e); showSnackBar('Erro ao salvar', 'error')}))
   }
   
   // Se não achou no banco, volta para Empresas
   useEffect(() => {
      if (!add) {
         getCompanieData(id).then((item) => {
            if (item == null) {
               navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}`);
            }
            setItem({...item})
            console.log('item', item)
         }).catch(() => {
            navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}`);
         })
      }
      else {
         const id = Firebase.firestore().collection(COMPANIE_PATH).doc().id;
         setItem({ ...item, companieId: id })
      }
   }, [])

   const handleClickBack = () => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}`);
   }

   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
         <Button onClick={handleClickBack}
                  startIcon={<ArrowBackIosNewIcon />}
                  variant="outlined"
                  color="error">Voltar</Button>
         </Paper>

         <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
            
               <TabSubtitle description={webScreen ? `Aqui você pode editar as informações sobre a empresa.` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  {add ? "Adicionar Empresa" : "Editar Empresa"}
               </TabSubtitle >
            </div>
            <ContactInfo item={item} setItem={setItem} />
            <WorkScheduleForm schedule={item.schedule} setSchedule={setSchedule}/>
            <DatesExceptionsForm list={item.datesExceptions} setList={setDatesExceptions}/>
         </Paper >
      </div >
   );
}

export default Detail;