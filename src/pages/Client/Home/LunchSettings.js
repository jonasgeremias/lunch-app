import { useAuthContext } from 'hooks/AuthContext'
// import { useCompanyContext } from 'hooks/CompanyContext'
import { useOrgContext } from 'hooks/OrgContext'
import React from 'react'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx';
import { Button, Grid, Paper, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

function LunchSettings({openLunchDialog}) {
   
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext()
   const { org } = useOrgContext()
   // const { company } = useCompanyContext()
      
   // Encontrando a descrição do almoço escolhido
   let myLunch = org.lunchTypes.filter(item => item.id === userData.lunchTypes)
   if (myLunch?.length !== 1) myLunch = { id: 'erro', name: 'error' }
   else myLunch = myLunch[0]
   
   return (
      <>
      <Paper variant="outlined" className={clsx(gClasses.containerPaper, gClasses.textCenter)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <Typography variant='h6' color='textSecondary' className={gClasses.marginBottom10}>
                  Configuração de almoço
               </Typography >
            </div>

            <Grid container align='center' spacing={{ xs: 2, md: 3 }} className={clsx(gClasses.padding12, gClasses.marginVertical8, gClasses.textCenter)}>
               <Grid item xs={12} align='center'>
                  <Typography variant='body' color='textSecondary'>Seu almoço é sempre:</Typography>
                  <Typography variant='h5' padding={1} color={myLunch.id == 'not' ? 'error' : 'info'}>{myLunch.name}</Typography>
               </Grid>
               <Grid item xs={12} align='center'>
                  <Grid item xs={12} md={4} align='center'>
                     <Button 
                      className={gClasses.primaryGradient}
                      fullWidth edge="end" size='large' aria-label="edit" color="primary" variant='contained' onClick={() => openLunchDialog(null, true)}>
                        <EditIcon /> Alterar
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </>
      )
   }
   
export default LunchSettings;