import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import FavouriteDashboard from "./FavouriteDashboard";
import RecentlyUsedDashboard from "./RecentlyUsedDashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
const useStyles = makeStyles({
  content: {
    marginLeft: "10px",
  },
});

const Welcome = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getDownloadedImages(true));

    dispatch(getDownloadedImages());
  }, []);
  return (
    <div className={classes.content}>
      <RecentlyUsedDashboard />
      <br />
      <br />
      <br />
      <FavouriteDashboard />
    </div>
  );
};

export default Welcome;
