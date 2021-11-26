import axios from "axios";
import base from "base-64";
import fs from "fs";
import * as myConstClass from "./global.js";

var url2 = `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.DAPRESSO_PORT}/workflow/1/task/1/upload`;
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;
var xmlFileUpload = fs.readFileSync(
  "D:/VisualStudioWorkspace/wealthManagment/src/xmlStructure-2.0.xml",
  { encoding: "utf-8" }
);
function name() {
  axios
    .post(url2, xmlFileUpload, {
      headers: {
        Authorization: Basic,
      },
    })
    .then((response) => {
      console.log(response.data);
    });
}

var XXX = name();
