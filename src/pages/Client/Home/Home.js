import React, { useContext } from 'react'
import clsx from 'clsx'
// import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'
import { AuthContext } from 'hooks/AuthContext'
import { LunchSatusCard } from './LunchSatusCard'

const ClientHome = () => {
   const gClasses = useGlobalStyles()

   const { userData } = useContext(AuthContext)
   return (
      <>
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <LunchSatusCard userData={userData}/>
      </div>
      </>
   )
}

export default ClientHome;