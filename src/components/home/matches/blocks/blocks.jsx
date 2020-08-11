import React, { Component } from "react";
import { Slide } from "react-reveal";
import { FadeLoader } from "react-spinners";
import { dbMatches } from "../../../../firebase";

import Block from "./block";

class Blocks extends Component {
  state = {
    matches: [],
    loading: true,
  };

  componentDidMount() {
    dbMatches
      .limitToLast(6)
      .once("value")
      .then((snap) => this.fetchMatches(snap));
  }

  fetchMatches = (snap) => {
    let matchesList = [];
    snap.forEach((child) => {
      matchesList.push({
        id: child.key,
        ...child.val(),
      });
    });
    this.reverseMatches(matchesList);
  };

  reverseMatches = (matchesList) => {
    let matches = [];
    for (let i = matchesList.length - 1; i >= 0; i--)
      matches.push(matchesList[i]);
    this.setState({ matches, loading: false });
  };

  displayMatches = (matches) =>
    matches
      ? matches.map((match) => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <Block key={match.id} match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  startLoading = () => {
    if (this.state.loading)
      return (
        <div style={{ height: "100px", width: "100%" }}>
          <FadeLoader height={15} width={10} radius={2} margin={1} />
        </div>
      );
  };

  render() {
    return (
      <div className="home_matches">
        {this.startLoading()}
        {this.displayMatches(this.state.matches)}
      </div>
    );
  }
}

export default Blocks;
