import { DATE_FORMAT } from 'constants/general'
import dayjs from "dayjs";


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
   // filters: []
}
export const createDataCompanieTable = (table) => {
   return table.map((row) => {
      const created = new Date(row?.createdAt?.seconds * 1000 + row?.createdAt?.nanoseconds / 1000000)
      const updated = new Date(row?.updatedAt?.seconds * 1000 + row?.updatedAt?.nanoseconds / 1000000)
      // console.log('createDataCompanieTable', row, row?.updatedAt)
      return {
         id: row?.companieId,
         companieId: row?.companieId,
         companieName: row?.companieName,
         email: row?.email,
         phone: row?.phone,
         cnpj: row?.cnpj,
         contactName: row.contactName,
         // linkLogo: () => <img src={row?.linkLogo} style={{ heigth: '10px', width: '50px' }} />,
         createdAt: dayjs(created).format(DATE_FORMAT.small),
         updatedAt: dayjs(updated).format(DATE_FORMAT.small),
         // status: STATUS_OPTIONS[row?.status].name || '',
         // options : row?.companieId
      }
   })
}

export const COMPANIE_TABLE_COLUMNS = [
   // {
   //    width: 75, field: 'options', headerName: 'Opções',
   //    renderCell: (cellValues) => <MyOption cellValues />
   // },
   { width: 250, sortable: true, editable: false, field: 'companieName', headerName: 'Nome' },
   // { width: 100, sortable: false, editable: false, field: 'status', headerName: 'Status' },
   { width: 250, sortable: false, editable: false, field: 'id', headerName: 'ID' },
   { width: 250, sortable: true, editable: false, field: 'email', headerName: 'E-mail' },
   // { width: 150, sortable: false, editable: false, field: 'phone', headerName: 'Telefone' },
   { width: 150, sortable: false, editable: false, field: 'cnpj', headerName: 'CNPJ' },
   // { width: 200, sortable: false, editable: false, field: 'contactName', headerName: 'Nome do contato' },
   // { width: 150, sortable: false, editable: false, field: 'linkLogo', headerName: 'linkLogo' },
   { width: 150, sortable: true, editable: false, field: 'createdAt', headerName: 'Criado em' },
   { width: 150, sortable: true, editable: false, field: 'updatedAt', headerName: 'Atualizado em' }
]