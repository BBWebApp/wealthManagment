import axios from 'axios'
import Base64 from 'base-64'
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'


const Report = props => {
    
  const [originalReport, setOriginalReport] = useState(undefined)
  const [modifiedReport, setModifiedReport] = useState(undefined)
  const { reportId } = props

  const removeReportBackgroundAndScrollbar = fullReport => {
    const bodyIndexStart = fullReport.indexOf(`body {`)
    const bodyToReplace = fullReport.substring(
      bodyIndexStart,
      bodyIndexStart + 360
    )
    const body =
      fullReport.substring(bodyIndexStart, bodyIndexStart + 120) + '}'
    const modifiedReport = fullReport
      .replace(bodyToReplace, body)
      .replaceAll(`contenteditable="true"`, '')
      .replaceAll(`contenteditable="false"`, '')

    setModifiedReport(modifiedReport)
  }

  const getReport = () => {
    const tok = 'gui_client:kFjfAh68k$$ADUjPr?vPA'
    const hash = Base64.encode(tok)
    const Basic = 'Basic ' + hash
    axios
      .get(
        'http://localhost:8011/proxy/fileserver/file/public/reports/test/' +
          reportId,
        {
          headers: {
            Authorization: Basic
          }
        }
      )
      .then(dataRecieved => {
        const { data } = dataRecieved
        
        setOriginalReport(data)
      })
  }

  useEffect(() => {
    originalReport === undefined && getReport()
    originalReport !== undefined &&
      removeReportBackgroundAndScrollbar(originalReport)
  }, [originalReport])

  return <div>{ReactHtmlParser(modifiedReport)}</div>
}

export default Report
