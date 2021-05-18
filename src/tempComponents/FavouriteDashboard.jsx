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
  var numberOfScreenshots = screenShots.length;
  for (let index = 0; index < numberOfScreenshots; index++) {
    var screenshotItem = screenShots[index];
    itemList[index]["imgSrc"] = Object.keys(screenshotItem).map(
      (key) => screenshotItem[key]
    );
    itemList[index]["title"] = Object.keys(screenshotItem).map((key) => key);
  }
};

const FavouriteDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  var screenShots = useSelector((state) => state.downloadImage.favs); // state.reducer.stateName
  if (screenShots) {
    for (let index = 0; index < 6; index++) {
      itemList[index]["imgSrc"] = "";
    }
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
          itemList.map((item, position) => {
            return (
              <Grid item>
                <SimpleCard {...item} deleteBtn={true} position={position} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default FavouriteDashboard;
