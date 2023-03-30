import React, { useContext } from 'react'
import clsx from 'clsx'
// import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
import { LunchStatusCard } from './LunchStatusCard'
import { useOrgContext } from 'hooks/OrgContext'
import { useCompanyContext } from 'hooks/CompanyContext'

const ClientHome = () => {
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext()
   const { org } = useOrgContext()
   const { company } = useCompanyContext()
   
   console.log('userData', userData)
   return (
      <>
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <LunchStatusCard userData={userData} org={org} company={company}/>
      </div>
      </>
   )
}

export default ClientHome;