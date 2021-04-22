import axios from "axios";

var base = require("base-64");

var url1 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var url2 = "http://localhost:8011/proxy/workflow/5/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;
var xmlImagesDownloaded = undefined;

export function requestUpload(actions) {
  var reportId = actions["reportId"];
  var item = actions["image"];
  var favouriteClicked = actions["favourite"];
  axios
    .get(favouriteClicked ? url1 : url2, {
      headers: {
        Authorization: Basic,
      },
    })
    .then((response) => {
      xmlImagesDownloaded = JSON.parse(response.data);
      if (xmlImagesDownloaded.length > 8)
        xmlImagesDownloaded = xmlImagesDownloaded.slice(-8);
      var newElement = {};
      newElement[reportId] = item;
      xmlImagesDownloaded.push(newElement);
      axios.post(favouriteClicked ? url1 : url2, xmlImagesDownloaded, {
        headers: {
          Authorization: Basic,
        },
      });
    });
}
