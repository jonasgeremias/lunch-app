import React, { useState } from 'react'
import { useGlobalStyles } from 'styles';
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom';
// import { COMPANIES_PATH, ORIGIN_ROUTES } from 'constants/routes';
import CompanieTab from './CompanieTab/CompanieTab';
// import Users from '../../Users/Users';

const Detail = ({ add }) => {
   const gClasses = useGlobalStyles()
   // let navigate = useNavigate();

   // const [selectedTab, setSelectedTab] = useState(0);
   // const handleTabChange = (event, newValue) => {
   //    setSelectedTab(newValue);
   // };
   // const handleClickBack = () => {
   //    navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}`);
   // }

   // console.log('formik item', formik.values)
   return (
      <Paper elevation={0} variant="outlined" className={gClasses.containerPaper}>
            <CompanieTab add={add}/>
      {/* <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Tabs centered value={selectedTab} onChange={handleTabChange} aria-label="Tab navigation">
            <Tab label="Empresa" />
            <Tab label="Usuários" />
         </Tabs>
         <Box>
            {selectedTab === 0 && <CompanieTab add={add}/>}
            {selectedTab === 1 && <UsersTab />}
         </Box>
      </div > */}
      </Paper>
   );
}

export default Detail;