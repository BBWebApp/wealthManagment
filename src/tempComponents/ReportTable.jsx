import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
var base = require('base-64')

var tok = 'gui_client:kFjfAh68k$$ADUjPr?vPA'
var hash = base.encode(tok)
var Basic = 'Basic ' + hash

const ReportTable = props => {
  const { xmlResult } = props
  const [columns, setColumns] = useState(undefined)
  const [tableData, setTableData] = useState(undefined)
  const [rowsPerPage, setrowsPerPage] = useState(10)
  const [page, setpage] = useState(0)

  var colNames = []
  var reportTableData = []

  const setColumnNames = columns => {
    columns !== undefined &&
      columns.forEach(element => {
        var name = element.$.name
        if (!colNames.includes(name)) colNames.push(name)
      })
  }
  const setReportTableData = tabledata => {
    var allDataArray = []
    Object.keys(tabledata.data).map(key => {
      var item = tabledata.data[key]
      allDataArray.push(item)
    })
    allDataArray.map(item => {
      const trial = Object.keys(item)
        .filter(key => colNames.includes(key))
        .reduce((obj, y) => {
          obj[y] = item[y]
          return obj
        }, {})

      reportTableData.push(trial)
    })
  }
  const changeRowsPerPage = (event, newRows) => {
    setrowsPerPage(event.target.value)
    setpage(0)
  }

  const handleChangePage = (event, newPage) => {
    setpage(newPage)
  }

  useEffect(async () => {
    setColumns(xmlResult[0][0].columns[0].columnName)
    const tableDataResponse = await axios.get(xmlResult[0][0].data[0].$.link, {
      headers: {
        Authorization: Basic
      }
    })

    setTableData(JSON.parse(tableDataResponse.data.response.payload))
  }, [])

  columns !== undefined && setColumnNames(columns)
  tableData !== undefined &&
    reportTableData.length === 0 &&
    setReportTableData(tableData)

  return (
    columns !== undefined &&
    tableData !== undefined && (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(reportTableData[0]).map(colName => (
                <TableCell align='left'>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reportTableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(oneRow => {
                return (
                  <TableRow key={oneRow.user_avg}>
                    {Object.keys(oneRow).map(key => {
                      return <TableCell align='left'>{oneRow[key]}</TableCell>
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={reportTableData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={changeRowsPerPage}
        />
      </TableContainer>
    )
  )
}

export default ReportTable
