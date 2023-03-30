import { useAuthContext } from 'hooks/AuthContext'
import { useCompanyContext } from 'hooks/CompanyContext'
import { useOrgContext } from 'hooks/OrgContext'
import React from 'react'
import { useGlobalStyles } from 'styles'

function LunchSettings() {
   
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext()
   const { org } = useOrgContext()
   const { company } = useCompanyContext()
   
   console.log('userData', userData)
   
   return (
      <div>LunchSettings</div>
      )
   }
   
export default LunchSettings;