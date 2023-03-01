import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
import AddEditDialog from './AddEditDialog/AddEditDialog'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Paper, Grid, List } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import { COMPANIE_TABLE_COLUMNS, createDataCompanieTable, initialStateTable, initialValuesFilters, validationSchemaFilters } from './getInputs'
import { useAuthContext } from 'hooks/AuthContext'
import { inactiveCompaniesInDB, loadCompaniesInDB } from 'utils/firebase/companies'
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { COMPANIE_PATH, ORIGIN_ROUTES } from 'constants/routes';
import LoadingButton from '@mui/lab/LoadingButton';
import ConfirmDeleteDialog from 'components/molecules/ConfirmDeleteDialog/ConfirmDeleteDialog';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';

const DeleteItemsList = ({ item }) => {
   return (
      <ListItem component="div" disablePadding>
         <ListItemButton>
            <ListItemText
               primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
               secondary={`${item.companieId}`} primary={`${item.companieName}`} />
         </ListItemButton>
      </ListItem>
   );
}

const Companies = () => {
   // const navigate = useNavigate();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const [isAddEditing, setIsAddEditing] = useState(false)
   const [dataGridLoading, setDataGridLoading] = useState(true)
   const [deleteLoading, setDeleteLoading] = useState(false)
   const [deleteDialog, setDeleteDialog] = useState(false)
   const [companie, setCompanie] = useState({})
   const [showTable, setShowTable] = useState([])
   const [table, setTable] = useState(initialStateTable)
   const [selectedRowsData, setSelectedRowsData] = useState([])
   const { userData } = useAuthContext();
   const { showSnackBar } = useSnackBar();
   
   useEffect(() => {
      loadData() // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   // Atualiza a tabela em tela
   useEffect(() => {
      setShowTable(createDataCompanieTable(table.allData))
   }, [table])



   // const formikFilters = useFormik({
   //    initialValues: initialValuesFilters,
   //    validationSchema: validationSchemaFilters,
   //    onSubmit: async (values) => {
   //       //   alert(JSON.stringify(values, null, 2));
   //       setTable(await loadCompaniesInDB(table, userData))
   //    },
   // });

   // const onClickItem = (item) => {
   //    // navigate(`/${ORIGIN_ROUTES}/${COMPANIE_PATH}/${item.id}`);
   //    const comp = table.allData.filter(row => row.companieId == item.id)
   //    setCompanie(comp[0] || {})
   //    setIsAddEditing(true)
   // }

   const handleDeleteClick = (e) => {
      if (!selectedRowsData?.length) return;
      console.log('handleDeleteClick')
      setDeleteDialog(true)
   }

   const handleEditClick = e => {
      if (selectedRowsData?.length != 1) return;
      const id = selectedRowsData[0];
      console.log('handleEditClick', id)
      const comp = table.allData.filter(row => row.companieId == id)
      console.log('comp', comp)
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
      setDataGridLoading(false)
   }

   const updateCompanieData = (item) => {
      console.log('updateCompanieData', item)
      const dataset = table.allData;
      const obj = dataset.find(row => row.companieId === item.companieId);
      if (!obj) {
         console.log('Add new companie')
         dataset.push(item)
      }

      const temp_table = dataset.map(row => {
         if (row.companieId != item.companieId) return row;
         return item
      })

      setTable({ ...table, allData: temp_table })
   }

   const onRowsSelectionHandler = (ids) => {
      // const selectedRowsData = ids.map((id) => showTable.find((row) => row.id === id));
      console.log('ids', ids)
      setSelectedRowsData(ids)
   };

   const onCloseDeleteDialog = (e) => {
      setDeleteDialog(false)
   }

   const handleConfirmDelete = async (e) => {
      //  selectedRowsData
      setDeleteLoading(true)
      const ret = await inactiveCompaniesInDB(selectedRowsData, userData)
      
      setDeleteLoading(false)
      setDeleteDialog(false)
      // @pending desmarcar os itens selecionados
      updateCompanieOnDelete(selectedRowsData)
      // setSelectedRowsData([])
      showSnackBar(ret.message, ret.erro? 'error': 'success')
   }

   // @pending remover os itens da tabela
   const updateCompanieOnDelete = (listItems) => {

   }

   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={clsx(gClasses.padding12, gClasses.marginVertical8)}>
            <div className={clsx(gClasses.flexJustifySpaceBetween, gClasses.flexAlignCenter)}>
               <TabSubtitle description={webScreen ? `Aqui você pode consultar as empresas da organização.` : ''}
                  descriptionClassName={gClasses.marginBottom30}>
                  Consulta de Empresas
               </TabSubtitle >
            </div>

            <Paper elevation={0} variant="outlined" className={clsx(gClasses.container)}>
               <Grid container item>
                  <Grid item xs={12} sm={4} md={2}>
                     <Button fullWidth size="large" color='primary' onClick={handleAdd} variant='contained' >
                        <AddIcon /> Adicionar
                     </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} md={2}>
                     <Button fullWidth
                        size="large"
                        disabled={Boolean(selectedRowsData?.length != 1)}
                        color='primary'
                        variant="outlined"
                        onClick={handleEditClick}
                        startIcon={<EditIcon />}> Editar </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} md={2}>
                     <LoadingButton fullWidth
                        size="large"
                        disabled={Boolean(!selectedRowsData.length)}
                        loading={deleteLoading}
                        color='error'
                        variant="outlined"
                        onClick={handleDeleteClick}
                        startIcon={<DeleteIcon />}> Apagar </LoadingButton>
                  </Grid>
               </Grid>
            </Paper>

            <DataGrid
               loading={dataGridLoading}
               rows={showTable}
               columns={COMPANIE_TABLE_COLUMNS}
               autoHeight
               // onRowDoubleClick={onClickItem}
               checkboxSelection={true}
               disableSelectionOnClick={true}
               components={{
                  Toolbar: GridToolbar
               }}
               onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
         </Paper>

         <AddEditDialog
            visible={Boolean(isAddEditing)}
            companieData={companie}
            onClose={handleCloseAddEdit}
            updateCompanieData={updateCompanieData}
         />

         <ConfirmDeleteDialog
            variantTitle='h4'
            visible={Boolean(deleteDialog)}
            onCancel={onCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
            title='Confirmar exclusão' description='Tem certeza que deseja excluir os itens?' loading={deleteLoading}
         >
            <Paper className={gClasses.listScroll}>
               {selectedRowsData?.length > 0 ? <List>
                  {selectedRowsData.map((id) => {
                     const item = table.allData.filter(row => row.companieId == id)
                     return <DeleteItemsList key={id} item={item[0]} />
                  })}
               </List> : null}
            </Paper>

         </ConfirmDeleteDialog>
      </div >
   )
}


export default Companies;

