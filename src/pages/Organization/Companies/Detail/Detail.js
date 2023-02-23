import { useBreakPoint } from 'hooks/useBreakPoint';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalStyles } from 'styles';
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Paper } from '@mui/material'
import clsx from 'clsx'

const Detail = () => {
   let { id } = useParams();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle description={webScreen ? `Aqui você pode ver as informações sobre a empresa.` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  Detalhes da Empresa {id}
               </TabSubtitle >
            </div>
         </Paper >

      </div >
   );
}

export default Detail;