import * as Yup from "yup";
import { DATE_FORMAT, STATUS_OPTIONS, STATUS_OPTIONS_ARRAY } from 'constants/general'
import { REGEX } from 'constants/inputs'
import dayjs from "dayjs";
import React from "react";
import { IconButton, Menu, MenuList, MenuItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

// export const initialValuesFilters = {
//    startDate: '',
//    endDate: '',
//    companieName: '',
//    phone: '',
//    cnpj: '',
//    status: 'active',
//    email: ''
// };

// export const validationSchemaFilters = Yup.object().shape({
//    startDate: Yup.string().nullable(),
//    endDate: Yup.string().nullable(),
//    cnpj: Yup.string().nullable(),
//    companieName: Yup.string().nullable(),
//    status: Yup.mixed().oneOf(STATUS_OPTIONS_ARRAY).defined().nullable(),
//    email: Yup.string().email("E-mail inválido").nullable(),
//    phone: Yup.string().matches(REGEX.phone).nullable()
// });


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



//  export const COMPANIE_TABLE = [
//    { id: 'name', align: 'left', numeric: false, label: 'Nome',  getValue: (val, id) => val.name },
//    { id: 'email', align: 'left', numeric: true, label: 'E-mail' ,getValue: (val, id) => val.profile[id] },
//    { id: 'createdAt', align: 'left', numeric: true, label: 'Data Criação' ,getValue: (val, id) => dayjs(val[id]).format(DATE_FORMAT.medium) },
//    { id: 'updatedAt', align: 'left', numeric: true, label: 'Data Atualização',getValue: (val, id) => dayjs(val[id]).format(DATE_FORMAT.medium)  },
//    { id: 'identificationId', align: 'left', numeric: true, label: 'Empresa/Franquia',getValue: (val, id) => val[id]  },
//    { id: 'type', align: 'left', numeric: true, label: 'Tipo acesso', getValue: (val, id) => USER_TYPES_OPTIONS[val[id]].name  },
//    { id: 'status', align: 'left', numeric: true, label: 'Status', getValue: (val, id) => USER_STATUS_OPTIONS[val[id]].name }
//  ];


export const COMPANIE_TABLE = [
   { id: 'companieId', align: 'left', label: 'ID', getValue: (val) => val?.companieId },
   { id: 'companieName', align: 'left', label: 'Empresa', getValue: (val) => val?.companieName },
   { id: 'email', align: 'left', label: 'E-mail', getValue: (val) => val?.email },
   { id: 'phone', align: 'left', label: 'Telefone', getValue: (val) => val?.phone },
   { id: 'cnpj', align: 'left', label: 'CNPJ', getValue: (val) => val?.cnpj },
   { id: 'linkLogo', align: 'left', label: 'Logo', getValue: (val) => val?.linkLogo },
   { id: 'createdAt', align: 'left', label: 'Data Criação', getValue: (val) => dayjs(Date(val?.createdAt)).format(DATE_FORMAT.medium) },
   { id: 'updatedAt', align: 'left', label: 'Data Atualização', getValue: (val) => dayjs(Date(val?.updatedAt)).format(DATE_FORMAT.medium) },
   { id: 'status', align: 'left', label: 'Aprovado', getValue: (val) => val?.status }
   //  {id: 'orgId'       , align: 'left', label: 'Organização', getValue: (val) => val?.orgId }
]



export const createDataCompanieTable = (table) => {
   return table.map((row) => {
      const created = new Date(row?.createdAt?.seconds * 1000 + row?.createdAt?.nanoseconds / 1000000)
      const updated = new Date(row?.updatedAt?.seconds * 1000 + row?.updatedAt?.nanoseconds / 1000000)
      
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
         status: STATUS_OPTIONS[row?.status].name || '',
         // options : row?.companieId
      }
   })
}

export const COMPANIE_TABLE_COLUMNS = [
   // {
   //    width: 75, field: 'options', headerName: 'Opções',
   //    renderCell: (cellValues) => <MyOption cellValues />

   // },
   { width: 250, sortable: false, editable: false, field: 'companieName', headerName: 'Nome' },
   { width: 100, sortable: false, editable: false, field: 'status', headerName: 'Status' },
   { width: 250, sortable: false, editable: false, field: 'id', headerName: 'ID' },
   { width: 250, sortable: false, editable: false, field: 'email', headerName: 'E-mail' },
   // { width: 150, sortable: false, editable: false, field: 'phone', headerName: 'Telefone' },
   { width: 150, sortable: false, editable: false, field: 'cnpj', headerName: 'CNPJ' },
   // { width: 200, sortable: false, editable: false, field: 'contactName', headerName: 'Nome do contato' },
   // { width: 150, sortable: false, editable: false, field: 'linkLogo', headerName: 'linkLogo' },
   { width: 150, sortable: false, editable: false, field: 'createdAt', headerName: 'Criado em' },
   { width: 150, sortable: false, editable: false, field: 'updatedAt', headerName: 'Atualizado em' }

]



// const MyOption = ({ cellValues }) => {

//    const [open, setOpen] = React.useState(false)
//    const handleClick = (event) => {
//       setOpen(event.currentTarget);
//    };
//    const handleClose = (event) => {
//       setOpen(null);
//    };
//    return (
//       <>
//          <IconButton
//             aria-label="more"
//             id="long-button"
//             aria-controls={open ? 'long-menu' : undefined}
//             aria-expanded={open ? 'true' : undefined}
//             aria-haspopup="true"
//             onClick={handleClick}
//          >
//             <MoreVertIcon />
//          </IconButton>

//          <Menu
//             id="long-menu"
//             MenuListProps={{
//                'aria-labelledby': 'long-button',
//             }}
//             anchorEl={open}
//             open={open} onClose={handleClose} PaperProps={{
//                style: {
//                   maxHeight: 48 * 4.5,
//                   width: '20ch',
//                },
//             }}>
              
                  
//             <MenuItem aria-label="edit" color='primary' onClick={(e) => console.log(e, cellValues)}>
//                <EditIcon /> 
//                <Typography variant="inherit">Editar</Typography>
//             </MenuItem>

//             <MenuItem aria-label="delete" color='error' onClick={(e) => console.log('cellValues', cellValues, e)}>
//                <DeleteIcon /> 
//                <Typography variant="inherit">Apagar</Typography>
//             </MenuItem>

//          </Menu>
//       </>
//    )
// }