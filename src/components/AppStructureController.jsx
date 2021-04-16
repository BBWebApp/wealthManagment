import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Header from "@bit/bbconsult.standalone-components.wm-components.header";
import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
// import Drawer from '../tempComponents/Drawer'
import ContentController from "./ContentController";

const useStyles = makeStyles({});

var parseString = require("xml2js").parseString;
var axios = require("axios");
var base = require("base-64");

var XMLurl = "http://localhost:8020/proxy/workflow/3/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

const AppStructureController = () => {
  const [Xml, setXml] = useState();
  const [HeaderStructure, setHeaderStructure] = useState();
  const [DrawerStructure, setDrawerStructure] = useState();
  const [ContentStructure, setContentStructure] = useState();

  const parseHeader = (Xml) => {};
  const parseDrawer = (Xml) => {
    var HeaderObj = {};
    Object.keys(Xml["navigation"]["category"]).map((single) => {
      var categoryName = Xml.navigation.category[single].$.name;
      HeaderObj[categoryName] = new Array();
      Xml.navigation.category[single].item.map((items) => {
        HeaderObj[categoryName].push(items.$.name);
      });
    });
    setDrawerStructure(HeaderObj);
  };
  const parseContent = (Xml) => {
    var ContentObj = {};
    Object.keys(Xml["navigation"]["category"]).map((single) => {
      Xml.navigation.category[single].item.map((items) => {
        if (items.component !== undefined) {
          var categoryName = items.$.name;
          ContentObj[categoryName] = new Array();
          ContentObj[items.$.name].push(items.component);
        }
      });
    });

    setContentStructure(ContentObj);
  };

  useEffect(async () => {
    const [firstResponse] = await Promise.all([
      axios.get("http://localhost:8011/proxy/workflow/3/task/1/upload", {
        headers: {
          Authorization: Basic,
        },
      }),
    ]);
    console.log("hereWe");
    console.log(firstResponse.data);
    console.log("here");
    parseString(firstResponse.data, function (err, result) {
      Xml === undefined && setXml(result);
    });
    Xml !== undefined && parseHeader(Xml);
    Xml !== undefined && parseDrawer(Xml);
    Xml !== undefined && parseContent(Xml);
  }, [Xml]);

  return Xml !== undefined && ContentStructure !== undefined ? (
    <React.Fragment>
      <Header header={HeaderStructure} />
      <Drawer drawer={DrawerStructure} />
      <ContentController content={ContentStructure} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div>404 XML not found</div>
    </React.Fragment>
  );
};

export default AppStructureController;
