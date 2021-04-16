import axios from "axios";

var base = require("base-64");

var url2 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

export function requestGetUser() {
  
  return axios.get(url2, {
    headers: {
      Authorization: Basic,
    },
  });
}
