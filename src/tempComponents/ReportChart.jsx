import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import Base64 from "base-64";
import { React, ReactElement, ReactNode, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactHtmlParser from "react-html-parser";
import ReactDOMServer from "react-dom/server";

const useStyles = makeStyles({});
const ReportChart = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const [text, setText] = useState();
  const [Xml, setXml] = useState(undefined);

  const getReport = () => {
    const tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
    const hash = Base64.encode(tok);
    const Basic = "Basic " + hash;
    axios
      .get(
        "http://localhost:8011/proxy/fileserver/file/public/reports/test/" +
          reportId,
        {
          headers: {
            Authorization: Basic,
          },
        }
      )
      .then((dataRecieved) => {
        const { data } = dataRecieved;

        Xml === undefined && setXml(ReactHtmlParser(data));
      });
  };

  useEffect(async () => {
    (await Xml) === undefined && getReport();
    if (Xml !== undefined) {
      const children = Xml[0].props.children;
      if (children !== undefined) {
        deepFind(children, (child) => {
          if (Object.keys(child).includes("props")) {
            if (Object.keys(child.props).includes("id")) {
              if (child.props.id.includes("resizableImage")) {
                child.props.children.map((item) => {
                  if (item.type === "embed") {
                    setText(item.props.src);
                  }
                });
              }
            }
          }
        });
      }
    }
  }, [Xml]);

  return (
    text !== undefined && (
      <div>
        <img width="460px" src={text} />
      </div>
    )
  );
  // return text !== undefined && <div> {ReactHtmlParser(text)} </div>;
};

export default ReportChart;
