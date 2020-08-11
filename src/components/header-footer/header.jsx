import React, { Component } from "react";

import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { CityLogo } from "../ui/icons";

class Header extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#98c5e9",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e",
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header logo">
              <CityLogo link={true} linkTo="/" hgt="70px" wdt="70px" />
            </div>
          </div>

          <Link to="/team">
            <Button color="inherit"> Team </Button>
          </Link>
          <Link to="/matches">
            <Button color="inherit"> Matches </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
