import React from 'react'
import { useGlobalStyles } from 'styles'
import Fab from '@mui/material/Fab'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import clsx from 'clsx'
/**
 * A FAB button with + icon
 */
const FAB = ({ onClick }) => {
   const gClasses = useGlobalStyles()
   return (
      <Fab color="primary" className={gClasses.FAB} size='large' onClick={onClick}>
         <AddRoundedIcon />
      </Fab>
   )
}

export default FAB