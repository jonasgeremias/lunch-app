import React from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'

export const LunchSatusCard = () => {
   const gClasses = useGlobalStyles()

   return (
      <Paper variant="outlined" className={gClasses.lunchStatusCard} >
         <div className={clsx(gClasses.flexColumn, gClasses.textCenter)}>
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.height24} />
            <Typography gutterBottom variant='h4' className={gClasses.bold}>TEXT TEXT TEXT TEXT</Typography>
            <div className={gClasses.flexJustifySpaceBetween}>
            </div>
         </div>
         <Button className={clsx(gClasses.primaryGradient, gClasses.textTransformNone)} fullWidth variant="contained" size='large' color="primary" disableElevation>
            Alterar Almoço
         </Button>
      </Paper>
   )
}
