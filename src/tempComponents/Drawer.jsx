import { Collapse, Drawer as WMDrawer } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;
const Styles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "rgb(225.0, 225.0, 225.0)",
    },
  },
  container: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "rgb(225.0, 225.0, 225.0)",
    },
  },
}));

const useStyles = makeStyles({});

const Drawer = (props) => {
  const classes = Styles();
  const { history } = props;
  const [favsNames, setFavsNames] = useState(undefined);
  const { drawer } = props;

  const dispatch = useDispatch();

  var screenShots = useSelector((state) => state.downloadImage.favs); // state.reducer.stateName
  var favReportsNames = [];

  useEffect(() => {
    if (screenShots) {
      favReportsNames = [];
      screenShots.map((item) => {
        favReportsNames.push(Object.keys(item)[0]);
      });
      setFavsNames(favReportsNames);
    }
  }, [screenShots]);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return drawer !== undefined ? (
    <WMDrawer
      elevation={2}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem
          className={classes.root}
          button
          onClick={() => history.push(`/home`)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <Divider
          variant="middle"
          light
          style={{ marginBottom: "3px", marginTop: "3px" }}
        />

        {Object.keys(drawer).map((key) => (
          <>
            <ListItem className={classes.root} button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={key} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {drawer[key].map((item) => {
                  return (
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => history.push(`/${key}/` + item)}
                      key={item}
                    >
                      <ListItemIcon>
                        {favsNames && favsNames.includes(item) ? (
                          <StarIcon />
                        ) : (
                          <StarBorder />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </WMDrawer>
  ) : (
    <div>asd</div>
  );
};

export default withRouter(Drawer);
