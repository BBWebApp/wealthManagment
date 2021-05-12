import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import FavouriteDashboard from "./FavouriteDashboard";
import RecentlyUsedDashboard from "./RecentlyUsedDashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
const useStyles = makeStyles({});

const Welcome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDownloadedImages(true));

    
    dispatch(getDownloadedImages());
  }, []);
  return (
    <div>
      <RecentlyUsedDashboard />
      <br />
      <br />
      <br />
      <FavouriteDashboard />
    </div>
  );
};

export default Welcome;
