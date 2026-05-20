import React from "react";
import { 
    useTable, 
    usePagination,
    useRowSelect
} from 'react-table'

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
} from '@material-ui/icons';

import * as MockData from '../../lib/AppMakeData'

/** Captain Hooks */
// Create an editable cell renderer
const EditableCell = ({
    cell: { value: initialValue },
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    if(id !== "status") {
        return <input value={value} onChange={onChange} onBlur={onBlur} />
    } else {
        return (<select value={value} onChange={onChange} onBlur={onBlur}>
            <option value="relationship">Relationship</option>
            <option value="complicated">Complicated</option>
            <option value="single">Single</option>
        </select>)
    }    
}
  
// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

function DtTable ({ columns, data, updateMyData, resetData, deleteSelected,  disablePageResetOnDataChange }) {
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
    } = useTable({
            columns,
            data,
            defaultColumn,
            disablePageResetOnDataChange,
            updateMyData,
        },
        usePagination,
        useRowSelect
    )

    /** We need to reset the checkbox */
    const deleteSel = () => {
        if(deleteSelected(selectedRows)) {
            toggleRowSelectedAll(false);
        }
    }

    // Render the UI for your table
    return (
        <>
            <Card.Header className="clearfix">
                React Table Row Actions
                <Button className="float-right ml-2" variant="outline-secondary" size="sm" onClick={deleteSel}><Delete/> Delete</Button>
                <Button className="float-right" variant="outline-secondary" size="sm" onClick={resetData}><Refresh/> Refresh</Button>
            </Card.Header>
            
            <Table as={Card.Body} responsive {...getTableProps()} className="react-table-editable" hover>
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
                            }}
                            >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
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
                    {page.length >= pageSize && (<Pagination size="sm" className="float-right">
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
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
                    </Pagination>)}
                </Col>
            </Row>
        </>
    )
}

function TablesPaginationContent() {

    const columns = React.useMemo(
        () => [
            // Let's make a column for selection
            {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({ row }) => (
                        <div>
                            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
                        </div>
                )
            },
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
            // Let's make a column for selection
            {
                id: 'actions',
                Header: () => (
                    <div>Actions</div>
                ),
                Cell: ({ row, toggleRowSelectedAll }) => (
                        <div>
                            <Button className="btn btn-default" variant="secondary" size="sm" onClick={() => {deleteRow(row)}}><Delete fontSize="small"/></Button>
                        </div>
                )
            },
        ],
        []
    )
    
    const [data, setData] = React.useState(() => MockData.PersonData(2000))
    const [originalData] = React.useState(data)
    
    const skipPageResetRef = React.useRef(false)
    
    const deleteSelected = (selected) => {
        skipPageResetRef.current = true
        if (selected.length > 0 && window.confirm('Are you sure you wish to delete selected item(s)?')) {
            var d = [];
            data.map((row, index) => {
                if(selected.indexOf(index+"") == -1) {   
                    d.push(row);
                }
            });
            setData(d);
            return true;
        }
        return false;
    }

    const deleteRow = (row) =>  {
        skipPageResetRef.current = true
        let r = row;
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let d = data.filter((row) => row.id  !== r.original.id);
            setData(d);
        }
    }

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
    
    const resetData = () => { setData(originalData) }

    React.useEffect(() => {
        skipPageResetRef.current = false
    }, [data])
    
    return (<Row>
                <Col>
                    <h2 className="content-title">Table In-line Action</h2>
                    <p>A table with inline action and direct data manipulation.</p>
                    <Card>
                        <DtTable
                            columns={columns}
                            data={data}
                            updateMyData={updateMyData}
                            resetData={resetData}
                            deleteSelected = {deleteSelected}
                            disablePageResetOnDataChange={skipPageResetRef.current}
                        />
                    </Card>
                </Col>
            </Row>)
}


/** Main Component */
class TablesActionsContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return(<div><TablesPaginationContent/></div>)
    }
}
export default TablesActionsContent;