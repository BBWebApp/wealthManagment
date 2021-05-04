import {
  Avatar,
  CardHeader,
  CardMedia,
  Collapse,
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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 0,
  },
  root: {
    maxWidth: 500,
    minWidth: 500,
  },
  media: {
    height: 250,
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
  headerRoot: {
    maxHeight: "6px",
  },
  headerTitle: {
    color: "rgb(120.0, 120.0, 120.0)",
  },
}));
function SimpleCard(props) {
  const classes = useStyles();
  const { history } = props;
  const { avatarSrc, title, subtitle, description, imgSrc } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Paper elevation="4">
      {imgSrc && (
        <Card className={classes.root}>
          <CardHeader
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
            title={title}
            titleTypographyProps={{ variant: "h6" }}
          />
          <Paper variant="elevation" elevation="2">
            <Link
              underline="none"
              component={RouterLink}
              to={"/Reports/" + title}
            >
              <CardMedia
                className={classes.media}
                component="img"
                src={imgSrc}
              />
            </Link>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <CardContent>
                  <Typography>
                   {description}
                  </Typography>
                </CardContent>
              </Accordion>
            </div>
          </Paper>
        </Card>
      )}
    </Paper>
  );
}

export default withRouter(SimpleCard);
