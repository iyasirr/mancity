import React, { Component } from "react";

import { CityLogo } from "../ui/icons";

class Footer extends Component {
  render() {
    return (
      <footer className="bck_blue">
        <div className="footer_logo">
          <CityLogo wdt="70px" hgt="70px" link={true} linkTo="/" />
        </div>
        <div className="footer_discl">
          Machester City 2020. All rights reserved
        </div>
      </footer>
    );
  }
}

export default Footer;
