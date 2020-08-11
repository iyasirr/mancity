import React from "react";

import { Zoom } from "react-reveal";
import Jersey from "../../../resources/images/jersey.jpg";

const Text = () => {
  return (
    <div className="promotion_animation">
      <div className="left">
        <Zoom left>
          <div>
            <span>Win a</span>
            <span>Jersey</span>
          </div>
        </Zoom>
      </div>
      <div className="right">
        <Zoom right>
          <div style={{ background: `url(${Jersey}) no-repeat` }}></div>
        </Zoom>
      </div>
    </div>
  );
};

export default Text;
