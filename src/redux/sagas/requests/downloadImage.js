import axios from "axios";

var base = require("base-64");

var url1 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var url2 = "http://localhost:8011/proxy/workflow/5/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

export function requestGetUser(action) {
  var favouriteClicked = action["favourites"];
  return axios.get(favouriteClicked ? url1 : url2, {
    headers: {
      Authorization: Basic,
    },
  });
}
