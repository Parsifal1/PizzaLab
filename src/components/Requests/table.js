import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'


const Cell = styled(TableCell)`
    white-space: pre-line;
`

const HiddenText = styled.span`
    display: none;
`

const ConfrimButton = styled(Button)`
`

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Клиент' },
    { id: 'phone_number', numeric: true, disablePadding: false, label: 'Телефон' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Адрес' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Сумма заказа' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Дата заказа' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Статус заказа' },
    { id: 'requestName', numeric: false, disablePadding: false, label: 'Заказ' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <HiddenText>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </HiddenText>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function StatTable({ data, handleChange }) {

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = data

    const RequestStatus = ({ id, status }) => {

        return (
            <ConfrimButton size="small" variant="contained" color="primary" onClick={() => handleChange(id)} disabled={status === 'confirmed'}>
                {status === 'confirmed' ? 'Подтвержден' : 'Подтвердить'}
            </ConfrimButton>
        )
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const getDate = (date = new Date()) => {
        const time = {
            yy: date.getFullYear(),
            mm: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
            dd: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hh: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            min: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
        }
        return `[${time.hh}:${time.min}] ${time.dd}-${time.mm}-${time.yy}`
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div>
            <Paper >
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.name)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <Cell align="center">{row.phone_number}</Cell>
                                            <Cell align="center">{row.address}</Cell>
                                            <Cell align="center">{row.price}</Cell>
                                            <Cell align="center">{getDate(new Date(row.date))}</Cell>
                                            <Cell align="center"><RequestStatus status={row.status} id={row.id}/></Cell>
                                            <Cell align="left">{row.requestName}</Cell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage={'Заказов на странице'}
                    backIconButtonText={'Предыдущая страница'}
                    nextIconButtonText={'Следующая страница'}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch color="primary" checked={dense} onChange={handleChangeDense} />}
                label="Компактный режим"
            />
        </div>
    );
}

/* export default function Table() {



    return (
        <div></div>
    )
} */