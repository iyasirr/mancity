import React, { Component } from "react";

import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

import Player from "../../../resources/images/featured_player.png";

class Text extends Component {
  animateNumber = () => (
    <Animate
      show={true}
      start={{ opacity: 0, rotate: 0 }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut },
      }}
    >
      {({ opacity, rotate }) => (
        <div
          className="featured_number"
          style={{
            opacity,
            transform: `translate(260px,170px) rotateY(${rotate}deg)`,
          }}
        >
          6
        </div>
      )}
    </Animate>
  );

  animateText = () => (
    <React.Fragment>
      <Animate
        show={true}
        start={{ opacity: 0, x: 503, y: 460 }}
        enter={{
          opacity: [1],
          x: [273],
          y: [460],
          timing: { duration: 1000, ease: easePolyOut },
        }}
      >
        {({ opacity, x, y }) => (
          <div
            className="featured_first"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`,
            }}
          >
            League
          </div>
        )}
      </Animate>
      <Animate
        show={true}
        start={{ opacity: 0, x: 503, y: 596 }}
        enter={{
          opacity: [1],
          x: [273],
          y: [596],
          timing: { delay: 300, duration: 1000, ease: easePolyOut },
        }}
      >
        {({ opacity, x, y }) => (
          <div
            className="featured_second"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`,
            }}
          >
            Championships
          </div>
        )}
      </Animate>
    </React.Fragment>
  );

  animatePlayer = () => (
    <Animate
      show={true}
      start={{ opacity: 0 }}
      enter={{
        opacity: [1],
        timing: { delay: 800, duration: 1000, ease: easePolyOut },
      }}
    >
      {({ opacity, x, y }) => (
        <div
          className="featured_player"
          style={{
            opacity,
            background: `url(${Player})`,
            transform: `translate(550px,201px)`,
          }}
        ></div>
      )}
    </Animate>
  );

  render() {
    return (
      <div className="featured_text">
        {this.animateNumber()}
        {this.animatePlayer()}
        {this.animateText()}
      </div>
    );
  }
}

export default Text;
