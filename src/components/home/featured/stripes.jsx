import React, { Component } from "react";

//Animation
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

class Stripes extends Component {
  state = {
    stripes: [
      {
        background: "#98c5e9",
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0,
      },
      {
        background: "#ffffff",
        left: 360,
        rotate: 25,
        top: -397,
        delay: 200,
      },
      {
        background: "#98c5e9",
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400,
      },
    ],
  };

  displayStripes = () =>
    this.state.stripes.map((stripe, i) => (
      <Animate
        key={i}
        show={true}
        start={{
          background: "#FFFFFF",
          opacity: 0,
          left: 0,
          rotate: 0,
          top: 0,
        }}
        enter={{
          background: stripe.background,
          opacity: [1],
          left: [stripe.left],
          rotate: [stripe.rotate],
          top: [stripe.top],
          timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
          events: {
            end() {
              console.log("Finished");
            },
          },
        }}
      >
        {({ opacity, left, background, top, rotate }) =>
          this.displayStripe(opacity, left, background, top, rotate)
        }
      </Animate>
    ));

  displayStripe = (opacity, left, background, top, rotate) => (
    <div
      className="stripe"
      style={{
        opacity,
        background: background,
        transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
      }}
    ></div>
  );

  render() {
    return <div className="featured_stripes">{this.displayStripes()}</div>;
  }
}

export default Stripes;
