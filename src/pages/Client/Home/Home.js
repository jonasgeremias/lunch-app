import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Paper, Grid } from '@mui/material';
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
import { useOrgContext } from 'hooks/OrgContext'
import { useCompanyContext } from 'hooks/CompanyContext'
import CalendarStatus from './CalendarStatus';
import { CardDetail } from './CardDetail';
import ClientUpdateLunchSettings from './ClientUpdateLunchSettings/ClientUpdateLunchSettings';
import LunchSettings from './LunchSettings';
import { getTimestamp } from 'utils/firebase/firebase';
import { getThisMonthChangedLunchesInDB } from 'utils/firebase/users';
import { getLunchToday } from 'utils/date';

const initialLunchDialog = {
   open: false,
   item: null,
   settings: false,
   // changedLunchList: null //{ day: 30, month: 3, year: 2023, datetime: '2023/03/29', lunchTypes: "not", restaurantApproved: false }
}

export default function ClientHome() {
   const gClasses = useGlobalStyles()
   const [updateLunchDialog, setUpdateLunchDialog] = useState(initialLunchDialog)
   const [changedLunchList, setChangedLunchList] = useState([]);
   const [lunchChangesToday, setLunchChangesToday] = useState({});
   const { userData } = useAuthContext();



   // Atualiza a data e hora atual
   const [currentTime, setCurrentTime] = useState(getTimestamp().toDate());
   useEffect(() => {
      const interval = setInterval(() => {
         const now = getTimestamp().toDate();
         setCurrentTime(now);
      }, 1000 * 30);
      getThisMonthChangedLunches()
      return () => clearInterval(interval);
   }, []);


   const updateListChangedLunches = (item) => {
      const index = changedLunchList.data.findIndex(obj => getLunchToday(obj, currentTime)); // Find the index of the object element with the same ID

      // Return a new array with the updated object element
      const updatedData = changedLunchList.data.map((obj, i) => {
         if (i === index) {
            return item; // Update the object element at the index with the updated values
         }
         return obj; // Return all other object elements as they are
      });

      setChangedLunchList({ ...changedLunchList, data: updatedData })
   }



   useEffect(() => {
      if (changedLunchList?.data?.length > 0) {
         console.log('changedLunchList', changedLunchList)
         const filter = changedLunchList.data.filter((item) => getLunchToday(item, currentTime))
         if (filter?.length > 0) setLunchChangesToday(filter[0])
      }

   }, [changedLunchList])


   const closeUpdateLunchDialog = (e) => {
      setUpdateLunchDialog(initialLunchDialog)
   }

   const handleDayClick = (e) => {
      console.log('handleDayClick', e)
   }

   const openLunchDialog = (item, settings) => {
      if (settings) {
         setUpdateLunchDialog({ open: true, item: null, settings: true })
      }
      else setUpdateLunchDialog({ open: true, item: item, settings: false })
   }


   const getThisMonthChangedLunches = async () => {
      setChangedLunchList(await getThisMonthChangedLunchesInDB(userData, currentTime.getMonth() + 1))
   }

   // console.log('lunchChangesToday', lunchChangesToday)
   return (
      <Grid container justifyContent="center" alignItems="center">
         <Grid xs={12} md={8} item>
            <Paper variant="outlined" className={clsx(gClasses.containerPaper)}>
               <CardDetail
                  currentTime={currentTime}
                  lunchChangesToday={lunchChangesToday}
                  openLunchDialog={openLunchDialog}
               />
            </Paper>

            <LunchSettings openLunchDialog={openLunchDialog} />

            <CalendarStatus
               changedLunchList={changedLunchList}
               openLunchDialog={openLunchDialog}
               handleDayClick={handleDayClick}
               currentTime={currentTime}
               />


            <ClientUpdateLunchSettings
               updateLunch={updateLunchDialog}
               closeUpdateLunchDialog={closeUpdateLunchDialog}
               updateListChangedLunches={updateListChangedLunches}
            />
         </Grid>
      </Grid>
   )
}
