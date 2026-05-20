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

import * as MockData from '../../lib/AppMakeData'
import * as http from '../../lib/AppHttp';

/** Captain Hooks */


function DtTable({
        columns,
        fetchData,
        data,
        config,        
        loading,
        pageCount: controlledPageCount,
        contextMenu
    }) {
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
            manualPagination: true,
            pageCount: controlledPageCount
        }, usePagination)

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return <div>
            <Table responsive {...getTableProps()} className={"react-table-editable" + (loading ? " loading":"")} hover striped size="lg" >
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
                            <tr onContextMenu={(row)=>{contextMenu(row)}} {...row.getRowProps()}>
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
                    {config.limit &&  <span className="float-left">
                            <select
                                className="form-control" size="sm"
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                                >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </span>
                    }
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

function DataTable(props) {

    const [data, setData] = React.useState(() => MockData.PersonData(200))
    const [originalData] = React.useState(data)    
    const [loading, setLoading] = React.useState(false)    
    const [pageCount, setPageCount] = React.useState(0)
    const skipPageResetRef = React.useRef(false)

    const columns = React.useMemo(
        () => props.config.header,
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
        skipPageResetRef.current = false;
    }, [data])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {        
        
        setLoading(true);        
        
        console.debug('Fetch Data',{
            pageSize: pageSize,
            pageIndex: pageIndex
        });
        
        const auth = localStorage.getItem('app-auth-token'); 
        let headers = {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'Authorization': `Bearer ${auth}`
        };

        http.prod.post('/api/mock/data_table', new URLSearchParams({
            page_size : pageSize,
            page_index : pageIndex,
        }).toString(), {headers:headers})
        .then((response) => {
            if(response.data?.success?.data) {                
                setPageCount(Math.ceil(response.data.success.data.total / pageSize));
                setData(response.data.success.data.result);
                setLoading(false);
            }
        });
        
    },[]);
    
    const resetData = () => { setData(originalData) }

    const contextMenu = (row) => { console.debug('Context Menu', row); }
    
    return (<Card>
                <Card.Header>
                    <strong>React Table Pagination</strong>
                    <Refresh className="float-right" onClick={resetData}/>
                </Card.Header>
                <DtTable 
                    columns={columns} 
                    fetchData={fetchData} 
                    data={data} 
                    config={props.config}
                    loading={loading}
                    pageCount={pageCount}
                    contextMenu={contextMenu}/>
            </Card>)
}

export default DataTable;