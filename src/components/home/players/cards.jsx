import React, { Component } from "react";
import { Animate } from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from "../../../resources/images/players/Otamendi.png";

import Card from "../../ui/card";

class Cards extends Component {
  state = {
    cards: [
      { bottom: 90, left: 300 },
      { bottom: 60, left: 200 },
      { bottom: 30, left: 100 },
      { bottom: 0, left: 0 },
    ],
  };

  animatePlyers = () =>
    this.state.cards.map((card, i) => (
      <Animate
        key={i}
        show={this.props.show}
        start={{ opacity: 0, bottom: 0, left: 0 }}
        enter={{
          opacity: [1],
          bottom: [card.bottom],
          left: [card.left],
          timing: { duration: 500, ease: easePolyOut },
        }}
      >
        {({ bottom, left }) => (
          <div style={{ position: "absolute", left, bottom }}>
            <Card bck={Otamendi} number="30" name="Nocolas" lname="Otamendi" />
          </div>
        )}
      </Animate>
    ));

  render() {
    return <div>{this.animatePlyers()}</div>;
  }
}

export default Cards;
