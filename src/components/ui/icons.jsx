import React from "react";
import { Link } from "react-router-dom";

import mCityLogo from "../../resources/images/logos/manchester_city_logo.png";

export const CityLogo = (props) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.wdt,
        height: props.hgt,
        background: `url(${mCityLogo}) no-repeat`,
      }}
    ></div>
  );
  if (props.link) return <Link to={props.linkTo}>{template}</Link>;
  else return template;
};
