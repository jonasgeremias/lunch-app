import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
// import AddEditDialog from './AddEditDialog/AddEditDialog'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Paper, Grid, List } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import { USERS_TABLE_COLUMNS, createDataUsersTable, initialStateTable } from './getDataTable'
import { useAuthContext } from 'hooks/AuthContext'
import { inactiveUsersInDB, loadUsersInDB } from 'utils/firebase/users'
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import ConfirmDeleteDialog from 'components/molecules/ConfirmDeleteDialog/ConfirmDeleteDialog';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { COMPANY_ADD, USERS_PATH, ORIGIN_ROUTES } from 'constants/routes';
import { loadCompaniesInDB } from 'utils/firebase/companies';
import { initialValuesFilters, validationSchemaFilters } from './Filters/getInputs';

import Filters from './Filters/Filters';

import { useFormik } from 'formik';

const InactiveItemsList = ({ item }) => {
   return (
      <ListItem component="div" disablePadding>
         <ListItemButton>
            <ListItemText
               primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
               secondary={`${item.uid}`} primary={`${item.name}`} />
         </ListItemButton>
      </ListItem>
   );
}

const RestauranteHome = () => {
   const navigate = useNavigate();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   // const [dataGridLoading, setDataGridLoading] = useState(false)
   // const [deleteLoading, setDeleteLoading] = useState(false)
   // const [deleteDialog, setDeleteDialog] = useState(false)
   const [companies, setCompany] = useState({})
   const [showTable, setShowTable] = useState([])
   const [table, setTable] = useState(initialStateTable)
   // const [selectedRowsData, setSelectedRowsData] = useState([])
   const { userData } = useAuthContext();
   const { showSnackBar } = useSnackBar();

   // const userData = useSelector(state => state.app.user)
   // const formikFilters = useFormik({
   //    initialValues: initialValuesFilters,
   //    validationSchema: validationSchemaFilters,
   //    onSubmit: async (values) => {
   //       const ret = await loadUsersInDB({...table, filters: values }, userData)
   //       // console.log('onSubmit', ret)
   //       setTable(ret)
   //    },
   // });

   // Atualiza a tabela em tela
   useEffect(() => {
      console.log('[table, companies]')
      if (!table.error && !companies.error) {

         console.log('createDataUsersTable')
         setShowTable(createDataUsersTable(table.allData, companies.allData))
      }
   }, [table, companies])

   // const onClickItem = (item) => {
   //    navigate(`/${ORIGIN_ROUTES}/${USERS_PATH}/${item.id}`);
   // }

   const handleCLickButton = e => {
      console.log('Button')
   }

   const loadInitialData = async () => {
      const [dataCompanies, dataUsers] = await Promise.all([
         loadCompaniesInDB(companies, userData),
         loadUsersInDB(table, userData)
      ]
      )
      setCompany(dataCompanies)
      setTable(dataUsers)
   }

   useEffect(() => {
      loadInitialData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // const onRowsSelectionHandler = (ids) => {
   //    setSelectedRowsData(ids)
   // };


   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={gClasses.containerPaper}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle description={webScreen ? `Aqui você pode consultar todos os almoços do dia` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  Lista de almoço do dia
               </TabSubtitle >
            </div>

            <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
               <Grid container item>
                  {/* <Grid item xs={12} sm={4} md={2}> */}
                  <Button fullWidth size="large" color='primary' onClick={handleCLickButton} variant='contained' >
                     Gerar Lista de almoço
                  </Button>
                  {/* </Grid> */}
               </Grid>
            </Paper>

            <DataGrid
               rowReordering
               rows={showTable}
               columns={USERS_TABLE_COLUMNS}
               autoHeight
               // onRowDoubleClick={onClickItem}
               checkboxSelection={true}
               disableSelectionOnClick={true}
               // rowsPerPageOptions={20}
               components={{
                  Toolbar: GridToolbar
               }}
               // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
         </Paper>
      </div >
   )
}


export default RestauranteHome;

