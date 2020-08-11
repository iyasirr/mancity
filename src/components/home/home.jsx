import React from "react";

import Featured from "./featured/featured";
import Matches from "./matches/matches";
import Players from "./players/players";
import Promotion from "./promotion/promotion";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <Players />
      <Promotion />
    </div>
  );
};

export default Home;
