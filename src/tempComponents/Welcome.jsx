import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import SimpleCard from "./SimpleCard";
import itemList from "./contentsValues";
const useStyles = makeStyles({});

var axios = require("axios");
var base = require("base-64");

var url2 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

const Welcome = () => {
  const [xmlImagesDownloaded, setXmlImagesDownloaded] = useState(undefined);

  const setImage = () => {
    var numberOfCards = itemList.length;
    var numberOfScreenshots = xmlImagesDownloaded.length;

    for (let index = 1; index <= numberOfCards; index++) {
      var screenshotItem = xmlImagesDownloaded[numberOfScreenshots - index];

      itemList[index - 1]["imgSrc"] = Object.keys(screenshotItem).map(
        (key) => screenshotItem[key]
      );
      itemList[index - 1]["title"] = Object.keys(screenshotItem).map(
        (key) => key
      );
    }
  };
  useEffect(() => {
    axios
      .get(url2, {
        headers: {
          Authorization: Basic,
        },
      })
      .then((response) => {
        xmlImagesDownloaded === undefined &&
          setXmlImagesDownloaded(JSON.parse(response.data));
      });
  }, []);
  xmlImagesDownloaded && setImage();

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
