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
    marginBottom: "5px",
    borderBottom: "1px solid #000",
  },
});

const setImage = (screenShots) => {
  var numberOfCards = itemList.length;
  var numberOfScreenshots = screenShots.length;
  for (let index = 1; index <= numberOfCards; index++) {
    var screenshotItem = screenShots[numberOfScreenshots - index];

    itemList[index - 1]["imgSrc"] = Object.keys(screenshotItem).map(
      (key) => screenshotItem[key]
    );
    itemList[index - 1]["title"] = Object.keys(screenshotItem).map(
      (key) => key
    );
  }
};

const RecentlyUsedDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getDownloadedImages());
  }, []);

  var screenShots = useSelector((state) => {
    return state.downloadImage.images;
  }); // state.reducer.stateName
  if (screenShots) {
    screenShots = JSON.parse(screenShots);
    dispatch(getSlicedImage(screenShots[0]));
    screenShots.length > 0 && setImage(screenShots);
  }

  return (
    <div>
      <Typography className={classes.recentlyUsed}>Recently used</Typography>
      <Grid item container spacing={2}>
        {itemList.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <SimpleCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default RecentlyUsedDashboard;
