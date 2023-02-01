import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
import FAB from 'components/atoms/FAB/FAB'
import AddEditDialog from './AddEditDialog/AddEditDialog'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Paper } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import PaginationTable from './PaginationTable/PaginationTable'
import Filters from './Filters/Filters'
import { useFormik } from 'formik';
import { COMPANIE_TABLE_COLUMNS, createDataCompanieTable, initialStateTable, initialValuesFilters, validationSchemaFilters } from './getInputs'
import { useAuthContext } from 'hooks/AuthContext'
import { loadCompaniesInDB } from 'utils/firebase/companies'

import { DataGrid } from '@mui/x-data-grid';

const Companies = () => {
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const [isAddEditing, setIsAddEditing] = useState(false)
   const [companie, setCompanie] = useState({})
   const [showTable, setShowTable] = useState([])
   const [table, setTable] = useState(initialStateTable)
   const { userData } = useAuthContext();

   // Atualiza a tabela em tela
   useEffect(() => {
      setShowTable(createDataCompanieTable(table.allData))
   }, [table])

   const formikFilters = useFormik({
      initialValues: initialValuesFilters,
      validationSchema: validationSchemaFilters,
      onSubmit: async (values) => {
         //   alert(JSON.stringify(values, null, 2));
         setTable(await loadCompaniesInDB(table, userData))
      },
   });

   const onClickItem = (item) => {
      const comp = table.allData.filter(row => row.companieId == item.id)
      setCompanie(comp[0] || {})
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

   const loadData = async () => {
      setTable(await loadCompaniesInDB(table, userData))
   }


   return (
      <>
         <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
            <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <div className={clsx(gClasses.flexJustifySpaceBetween, !webScreen && gClasses.flexAlignCenter)}>
                  <TabSubtitle description={webScreen ? `Aqui você pode filtrar e consultar as empresas da organização.` : ''}
                     descriptionClassName={gClasses.marginBottom30}>
                     Consulta de Empresas
                  </TabSubtitle >
                  <Button color='primary' onClick={handleAdd} variant='outlined' size='small' >
                     Adicionar
                  </Button>
               </div>

               <Filters formikFilters={formikFilters} />

               <div style={{ display: 'flex', width: '100%', height: "80vh" }}>
                  <div style={{ flexGrow: 1 }}>
                     <DataGrid
                        rows={showTable}
                        columns={COMPANIE_TABLE_COLUMNS}
                        autoHeight
                        // rowsPerPageOptions={[ROWS_PER_PAGE_TABLE]}
                        onRowDoubleClick={onClickItem}
                     // checkboxSelection={true}
                     // disableSelectionOnClick={true}
                     />
                  </div>
               </div>


               {/* <PaginationTable
                  dataTable={table}
                  setDatatable={setTable}
                  onClickEdit={onClickItem}
                  loadData={loadData} /> */}
            </Paper >

            <AddEditDialog visible={isAddEditing} companieData={companie} onClose={handleCloseAddEdit} />
            {/* <FAB onClick={handleAdd} /> */}
         </div >

      </>



   )
}

export default Companies;


// function FlexLayoutGrid() {
//    const { data } = useDemoData({
//      dataSet: 'Commodity',
//      rowLength: 5,
//      maxColumns: 6,
//    });
//    console.log('data', data)
//    return (
//      <div style={{ height: 400, width: '100%' }}>
//        <div style={{ display: 'flex', height: '100%' }}>
//          <div style={{ flexGrow: 1 }}>
//            <DataGrid {...data} />
//          </div>
//        </div>
//      </div>
//    );
//  }
