import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Paper, Grid } from '@mui/material';
import { useGlobalStyles } from 'styles'
import { useAuthContext } from 'hooks/AuthContext'
import { useOrgContext } from 'hooks/OrgContext'
import { useCompanyContext } from 'hooks/CompanyContext'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle';
import { useBreakPoint } from 'hooks/useBreakPoint';
import Filters from './Filters/Filters';
import { initialValuesFilters, validationSchemaFilters } from './Filters/getInputs';
import { useFormik } from 'formik';
import { LUNCH_TABLE_COLUMNS, createLunchTable, initialStateTable } from './getDataTable';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { loadCompaniesInDB } from 'utils/firebase/companies';


export default function RestaurantHome() {
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext();
   const webScreen = useBreakPoint('up', 'md')
   const [dataGridLoading, setDataGridLoading] = useState(false)
   const [table, setTable] = useState(initialStateTable)
   const [showTable, setShowTable] = useState([])
   const [companies, setCompany] = useState({})
   const { org } = useOrgContext()

   // const userData = useSelector(state => state.app.user)
   const formikFilters = useFormik({
      initialValues: initialValuesFilters,
      validationSchema: validationSchemaFilters,
      onSubmit: async (values) => {
         setDataGridLoading(true)
         // const ret = await loadUsersInDB({...table, filters: values }, userData)
         // console.log('onSubmit', ret)
         setDataGridLoading(false)
         // setTable(ret)
      },
   });

   // const onRowsSelectionHandler = (ids) => {
   //    setSelectedRowsData(ids)
   // };

   // Atualiza a tabela em tela
   useEffect(() => {
      if (!table.error && !companies.error && org != null) {
         setShowTable(createLunchTable(table.allData, companies.allData, org))
      }

   }, [table, companies])

   const loadInitialData = async () => {
      setCompany(await loadCompaniesInDB(companies, userData))
      // setTable(await loadUsersInDB(table, userData)) @audit buscar os lunches 
   }

   useEffect(() => {
      loadInitialData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const onClickItem = (item) => {
      // navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}/${item.id}`);
      console.log('clickItem', item)
   }
   // console.log('lunchChangesToday', lunchChangesToday)
   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={gClasses.containerPaper}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle description={webScreen ? `Aqui você pode consultar os almoços das empresas.` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  Consulta de Almoços
               </TabSubtitle >
            </div>

            <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
               <Filters formikFilters={formikFilters} />
            </Paper>

            <DataGrid
               rowReordering
               loading={dataGridLoading}
               rows={showTable}
               columns={LUNCH_TABLE_COLUMNS}
               autoHeight
               onRowDoubleClick={onClickItem}
               checkboxSelection={true}
               disableSelectionOnClick={true}
               components={{
                  Toolbar: GridToolbar
               }}
            // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />

         </Paper>
      </div>
   )
}
