import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
// import Header from "@bit/bbconsult.standalone-components.wm-components.header";
// import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
import Header from "../tempComponents/Header";
import Drawer from "../tempComponents/Drawer";
import ContentController from "./ContentController";

const useStyles = makeStyles({});

var parseString = require("xml2js").parseString;

const AppStructureController = ({ appXml }) => {
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
    parseString(appXml, function (err, result) {
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
