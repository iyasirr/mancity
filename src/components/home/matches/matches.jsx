import React from "react";

import { Tag } from "../../ui/tag";
import Blocks from "./blocks/blocks";

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag link={false} bck="#0E1731" size="50px" color="#FFFFFF">
          Matches
        </Tag>
        <Blocks />
        <Tag
          link={true}
          linkTo="/matches"
          bck="#FFFFFF"
          size="22px"
          color="#0E1731"
        >
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default Matches;
