import { makeStyles, Paper, Grid, IconButton } from "@material-ui/core";
import React from "react";
import ReportTemplateContent from "./ReportTemplateContent";
import ReportTemplateFooter from "./ReportTemplateFooter";
import ReportTemplateHeader from "./ReportTemplateHeader";
import { useScreenshot } from "use-react-screenshot";
import { createRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../redux/ducks/uploadImage";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { getSlicedImage } from "../redux/ducks/serverCall";

const useStyles = makeStyles({});

const ReportTemplatePage = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const dispatch = useDispatch();

  const classes = useStyles();

  const ref = createRef(null);
  const [width, setWidth] = useState(300);
  const [image, takeScreenShot] = useScreenshot();

  const getImage = () => {
    setTimeout(() => {
      takeScreenShot(ref.current);
    }, 300);
  };
  const favouriteClicked = () => {
    return dispatch(uploadImage(image, reportId, true));
  };

  useEffect(() => {
    getImage();
  }, []);
  useEffect(() => {
    image && dispatch(getSlicedImage(image, reportId));
  }, [image]);

  var slicedImage = useSelector((state) => {
    return state.serverCall;
  }); // state.reducer.stateName
  if (image && slicedImage && reportId === slicedImage["reportId"]) {
    dispatch(uploadImage(slicedImage["slicedImage"], slicedImage["reportId"]));
  }

  return (
    <div>
      <div>
        {/* {<img width="460px" src={image} />} */}
        <Grid item container direction="row" xs={12} sm={12} md={4}>
          <IconButton
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "flex-end",
            }}
            aria-label="add to favorites"
            onClick={favouriteClicked}
          >
            <FavoriteIcon />
          </IconButton>
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
