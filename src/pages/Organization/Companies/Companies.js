import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
// import FAB from 'components/atoms/FAB/FAB'
import AddEditDialog from './AddEditDialog/AddEditDialog'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Paper } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
// import PaginationTable from './PaginationTable/PaginationTable'
// import Filters from './Filters/Filters'
// import { useFormik } from 'formik';
import { COMPANIE_TABLE_COLUMNS, createDataCompanieTable, initialStateTable, initialValuesFilters, validationSchemaFilters } from './getInputs'
import { useAuthContext } from 'hooks/AuthContext'
import { loadCompaniesInDB } from 'utils/firebase/companies'

import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import { COMPANIE_PATH, ORIGIN_ROUTES } from 'constants/routes';

const Companies = () => {
   const navigate = useNavigate();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const [isAddEditing, setIsAddEditing] = useState(false)
   const [loading, setLoading] = useState(true)
   const [companie, setCompanie] = useState({})
   const [showTable, setShowTable] = useState([])
   const [table, setTable] = useState(initialStateTable)
   const [selectedRowsData, setSelectedRowsData] = useState([])
   const { userData } = useAuthContext();

   // Atualiza a tabela em tela
   useEffect(() => {
      setShowTable(createDataCompanieTable(table.allData))
   }, [table])

   useEffect(() => {
      loadData() // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // const formikFilters = useFormik({
   //    initialValues: initialValuesFilters,
   //    validationSchema: validationSchemaFilters,
   //    onSubmit: async (values) => {
   //       //   alert(JSON.stringify(values, null, 2));
   //       setTable(await loadCompaniesInDB(table, userData))
   //    },
   // });

   const onClickItem = (item) => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}/${item.id}`);
      
      // const comp = table.allData.filter(row => row.companieId == item.id)
      // setCompanie(comp[0] || {})
      // setIsAddEditing(true)
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
      setLoading(false)
   }

   // const updateCompanieData = (item) => {
   //    console.log('updateCompanieData', item)
   //    const dataset = table.allData;
   //    const obj = dataset.find(row => row.companieId === item.companieId);
   //    if (!obj) {
   //       dataset.push(item)
   //    }
   //    const temp_table = dataset.map(row => {
   //       if (row.companieId != item.companieId) return row;
   //       return item
   //    })
   //    setTable({ ...table, allData: temp_table })
   // }

   const onRowsSelectionHandler = (ids) => {
      // const selectedRowsData = ids.map((id) => showTable.find((row) => row.id === id));
      console.log('ids', ids)
      setSelectedRowsData(ids)
   };

   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle description={webScreen ? `Aqui você pode consultar as empresas da organização.` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  Consulta de Empresas
               </TabSubtitle >
               <Button color='primary' onClick={handleAdd} variant='outlined' >
                  <AddIcon /> Adicionar
               </Button>
            </div>


            {/* <Filters formikFilters={formikFilters} /> */}

            {/* <Paper variant="outlined" className={gClasses.datagridOptions}>
               {selectedRowsData && selectedRowsData.length > 0 ?
                  <Button variant="outlined" startIcon={<DeleteIcon />}> Delete </Button> : null
               }
            </Paper> */}

            <div className={gClasses.dataGrid} >
               <DataGrid
                  loading={loading}
                  rows={showTable}
                  columns={COMPANIE_TABLE_COLUMNS}
                  autoHeight
                  // rowsPerPageOptions={[ROWS_PER_PAGE_TABLE]}
                  onRowDoubleClick={onClickItem}
                  checkboxSelection={false}
                  disableSelectionOnClick={true}
                  components={{
                     Toolbar: GridToolbar
                  }}

               // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}

               // isRowSelectable={(i) => console.log('select', i)}
               />
            </div>


            {/* <PaginationTable
                  dataTable={table}
                  setDatatable={setTable}
                  onClickEdit={onClickItem}
                  loadData={loadData} /> */}
         </Paper >

         <AddEditDialog visible={isAddEditing}
            companieData={companie}
            onClose={handleCloseAddEdit}
            // updateCompanieData={updateCompanieData}
            />
      </div >
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
