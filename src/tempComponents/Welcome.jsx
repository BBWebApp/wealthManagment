import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import SimpleCard from "./SimpleCard";
import itemList from "./contentsValues";
import { useSelector, useDispatch } from "react-redux";
import { getScreenShots, GET_SCREENSHOTS } from "../redux/ducks/screenShot";

const useStyles = makeStyles({});

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

const Welcome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScreenShots());
  }, []);

  var screenShots = useSelector((state) => state.screenShot.images); // state.reducer.stateName
  if (screenShots) {
    screenShots = JSON.parse(screenShots);
    setImage(screenShots);
  }

  return (
    <Grid item container spacing={2}>
      {itemList.map((item) => {
        return (
          <Grid item xs={12} sm={6} md={4}>
            <SimpleCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Welcome;
