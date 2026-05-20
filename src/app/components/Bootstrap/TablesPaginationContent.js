import React from "react";
import { 
    useTable, 
    usePagination 
} from 'react-table'

import {
    Row,
    Col,
    Table,
    Pagination,
    Card
} from 'react-bootstrap';

import {
    Refresh
} from '@material-ui/icons';

import * as MockData from '../../lib/AppMakeData';
import RemoteDT from '../Elements/DataTable';

/** Captain Hooks */


function DtTable({columns,data}) {

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
        state: { pageIndex, pageSize },
    } = useTable({
            columns,
            data,
            initialState: { pageIndex: 0, pageSize : 5 },
        },
        usePagination
    )

    // Render the UI for your table
    return <div><Table responsive {...getTableProps()} className="react-table-editable" hover striped size="lg">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {page.map(
                        (row, i) =>
                        prepareRow(row) || (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
            <Row className="pl-3 pr-3">
                <Col>
                    <span className="float-left">
                        <select
                            className="form-control" size="sm"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </span>
                </Col>
                <Col className="text-center">
                    <span>Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong></span>
                </Col>
                <Col>
                    <Pagination size="sm" className="float-right">
                        <Pagination.First onClick={() => gotoPage (0)} disabled={!canPreviousPage}/>
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>

                        {pageIndex > 1 && <Pagination.Item onClick={() => {gotoPage(0)}}>{1}</Pagination.Item>}
                        {canPreviousPage && <Pagination.Ellipsis />}

                        {pageIndex > 3 && <Pagination.Item onClick={() => {gotoPage(pageIndex-2)}}>{pageIndex-1}</Pagination.Item>}
                        {pageIndex > 2 && <Pagination.Item onClick={() => {gotoPage(pageIndex-1)}}>{pageIndex}</Pagination.Item>}
                        <Pagination.Item active={true}>{pageIndex+1}</Pagination.Item>
                        <Pagination.Item onClick={() => {gotoPage(pageIndex+1)}}>{pageIndex+2}</Pagination.Item>
                        <Pagination.Item onClick={() => {gotoPage(pageIndex+2)}}>{pageIndex+3}</Pagination.Item>

                        {canNextPage && <Pagination.Ellipsis />}
                        <Pagination.Item onClick={() => {gotoPage(pageCount - 1)}}>{pageOptions.length}</Pagination.Item>

                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}/>
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                    </Pagination>
                </Col>
            </Row>
        </div>
}

function TablesPaginationContent(props) {

    console.debug('Table Props', {
        props : props
    });

    const [data, setData] = React.useState(() => MockData.PersonData(200))
    const [originalData] = React.useState(data)
    const skipPageResetRef = React.useRef(false)

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )
    
    const updateMyData = (rowIndex, columnID, value) => {
      skipPageResetRef.current = true
      setData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnID]: value,
            }
          }
          return row
        })
      )
    }
    
    React.useEffect(() => {
        skipPageResetRef.current = false
    }, [data])
    
    const resetData = () => { setData(originalData) }
    
    return (<div>
                <Row className="mb-5">
                    <Col>
                        <h2 className="content-title">Table Pagination</h2>
                        <p>A sample table with pagination.</p>
                        <Card>
                            <Card.Header>
                                <strong>React Table Pagination</strong>
                                <Refresh className="float-right" onClick={resetData}/>
                            </Card.Header>
                            <DtTable columns={columns} data={data}/>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="content-title">Table Pagination (Remote Data)</h2>
                        <p>A sample table with pagination from a remote data</p>
                        <RemoteDT config={ {
                            paginate: true,
                            limit: true,
                            remoteUrl : '',
                            header : [
                                {
                                    Header: 'Name',
                                    columns: [
                                        {
                                            Header: 'First Name',
                                            accessor: 'firstName',
                                        },
                                        {
                                            Header: 'Last Name',
                                            accessor: 'lastName',
                                        },
                                    ],
                                },
                                {
                                    Header: 'Info',
                                    columns: [
                                        {
                                            Header: 'Age',
                                            accessor: 'age',
                                        },
                                        {
                                            Header: 'Visits',
                                            accessor: 'visits',
                                        },
                                        {
                                            Header: 'Status',
                                            accessor: 'status',
                                        },
                                        {
                                            Header: 'Profile Progress',
                                            accessor: 'progress',
                                        },
                                    ],
                                },
                            ]
                        }}/>
                    </Col>
                </Row>
            </div>)
}

export default TablesPaginationContent;