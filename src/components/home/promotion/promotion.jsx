import React from "react";

import Enroll from "./enroll";
import Text from "./text";

const Promotion = () => {
  return (
    <div className="promotion_wrapper" style={{ background: "#FFFFFF" }}>
      <div className="container">
        <Text />
        <Enroll />
      </div>
    </div>
  );
};

export default Promotion;
