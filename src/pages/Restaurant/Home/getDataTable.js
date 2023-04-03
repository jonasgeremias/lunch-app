import { DATE_FORMAT, STATUS_OPTIONS, USER_TYPES } from 'constants/general'
import dayjs from "dayjs";
import { initialValuesFilters } from './Filters/getInputs';


/******************************************************************************
 * Usado no useState de controle da tabela 
 *****************************************************************************/
export const initialStateTable = {
   allData: [],
   filters: []
}

export const createLunchTable = (table , companies, org) => {
   return table.map((row) => {
      return {
         id: row?.uid,
         uid: row?.uid,
         name: row?.name,
         companyName: companies.find(company => company.companyId === row?.companyId).companyName,
         lunchType: org.lunchTypes.find(item => item.id === row?.lunchType).description,
      }
   })
}

export const LUNCH_TABLE_COLUMNS = [
   { width: 200, sortable: true, editable: false, field: 'uid', headerName: 'ID Usuário' },
   { width: 200, sortable: true, editable: false, field: 'name', headerName: 'Nome' },
   { width: 150, sortable: true, editable: false, field: 'companyName', headerName: 'Empresa' },
   { width: 150, sortable: true, editable: false, field: 'lunchType', headerName: 'Tipo' }
]