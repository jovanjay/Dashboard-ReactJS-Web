import React from "react";
import {
    useTable,
    usePagination,
    useRowSelect
} from 'react-table';

import {
    Row,
    Col,
    Table,
    Pagination,
    Card,
    Button
} from 'react-bootstrap';

import {
    Refresh,
    Delete,
    Edit
} from '@mui/icons-material';

import * as MockData from '../../lib/AppMakeData';

const EditableCell = ({
    cell: { value: initialValue },
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = e => { setValue(e.target.value); };
    const onBlur = () => { updateMyData(index, id, value); };

    React.useEffect(() => { setValue(initialValue); }, [initialValue]);

    if (id !== "status") {
        return <input value={value} onChange={onChange} onBlur={onBlur} />;
    } else {
        return (
            <select value={value} onChange={onChange} onBlur={onBlur}>
                <option value="relationship">Relationship</option>
                <option value="complicated">Complicated</option>
                <option value="single">Single</option>
            </select>
        );
    }
};

const defaultColumn = { Cell: EditableCell };

function DtTable({ columns, data, updateMyData, resetData, deleteSelected, disablePageResetOnDataChange }) {
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        toggleRowSelectedAll,
        isAllRowsSelected,
        state: { pageIndex, pageSize, selectedRows },
    } = useTable(
        { columns, data, defaultColumn, disablePageResetOnDataChange, updateMyData },
        usePagination,
        useRowSelect
    );

    const deleteSel = () => {
        if (deleteSelected(selectedRows)) {
            toggleRowSelectedAll(false);
        }
    };

    const { key: tableKey, ...tableProps } = getTableProps();

    return (
        <>
            <Card.Header className="clearfix">
                React Table Row Actions
                <Button className="float-end ms-2" variant="outline-secondary" size="sm" onClick={deleteSel}><Delete /> Delete</Button>
                <Button className="float-end" variant="outline-secondary" size="sm" onClick={resetData}><Refresh /> Refresh</Button>
            </Card.Header>

            <Table as={Card.Body} responsive {...tableProps} className="react-table-editable" hover>
                <thead>
                    {headerGroups.map(headerGroup => {
                        const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={headerGroupKey} {...headerGroupProps}>
                                {headerGroup.headers.map(column => {
                                    const { key: columnKey, ...columnHeaderProps } = column.getHeaderProps();
                                    return (
                                        <th key={columnKey} {...columnHeaderProps}>{column.render('Header')}</th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {page.map((row) => {
                        prepareRow(row);
                        const { key: rowKey, ...rowProps } = row.getRowProps();
                        return (
                            <tr key={rowKey} {...rowProps}>
                                {row.cells.map(cell => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                                    return (
                                        <td key={cellKey} {...cellProps}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Row className="ps-3 pe-3">
                <Col>
                    <span className="float-start">
                        <select
                            className="form-control" size="sm"
                            value={pageSize}
                            onChange={e => { setPageSize(Number(e.target.value)); }}>
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                            ))}
                        </select>
                    </span>
                </Col>
                <Col className="text-center">
                    <span>Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong></span>
                </Col>
                <Col>
                    {page.length >= pageSize && (
                        <Pagination size="sm" className="float-end">
                            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                            {pageIndex > 1 && <Pagination.Item onClick={() => { gotoPage(0); }}>{1}</Pagination.Item>}
                            {canPreviousPage && <Pagination.Ellipsis />}
                            {pageIndex > 3 && <Pagination.Item onClick={() => { gotoPage(pageIndex - 2); }}>{pageIndex - 1}</Pagination.Item>}
                            {pageIndex > 2 && <Pagination.Item onClick={() => { gotoPage(pageIndex - 1); }}>{pageIndex}</Pagination.Item>}
                            <Pagination.Item active={true}>{pageIndex + 1}</Pagination.Item>
                            <Pagination.Item onClick={() => { gotoPage(pageIndex + 1); }}>{pageIndex + 2}</Pagination.Item>
                            <Pagination.Item onClick={() => { gotoPage(pageIndex + 2); }}>{pageIndex + 3}</Pagination.Item>
                            {canNextPage && <Pagination.Ellipsis />}
                            <Pagination.Item onClick={() => { gotoPage(pageCount - 1); }}>{pageOptions.length}</Pagination.Item>
                            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                        </Pagination>
                    )}
                </Col>
            </Row>
        </>
    );
}

function TablesPaginationContent() {

    const columns = React.useMemo(
        () => [
            {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div><input type="checkbox" {...getToggleAllRowsSelectedProps()} /></div>
                ),
                Cell: ({ row }) => (
                    <div><input type="checkbox" {...row.getToggleRowSelectedProps()} /></div>
                )
            },
            {
                Header: 'Name',
                columns: [
                    { Header: 'First Name', accessor: 'firstName' },
                    { Header: 'Last Name', accessor: 'lastName' },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    { Header: 'Age', accessor: 'age' },
                    { Header: 'Visits', accessor: 'visits' },
                    { Header: 'Status', accessor: 'status' },
                    { Header: 'Profile Progress', accessor: 'progress' },
                ],
            },
            {
                id: 'actions',
                Header: () => <div>Actions</div>,
                Cell: ({ row, toggleRowSelectedAll }) => (
                    <div>
                        <Button variant="secondary" size="sm" onClick={() => { deleteRow(row); }}><Delete fontSize="small" /></Button>
                    </div>
                )
            },
        ],
        []
    );

    const [data, setData] = React.useState(() => MockData.PersonData(2000));
    const [originalData] = React.useState(data);
    const skipPageResetRef = React.useRef(false);

    const deleteSelected = (selected) => {
        skipPageResetRef.current = true;
        if (selected.length > 0 && window.confirm('Are you sure you wish to delete selected item(s)?')) {
            let d = data.filter((row, index) => selected.indexOf(index + "") === -1);
            setData(d);
            return true;
        }
        return false;
    };

    const deleteRow = (row) => {
        skipPageResetRef.current = true;
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let d = data.filter((r) => r.id !== row.original.id);
            setData(d);
        }
    };

    const updateMyData = (rowIndex, columnID, value) => {
        skipPageResetRef.current = true;
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return { ...old[rowIndex], [columnID]: value };
                }
                return row;
            })
        );
    };

    const resetData = () => { setData(originalData); };

    React.useEffect(() => {
        skipPageResetRef.current = false;
    }, [data]);

    return (
        <Row>
            <Col>
                <h2 className="content-title">Table In-line Action</h2>
                <p>A table with inline action and direct data manipulation.</p>
                <Card>
                    <DtTable
                        columns={columns}
                        data={data}
                        updateMyData={updateMyData}
                        resetData={resetData}
                        deleteSelected={deleteSelected}
                        disablePageResetOnDataChange={skipPageResetRef.current}
                    />
                </Card>
            </Col>
        </Row>
    );
}

class TablesActionsContent extends React.Component {
    render() {
        return <div><TablesPaginationContent /></div>;
    }
}

export default TablesActionsContent;
