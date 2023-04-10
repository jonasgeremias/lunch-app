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
import { isLunchEquals, testDateBeforeCurrent } from 'utils/date';

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
   const [loadingMonth, setLoadingMonth] = useState(true);
   const { userData } = useAuthContext();

   // Atualiza a data e hora atual
   const [currentTime, setCurrentTime] = useState(getTimestamp().toDate());
   useEffect(() => {
      const interval = setInterval(() => {
         const now = getTimestamp().toDate();
         setCurrentTime(now);
      }, 1000 * 30);
      
      const month = currentTime?.getMonth() + 1
      const year = currentTime?.getFullYear();
      getChangedLunchesByDate(month, year)
      
      return () => clearInterval(interval);
   }, []);


   const updateListChangedLunches = (updatedData) => {
      setChangedLunch(updatedData)
   }

   useEffect(() => {
      if (changedLunch?.data?.changedLunchList?.length > 0) {
         const filter = changedLunch.data.changedLunchList.filter((item) => isLunchEquals(item, currentTime))
         if (filter?.length > 0) setLunchChangesToday(filter[0])
      }
   }, [changedLunch])

   const closeUpdateLunchDialog = (e) => {
      setUpdateLunchDialog(initialLunchDialog)
   }
   
   const openLunchDialog = (item, settings) => {
      if (settings) {
         setUpdateLunchDialog({ open: true, item: null, settings: true })
      }
      else setUpdateLunchDialog({ open: true, item: item, settings: false })
   }

   const getChangedLunchesByDate = async (month, year) => {
      setLoadingMonth(true)
      setChangedLunch(await getChangedLunchesInDbByDate(userData, month, year))
      setLoadingMonth(false)
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
               loadingMonth={loadingMonth}
               changedLunch={changedLunch}
               openLunchDialog={openLunchDialog}
               getChangedLunchesByDate={getChangedLunchesByDate}
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
