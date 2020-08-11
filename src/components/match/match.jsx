import React, { Component } from "react";
import { dbMatches } from "../../firebase";

import LeagueTable from "./leagueTable";
import MatchList from "./matchList";

import { CircularProgress } from "@material-ui/core";

class Match extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    filter: "All",
    filterResult: "All",
  };

  componentDidMount() {
    dbMatches.once("value").then((snap) => {
      const matches = this.fetchMatches(snap);
      this.setState({ loading: false, matches, filterMatches: matches });
    });
  }

  fetchMatches = (snap) => {
    let matchesList = [];
    snap.forEach((child) => {
      matchesList.push({
        id: child.key,
        ...child.val(),
      });
    });
    const matches = this.reverseMatches(matchesList);
    return matches;
  };

  reverseMatches = (matchesList) => {
    let matches = [];
    for (let i = matchesList.length - 1; i >= 0; i--)
      matches.push(matchesList[i]);
    return matches;
  };

  displayMatch = (type) => {
    const list = this.state.matches.filter((match) => {
      return match.final === type;
    });
    this.setState({
      filterMatches: type === "All" ? this.state.matches : list,
      filter: type,
      filterResult: "All",
    });
  };

  displayResult = (type) => {
    const list = this.state.matches.filter((match) => {
      return match.result === type;
    });
    this.setState({
      filterMatches: type === "All" ? this.state.matches : list,
      filter: "All",
      filterResult: type,
    });
  };

  render() {
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.filter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.displayMatch("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.filter === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.displayMatch("Yes")}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${
                      this.state.filter === "No" ? "active" : ""
                    }`}
                    onClick={() => this.displayMatch("No")}
                  >
                    Not Played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result Game</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.filterResult === "All" ? "active" : ""
                    }`}
                    onClick={() => this.displayResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.filterResult === "W" ? "active" : ""
                    }`}
                    onClick={() => this.displayResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      this.state.filterResult === "L" ? "active" : ""
                    }`}
                    onClick={() => this.displayResult("L")}
                  >
                    L
                  </div>
                  <div
                    className={`option ${
                      this.state.filterResult === "D" ? "active" : ""
                    }`}
                    onClick={() => this.displayResult("D")}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <div className="admin_progress">
                <CircularProgress
                  thickness={7}
                  style={{
                    textAlign: "center",
                    marginLeft: "50%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            ) : null}
            <MatchList matches={this.state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
