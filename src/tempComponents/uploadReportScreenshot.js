var axios = require("axios");
var base = require("base-64");

var url2 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;
var xmlImagesDownloaded = undefined;

export default function addArray(item, reportId) {
  axios
    .get(url2, {
      headers: {
        Authorization: Basic,
      },
    })
    .then((response) => {
      xmlImagesDownloaded = JSON.parse(response.data);

      setTimeout(() => {
        var newElement = {};
        newElement[reportId] = item;
        xmlImagesDownloaded.push(newElement);

        axios.post(url2, xmlImagesDownloaded, {
          headers: {
            Authorization: Basic,
          },
        });
      }, 500);
    });
}
