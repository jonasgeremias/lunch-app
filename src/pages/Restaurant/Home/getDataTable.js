import { DATE_FORMAT, STATUS_OPTIONS, USER_TYPES } from 'constants/general'
import dayjs from "dayjs";
import { initialValuesFilters } from './Filters/getInputs';


/******************************************************************************
 * Usado no useState de controle da tabela 
 *****************************************************************************/
export const initialStateTable = {
   allData: [],
   // pageData: null,
   // page: 0,
   // lastDoc: null,
   // loadingMore: false,
   // hasNextPage: true,
   // order: 'asc',
   // orderBy: 'createdAt',
   filters: initialValuesFilters
}

export const createDataUsersTable = (table , companies) => {
   return table.map((row) => {
      const created = new Date(row?.createdAt?.seconds * 1000 + row?.createdAt?.nanoseconds / 1000000)
      const updated = new Date(row?.updatedAt?.seconds * 1000 + row?.updatedAt?.nanoseconds / 1000000)
      // console.log('createDataCompaniesTable', row, row?.updatedAt)
      return {
         id: row?.uid,
         code: row?.code,
         uid: row?.uid,
         name: row?.name,
         companyName: companies.find(company => company.companyId === row?.companyId).companyName,
         lunchTypes: row?.lunchTypes
         //email: row?.email,
         //phone: row?.phone,
         //cpf: row?.cpf,
         //userType: USER_TYPES[row?.userType].name || '',
         // linkLogo: () => <img src={row?.linkLogo} style={{ heigth: '10px', width: '50px' }} />,
         //createdAt: dayjs(created).format(DATE_FORMAT.small),
         //updatedAt: dayjs(updated).format(DATE_FORMAT.small),
         //status: STATUS_OPTIONS[row?.status].name || '',
         // options : row?.companyId
      }
   })
}

export const USERS_TABLE_COLUMNS = [
   { width: 80, sortable: false, editable: false, field: 'code', headerName: 'Código' },
   { width: 200, sortable: true, editable: false, field: 'name', headerName: 'Nome' },
   // { width: 250, sortable: true, editable: false, field: 'email', headerName: 'E-mail' },
   { width: 130, sortable: true, editable: false, field: 'companyName', headerName: 'Empresa' },
   { width: 130, sortable: true, editable: false, field: 'lunchTypes', headerName: 'Tipo de almoço' },
   // { width: 100, sortable: true, editable: false, field: 'status', headerName: 'Status' },
   // { width: 130, sortable: true, editable: false, field: 'cpf', headerName: 'CPF' },
   // { width: 130, sortable: true, editable: false, field: 'userType', headerName: 'Tipo login' },
   // { width: 130, sortable: true, editable: false, field: 'createdAt', headerName: 'Criado em' },
   // { width: 130, sortable: true, editable: false, field: 'updatedAt', headerName: 'Atualizado em' }
]