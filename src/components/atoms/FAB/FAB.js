import React from 'react'
import { useGlobalStyles } from 'styles'
import Fab from '@mui/material/Fab'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import clsx from 'clsx'
/**
 * A FAB button with + icon
 */
const FAB = ({ onClick, disabled=false ,icon=null}) => {
   const gClasses = useGlobalStyles()
   return (
      <Fab color="primary" disabled={disabled} className={gClasses.FAB} size='large' onClick={onClick}>
         {icon != null? icon: <AddRoundedIcon />}
      </Fab>
   )
}

export default FAB