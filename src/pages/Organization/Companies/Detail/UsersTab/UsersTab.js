
import React from 'react'
import { useGlobalStyles } from 'styles';
import { Paper } from '@mui/material'
import clsx from 'clsx'

const UsersTab = ({ add }) => {
   const gClasses = useGlobalStyles()
   return (
      <>
         <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
         UsersTab
         </Paper>
      </>
   );
}

export default UsersTab;