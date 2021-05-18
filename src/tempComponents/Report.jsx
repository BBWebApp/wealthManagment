import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector, useDispatch } from "react-redux";
import { useScreenshot } from "use-react-screenshot";
import { createRef } from "react";
import { getSlicedImage } from "../redux/ducks/cropImage";
import { uploadImage } from "../redux/ducks/uploadImage";

const Report = (props) => {
  const [originalReport, setOriginalReport] = useState(undefined);
  const [modifiedReport, setModifiedReport] = useState(undefined);
  const { reportId } = props;
  const dispatch = useDispatch();
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();

  const getImage = () => {
    setTimeout(() => {
      takeScreenShot(ref.current);
    }, 200);
  };
  var html = useSelector((state) => {
    return state.serverCall.html;
  }); // state.reducer.stateName

  var reportId_html_flag = useSelector((state) => {
    return state.serverCall.reportId_html_flag;
  }); // state.reducer.stateName

  const removeReportBackgroundAndScrollbar = (fullReport) => {
    const bodyIndexStart = fullReport.indexOf(`body {`);
    const bodyToReplace = fullReport.substring(
      bodyIndexStart,
      bodyIndexStart + 360
    );
    const body =
      fullReport.substring(bodyIndexStart, bodyIndexStart + 120) + "}";
    const modifiedReport = fullReport
      .replace(bodyToReplace, body)
      .replaceAll(`contenteditable="true"`, "")
      .replaceAll(`contenteditable="false"`, "");

    setModifiedReport(modifiedReport);
  };

  const getReport = (html) => {
    reportId === reportId_html_flag && setOriginalReport(html);
  };

  useEffect(() => {
    originalReport === undefined && getReport(html);
    originalReport !== undefined &&
      removeReportBackgroundAndScrollbar(originalReport);
  }, [originalReport, html]);

  useEffect(() => {
    modifiedReport && getImage();
  }, [modifiedReport]);

  useEffect(() => {
    image && dispatch(getSlicedImage(image, reportId, "full"));
  }, [image]);

  var slicedImage = useSelector((state) => {
    return state.cropImage;
  }); // state.reducer.stateName
  if (image && slicedImage && reportId === slicedImage["reportId"]) {
    dispatch(uploadImage(slicedImage["slicedImage"], slicedImage["reportId"]));
  }
  return (
    <div>
      {/* {<img width="460px" src={image} />} */}

      <div ref={ref}>{ReactHtmlParser(modifiedReport)}</div>
    </div>
  );
};

export default Report;
