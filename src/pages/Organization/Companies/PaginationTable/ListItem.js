import React from 'react'
import { COMPANIE_TABLE } from '../getInputs'
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeleteForever from '@mui/icons-material/DeleteForever'
import useStyles from './useStyles'
// import dayjs from 'dayjs'
// import { NOTIFICATION } from 'constants/device'
import { formatValue } from 'utils'
import { Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ListItem = ({ data, onClickEdit }) => {
    const [deletingCompanie, setDeletingCompanie] = React.useState(false)
    const classes = useStyles()

    const onClickDelete = () => {
        setDeletingCompanie(true)
        console.log('@pending Aqui tem que enviar o email de convite')
        setTimeout(() => {
            setDeletingCompanie(false)
        }, 1500);
    }
    console.log(data);
    return (
        <TableRow key={`${data.id}_row`} className={classes.row}>
            {COMPANIE_TABLE.map(column => {
               console.log('column', column)            
               return (
                  <TableCell size='small' key={`${column?.id}_cell`} align={column?.align} padding={column?.padding}>
                     {column?.getValue(data, column.id)}
                  </TableCell>
                  )
            }
            )}
            <TableCell size='small' key={`${data.id}_opt`}>
                <ButtonGroup variant="outlined">
                    <Tooltip title="Editar">
                        <LoadingButton loadingPosition="start" color='primary' variant='outlined' onClick={onClickEdit} startIcon={<EditIcon />}>Editar</LoadingButton >
                    </Tooltip>
                    <Tooltip title="delete">
                        <LoadingButton loading={deletingCompanie} loadingPosition="start" color='primary' variant='outlined' onClick={onClickDelete} startIcon={<DeleteForever />}>Deletar</LoadingButton >
                    </Tooltip>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    )

    /*
    <React.Fragment key={ data.companieId }>
        <TableRow className={ classes.row }>
            <TableCell padding='checkbox'>
                <IconButton size="small" onClick={ handleChangeOpen }>
                    { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                </IconButton>
            </TableCell>
            { COMPANIE_TABLE.map(column => (
                <TableCell key={ `${column.companieId}_cell` } align={ column.align } padding={ column.padding }>
                    {  column.getValue(data, column.companieId) }
                </TableCell>
            )) 
            }
        </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={ 12 }>
                <Collapse in={ open } timeout="auto" unmountOnExit>
                    <Box paddingLeft={ 3.9 } paddingTop={ 1 }>
                    <Typography gutterBottom variant='subtitle2'>
                            <b>Mensagem:</b> 
                        </Typography>
                        <Typography gutterBottom variant='subtitle2'>
                            <b>Data de envio:</b> { dayjs(data.sendDate).format(DATE_FORMAT.medium) }
                        </Typography>
                        <Typography gutterBottom variant='subtitle2'>
                            <b>Mensagem:</b> { data.message }
                        </Typography>
                        <Typography gutterBottom variant='subtitle2'>
                            <b>Tipo de notificação:</b> { NOTIFICATION[data.type].name }
                        </Typography>
                        { data.targets ?
                            <Typography gutterBottom variant='subtitle2'>
                                <b>Alvos:</b> { data.targets.map(el => data.type === NOTIFICATION.sms.companieId || data.type === NOTIFICATION.whatsapp.companieId ? formatValue.phone(el) : el).join(' • ') }
                            </Typography> : null
                        }
                        <Typography gutterBottom variant='subtitle2'>
                            <b>Variável:</b> { variables?.[data.variable]?.name || data.variableName }
                        </Typography>
                        <Typography gutterBottom variant='subtitle2'>
                            <b>Variável do dispositivo:</b> { data.variableHwName }
                        </Typography>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow> 
    </React.Fragment>
)*/
}
export default ListItem