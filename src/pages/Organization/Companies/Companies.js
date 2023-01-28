import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
import { useGlobalStyles } from 'styles'
import FAB from 'components/atoms/FAB/FAB'
import AddEditDialog from './AddEditDialog/AddEditDialog'

const Companies = () => {
   const gClasses = useGlobalStyles()
   const [isAddEditing, setIsAddEditing] = useState(false)
   const [companie, setCompanie] = useState({})
   
   useEffect(() => {
     setTimeout(() => {
         
      
     }, 1000)
   }, [])
   
   const onclickItem = (companie) => {
      setCompanie(companie)
      console.log(companie)
      setIsAddEditing(true)
    }
  
    const handleAdd = e => {
      setCompanie({})
      setIsAddEditing(true)
    }
  
    const handleCloseAddEdit = () => {
      setCompanie({})
      setIsAddEditing(false)
    }

    
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <ShowFeedback animation='development' fullScreen title='Em desenvolvimento' subtitle='Módulo em construção!' />
         
         <AddEditDialog visible={isAddEditing} companieData={companie} onClose={handleCloseAddEdit}/>
         <FAB onClick={handleAdd} />
      </div>
   )
}

export default Companies;