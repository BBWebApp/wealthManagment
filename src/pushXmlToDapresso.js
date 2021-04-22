var parseString = require("xml2js").parseString;
var axios = require("axios");
var base = require("base-64");
var fs = require("fs");

var url2 = "http://localhost:8011/proxy/workflow/3/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;
var xmlFileUpload = fs.readFileSync(
  "D:/VisualStudioWorkspace/wealthManagment/src/xmlStructure.xml",
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

XXX = name();
