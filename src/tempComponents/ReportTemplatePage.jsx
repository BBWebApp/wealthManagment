import { makeStyles, Paper, Grid } from "@material-ui/core";
import React from "react";
import ReportTemplateContent from "./ReportTemplateContent";
import ReportTemplateFooter from "./ReportTemplateFooter";
import ReportTemplateHeader from "./ReportTemplateHeader";
import { useScreenshot } from "use-react-screenshot";
import { createRef, useEffect, useState } from "react";
import uploadReportScreenshot from "./uploadReportScreenshot";

const useStyles = makeStyles({});

const ReportTemplatePage = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;

  const classes = useStyles();

  const ref = createRef(null);
  const [width, setWidth] = useState(300);
  const [image, takeScreenShot] = useScreenshot();

  const getImage = () => {
    setTimeout(() => {
      takeScreenShot(ref.current);
    }, 350);
  };

  useEffect(async () => {
    getImage();
  }, []);
  image && uploadReportScreenshot(image, reportId);

  return (
    <div>
      <div>
        {/* {<img width="460px" src={image} />} */}
        <Grid item container direction="row" xs={12} sm={12} md={4}>
          <Paper ref={ref} variant="elevation">
            <ReportTemplateHeader key={reportId} />
            <ReportTemplateContent reportId={reportId} xmlResult={xmlResult} />
            <ReportTemplateFooter key={reportId} />
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default ReportTemplatePage;
