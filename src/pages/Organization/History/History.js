import React from 'react'
import clsx from 'clsx'
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'

const History = () => {
   const gClasses = useGlobalStyles()
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
      <ShowFeedback animation='development' fullScreen title='Em desenvolvimento' subtitle='Módulo em construção!'/>
      </div>
   )
}

export default History;