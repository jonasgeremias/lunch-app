
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from 'styles';
import { Button, Paper } from '@mui/material'
import clsx from 'clsx'
import CreateUserScreen from './UserDetail/UserDetail';
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer';
import { useAuthContext } from 'hooks/AuthContext';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { loadCompaniesInDB } from 'utils/firebase/companies';
import UsersList from './UsersList';


const Users = () => {
   const gClasses = useGlobalStyles()
   const { userData } = useAuthContext();
   const { showSnackBar } = useSnackBar();
   const [visible, setVisible] = useState(false)
   const [companies, setCompanies] = useState([])

   const onClose = () => {
      setVisible(false)
   }

   const loadData = async () => {
      setCompanies(await loadCompaniesInDB(companies, userData))
   }

   useEffect(() => {
      loadData();
   }, []);

   return (
      <Paper variant="outlined" className={gClasses.containerPaper}>
         {/* <Button variant='contained' color='primary' onClick={() => setVisible(true)}> Novo</Button>
         <DialogContainer title={`Adicionar Usuário`} onClose={onClose}
            open={Boolean(visible)} maxWidth='sm' >
            <CreateUserScreen companies={companies.allData} />
         </DialogContainer> */}
         <UsersList/>
      </Paper>
   );
}

export default Users;