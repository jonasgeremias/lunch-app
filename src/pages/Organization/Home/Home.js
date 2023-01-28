import React, { useContext } from 'react'
import clsx from 'clsx'
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'
import { AuthContext } from 'hooks/AuthContext'

const Home = () => {
   const gClasses = useGlobalStyles()

   const { userData } = useContext(AuthContext)
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <ShowFeedback animation='development' fullScreen title='Em desenvolvimento' subtitle='Módulo em construção!' />
      </div>
   )
}

export default Home;