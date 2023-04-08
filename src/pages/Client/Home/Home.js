import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Paper, Grid } from '@mui/material';
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
// import { useOrgContext } from 'hooks/OrgContext'
// import { useCompanyContext } from 'hooks/CompanyContext'
import CalendarStatus from './CalendarStatus';
import { CardDetail } from './CardDetail';
import ClientUpdateLunchSettings from './ClientUpdateLunchSettings/ClientUpdateLunchSettings';
import LunchSettings from './LunchSettings';
import { getTimestamp } from 'utils/firebase/firebase';
import { getChangedLunchesInDbByDate } from 'utils/firebase/users';
import { getLunchToday, testDateBeforeCurrent } from 'utils/date';

const initialLunchDialog = {
   open: false,
   item: null,
   settings: false,
   // changedLunch: null //{ day: 30, month: 3, year: 2023, datetime: '2023/03/29', lunchTypes: "not", restaurantApproved: false }
}

export default function ClientHome() {
   const gClasses = useGlobalStyles()
   const [updateLunchDialog, setUpdateLunchDialog] = useState(initialLunchDialog)
   const [changedLunch, setChangedLunch] = useState([]);
   const [lunchChangesToday, setLunchChangesToday] = useState({});
   const { userData } = useAuthContext();

   // Atualiza a data e hora atual
   const [currentTime, setCurrentTime] = useState(getTimestamp().toDate());
   useEffect(() => {
      const interval = setInterval(() => {
         const now = getTimestamp().toDate();
         setCurrentTime(now);
      }, 1000 * 30);
      getChangedLunchesByDate(currentTime)
      return () => clearInterval(interval);
   }, []);

   // @ok
   const updateListChangedLunches = (updatedData) => {
      // const index = changedLunch.data.changedLunchList.findIndex(obj => getLunchToday(obj, currentTime)); // Find the index of the object element with the same ID
      // // Return a new array with the updated object element
      // const updateChangedLunchesList = changedLunch.data.changedLunchList.map((obj, i) => {
      //    if (i === index) {
      //       return item.changedLunchesList; // Update the object element at the index with the updated values
      //    }
      //    return obj; // Return all other object elements as they are
      // });
      // if (updateChangedLunchesList?.length == 0) updateChangedLunchesList.push(item.changedLunchesList)
      // const updatedData = {
      //    ...changedLunch,
      //    data : {
      //       ...changedLunch.data,
      //       changedLunchList: updateChangedLunchesList
      //    },
      // }
      setChangedLunch(updatedData)
   }

   // @ok o filter está pegando o objeto correto
   useEffect(() => {
      if (changedLunch?.data?.changedLunchList?.length > 0) {
         const filter = changedLunch.data.changedLunchList.filter((item) => getLunchToday(item, currentTime))
         if (filter?.length > 0) setLunchChangesToday(filter[0])
      }
   }, [changedLunch])

   // @ok
   const closeUpdateLunchDialog = (e) => {
      setUpdateLunchDialog(initialLunchDialog)
   }


   // @pending
   // const handleDayClick = (date) => {
   //    const dayBeforeCurrentDate = !testDateBeforeCurrent(day, referenceDate)
      
   //    if (console.log())
   // }

   const openLunchDialog = (item, settings) => {
      if (settings) {
         setUpdateLunchDialog({ open: true, item: null, settings: true })
      }
      else setUpdateLunchDialog({ open: true, item: item, settings: false })
   }

   const getChangedLunchesByDate = async (date) => {
      setChangedLunch(await getChangedLunchesInDbByDate(userData, date))
   }

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
               changedLunch={changedLunch}
               openLunchDialog={openLunchDialog}
               // handleDayClick={handleDayClick}
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
