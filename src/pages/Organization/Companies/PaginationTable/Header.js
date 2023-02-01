import React from 'react'
import { COMPANIE_TABLE } from '../getInputs'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useGlobalStyles } from 'styles'

const Header = ({ order, orderBy, onChangeOrder, disabled }) => {
    const gClasses = useGlobalStyles()

    const handleChangeOrder = property => () => {
        const isAsc = orderBy === property && order === 'asc'
        onChangeOrder(isAsc ? 'desc' : 'asc', property)
    }

    return (
        <>
            { COMPANIE_TABLE.map(column => (
                <TableCell key={ column.id } sortDirection={ orderBy === column.id ? order : false } align={ column.align } padding={ column.padding }>
                    <TableSortLabel active={ orderBy === column.id } direction={ orderBy === column.id ? order : 'asc'} disabled={ disabled }
                        onClick={ handleChangeOrder(column.id) } className={ gClasses.bold }
                    >
                        { column.label }
                    </TableSortLabel>
                </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 'bold' }}>Opções</TableCell>
        </>
    )
}
export default Header