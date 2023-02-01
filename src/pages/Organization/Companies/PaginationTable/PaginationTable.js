import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Header from './Header'
import ListItem from './ListItem'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Pagination from './Pagination'
import TableCell from '@mui/material/TableCell'
import TextCircularProgress from 'components/atoms/TextCircularProgress/TextCircularProgress'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback'
// import LoadingButton from '@mui/lab/LoadingButton';

const PaginationTable = (props) => {
    const { loadData, changeOrder, changePage, onClickEdit, dataTable } = props
    const { pageData, loadingMore, hasNextPage, page, order, orderBy, filters } = dataTable //useSelector(state => state.deviceHistoric.table)
    const gClasses = useGlobalStyles()

    if (pageData) return (
        <div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="tabela de empresas">
                    <TableHead>
                        <TableRow>
                            <Header disabled={filters.length > 0} order={order} orderBy={orderBy} onChangeOrder={changeOrder} />
                            {/* (ord, ordBy) => { dispatch(changeOrder(ord, ordBy, deviceData.id))} */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingMore ?
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <TextCircularProgress className={gClasses.marginVertical20} label='Buscando Empresas...' />
                                </TableCell>
                            </TableRow> :
                            pageData.map(row => <ListItem key={row.companieId} data={row} onClickEdit={() => onClickEdit(row)} />)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination hasNextPage={hasNextPage} page={page} onChangePage={changePage} />
        </div>
    );
    else if (loadingMore) return <ShowFeedback animation='loading' />
    else return null
}

export default PaginationTable