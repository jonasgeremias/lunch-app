import React from 'react'
import clsx from 'clsx'
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'

const RestaurantProfile = () => {
   const gClasses = useGlobalStyles()
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <ShowFeedback animation='loading' fullScreen />
      </div>
   )
}

export default RestaurantProfile;