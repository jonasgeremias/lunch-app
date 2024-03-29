import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
// import AddEditDialog from './AddEditDialog/AddEditDialog'
import TabSubtitle from 'components/atoms/TabSubtitle/TabSubtitle'
import { Button, Paper, Grid, List } from '@mui/material'
import { useBreakPoint } from 'hooks/useBreakPoint'
import { COMPANIES_TABLE_COLUMNS, createDataCompaniesTable, initialStateTable, initialValuesFilters, validationSchemaFilters } from './getInputs'
import { useAuthContext } from 'hooks/AuthContext'
import { inactiveCompaniesInDB, loadCompaniesInDB } from 'utils/firebase/companies'
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
import { COMPANY_ADD, COMPANIES_PATH, ORIGIN_ROUTES } from 'constants/routes';

const DeleteItemsList = ({ item }) => {
   return (
      <ListItem component="div" disablePadding>
         <ListItemButton>
            <ListItemText
               primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
               secondary={`${item.companyId}`} primary={`${item.companyName}`} />
         </ListItemButton>
      </ListItem>
   );
}

const Companies = () => {
   const navigate = useNavigate();
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'md')
   const [dataGridLoading, setDataGridLoading] = useState(true)
   const [deleteLoading, setDeleteLoading] = useState(false)
   const [deleteDialog, setDeleteDialog] = useState(false)
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
      setShowTable(createDataCompaniesTable(table.allData))
   }, [table])

   const onClickItem = (item) => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}/${item.id}`);
   }

   const handleDeleteClick = (e) => {
      if (!selectedRowsData?.length) return;
      console.log('handleDeleteClick')
      setDeleteDialog(true)
   }

   const handleEditClick = e => {
      if (selectedRowsData?.length !== 1) return;
      const id = selectedRowsData[0];
      navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}/${id}`);
      // console.log('handleEditClick', id)
      // const comp = table.allData.filter(row => row.companyId == id)
      // console.log('comp', comp)
      // setCompany(comp[0] || {})
      // setIsAddEditing(true)
   }

   const handleAdd = e => {
      navigate(`/${ORIGIN_ROUTES}/${COMPANIES_PATH}/${COMPANY_ADD}`);
   }
   
   const loadData = async () => {
      setTable(await loadCompaniesInDB(table, userData))
      setDataGridLoading(false)
   }

   const onRowsSelectionHandler = (ids) => {
      setSelectedRowsData(ids)
   };

   const onCloseDeleteDialog = (e) => {
      setDeleteDialog(false)
   }

   const handleConfirmDelete = async (e) => {
      setDeleteLoading(true)
      const ret = await inactiveCompaniesInDB(selectedRowsData, userData)
      console.log('handleConfirmDelete', ret)
      setDeleteLoading(false)
      setDeleteDialog(false)
      updateCompanieOnDelete(selectedRowsData)
      showSnackBar(ret.message, ret.erro ? 'error' : 'success')
   }

   const updateCompanieOnDelete = async (listItems) => {
      const temp_table = await table.allData.filter(row => {
         const ret = listItems.find(item => {
            return (row.companyId === item)
         })
         return (row.companyId != ret)
      })

      const update = { ...table, allData: temp_table }
      console.log('listItems', table, listItems, update)

      setTimeout(() => {
         setTable(update)
      }, 500);
   }

   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Paper variant="outlined" className={gClasses.containerPaper}>
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
               rowReordering
               loading={dataGridLoading}
               rows={showTable}
               columns={COMPANIES_TABLE_COLUMNS}
               autoHeight
               onRowDoubleClick={onClickItem}
               checkboxSelection={true}
               disableSelectionOnClick={true}
               components={{
                  Toolbar: GridToolbar
               }}
               onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
         </Paper>

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
                     const item = table.allData.filter(row => row.companyId == id)
                     return <DeleteItemsList key={id} item={item[0]} />
                  })}
               </List> : null}
            </Paper>

         </ConfirmDeleteDialog>
      </div >
   )
}


export default Companies;

