import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import FavouriteDashboard from "./FavouriteDashboard";
import RecentlyUsedDashboard from "./RecentlyUsedDashboard";

const useStyles = makeStyles({});

const Welcome = () => {
  return (
    <div>
      <FavouriteDashboard />
      <br />
      <br />
      <br />
      {<RecentlyUsedDashboard />}
    </div>
  );
};

export default Welcome;
