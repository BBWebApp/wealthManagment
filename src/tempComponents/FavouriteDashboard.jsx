import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import SimpleCard from "./SimpleCard";
import itemList from "./contentsValues";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";

const useStyles = makeStyles({
  recentlyUsed: {
    fontSize: "20px",
    color: "rgb(60.0, 60.0, 60.0)",
    marginBottom: "12px",
    borderBottom: "1px solid #787878",
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

const FavouriteDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  var screenShots = useSelector((state) => state.downloadImage.favs); // state.reducer.stateName
  if (screenShots) {
    setImage(screenShots);
  }

  return (
    <div>
      <Typography className={classes.recentlyUsed}>Favourites</Typography>
      <Grid
        style={{ marginLeft: "0px", marginTop: "0px" }}
        item
        container
        spacing={6}
      >
        {screenShots &&
          itemList.map((item) => {
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

export default FavouriteDashboard;
