import React, { Component } from "react";
import Card from "../ui/card";
import Stripes from "../../resources/images/stripes.png";
import { dbPlayers, storage } from "../../firebase";
import { Promise } from "core-js";
import { Fade } from "react-reveal";
import { CircularProgress } from "@material-ui/core";

class Team extends Component {
  state = { loading: true, players: [] };

  componentDidMount() {
    dbPlayers.once("value").then((snap) => {
      const players = this.fetchPlayers(snap);
      let promises = [];
      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            storage
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then((url) => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }

      Promise.all(promises)
        .then((res) => {
          console.log("jihii");
          this.setState({ loading: false, players });
        })
        .catch((err) => console.log(err));
    });
  }

  fetchPlayers = (snap) => {
    let players = [];
    snap.forEach((child) => {
      players.push({
        id: child.key,
        ...child.val(),
      });
    });
    return players;
  };

  displayCards = (type) =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === type ? (
            <Fade left delay={i * 20} key={i}>
              <div className="item">
                <Card
                  name={player.name}
                  lname={player.lastname}
                  number={player.number}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {this.state.loading ? (
          <div className="progress">
            <CircularProgress
              thickness={7}
              style={{ textAlign: "center", marginLeft: "50%" }}
            />
          </div>
        ) : (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">{this.displayCards("Keeper")}</div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defenders</div>
              <div className="team_cards">{this.displayCards("Defence")}</div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfielders</div>
              <div className="team_cards">{this.displayCards("Midfield")}</div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">{this.displayCards("Striker")}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Team;
