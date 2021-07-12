import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
// import Header from "@bit/bbconsult.standalone-components.wm-components.header";
// import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
import Header from "../tempComponents/Header";
import Drawer from "../tempComponents/Drawer";
import ContentController from "./ContentController";
import { useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
const useStyles = makeStyles({});

var parseString = require("xml2js").parseString;
var stripNS = require("xml2js").processors.stripPrefix;
const options = {
  tagNameProcessors: [stripNS],
  explicitArray: false,
};

const AppStructureController = ({ appXml }) => {
  const [Xml, setXml] = useState();
  const [HeaderStructure, setHeaderStructure] = useState();
  const [DrawerStructure, setDrawerStructure] = useState();
  const [ContentStructure, setContentStructure] = useState();
  const dispatch = useDispatch();

  var drawerObj = {};
  var ContentObj = {};

  const traverseNode = (packageExplorer, drawerObj) => {
    var packageCateogryReportName;
    Object.keys(packageExplorer).map((packageItemsOrCategories) => {
      switch (packageItemsOrCategories) {
        case "$":
          packageCateogryReportName =
            packageExplorer[packageItemsOrCategories].name;
          drawerObj[packageCateogryReportName] = new Array();
          break;
        case "item":
          drawerObj[packageCateogryReportName].push(
            packageExplorer[packageItemsOrCategories].$.name
          );
          break;
        case "category":
          if (Array.isArray(packageExplorer[packageItemsOrCategories])) {
            packageExplorer[packageItemsOrCategories].map((singleCategory) => {
              traverseNode(
                singleCategory,
                drawerObj[packageCateogryReportName]
              );
            });
          } else {
            traverseNode(
              packageExplorer[packageItemsOrCategories],
              drawerObj[packageCateogryReportName]
            );
          }

          break;
        default:
          break;
      }
    });
  };

  const parseHeader = (Xml) => {};
  const parseDrawer = (Xml) => {
    Xml["navigation"]["category"].map((single) => {
      var packageExplorer = single;
      traverseNode(packageExplorer, drawerObj);
    });
    setDrawerStructure(drawerObj);
  };
  const parseContent = (Xml) => {
    Xml["navigation"]["category"].map((single) => {
      var packageExplorer = single;
      traverseNode(packageExplorer, ContentObj);
    });

    setContentStructure(ContentObj);
  };

  useEffect(async () => {
    parseString(appXml, options, function (err, result) {
      Xml === undefined && setXml(result);
    });
    Xml !== undefined && parseHeader(Xml);
    Xml !== undefined && parseDrawer(Xml);
    Xml !== undefined && parseContent(Xml);
  }, [Xml]);

  // && ContentStructure !== undefined ?
  return Xml !== undefined ? (
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
