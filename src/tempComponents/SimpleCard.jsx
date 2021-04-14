import {
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 150,
    paddingTop: "0.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  buttonTest: {
    backgroundColor: "red",
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "purple",
    },
  },
}));

function SimpleCard(props) {
  const classes = useStyles();
  const { history } = props;
  const { avatarSrc, title, subtitle, description, imgSrc } = props;

  return (
    <Paper elevation="4">
      {imgSrc && (
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={avatarSrc}
                aria-label="recipe"
                className={classes.avatar}
              >
                R
              </Avatar>
            }
            title={title}
            describtion={description}
          />
          <Link
            underline="none"
            component={RouterLink}
            to={"/Reports/" + title}
          >
            <CardMedia className={classes.media} component="img" src={imgSrc} />
          </Link>

          <CardContent>
            <Typography gutterBottom variant="subtitle1">
              {description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Paper>
  );
}

export default withRouter(SimpleCard);
