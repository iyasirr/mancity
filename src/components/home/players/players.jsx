import React, { Component } from "react";
import Reveal from "react-reveal";

import Stripes from "../../../resources/images/stripes.png";

import { Tag } from "../../ui/tag";

import Cards from "./cards";

class Players extends Component {
  state = {
    show: false,
  };

  render() {
    return (
      <Reveal fraction={0.7} onReveal={() => this.setState({ show: true })}>
        <div
          className="home_meetplayers"
          style={{ background: `#FFFFFF url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag
                    bck="#0E1731"
                    size="100px"
                    color="#FFFFFF"
                    add={{ display: "inline-block", marginBottom: "20px" }}
                  >
                    Meet
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#0E1731"
                    size="100px"
                    color="#FFFFFF"
                    add={{ display: "inline-block", marginBottom: "20px" }}
                  >
                    The
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#0E1731"
                    size="100px"
                    color="#FFFFFF"
                    add={{ display: "inline-block", marginBottom: "20px" }}
                  >
                    Players
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#FFFFFF"
                    size="27px"
                    color="#0E1731"
                    link={true}
                    linkTo="/team"
                  >
                    Meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default Players;
