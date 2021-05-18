import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import SimpleCard from "./SimpleCard";
import itemList from "./contentsValues";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
import { getSlicedImage } from "../redux/ducks/serverCall";

const useStyles = makeStyles({
  recentlyUsed: {
    fontSize: "20px",
    color: "rgb(60.0, 60.0, 60.0)",
    marginBottom: "12px",
    borderBottom: "1px solid #787878",
  },
});

const setImage = (screenShots) => {
  var numberOfScreenshots = screenShots.length;
  for (let index = 0; index < numberOfScreenshots; index++) {
    var screenshotItem = screenShots[index];
    itemList[index]["imgSrc"] = Object.keys(screenshotItem).map(
      (key) => screenshotItem[key]
    );
    itemList[index]["title"] = Object.keys(screenshotItem).map((key) => key);
  }
};

const RecentlyUsedDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  var screenShots = useSelector((state) => {
    return state.downloadImage.images;
  }); // state.reducer.stateName

  if (screenShots) {
    for (let index = 0; index < 6; index++) {
      itemList[index]["imgSrc"] = "";
    }
    setImage(screenShots);
  }
  return (
    <div>
      <Typography className={classes.recentlyUsed}>Recently used</Typography>
      <Grid
        style={{ marginLeft: "0px", marginTop: "0px" }}
        item
        container
        spacing={6}
      >
        {itemList.map((item) => {
          return (
            <Grid item>
              <SimpleCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default RecentlyUsedDashboard;
