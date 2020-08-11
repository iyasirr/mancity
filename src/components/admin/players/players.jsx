import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../hoc/adminLayout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import { dbPlayers } from "../../../firebase";

class Players extends Component {
  state = { loading: true, players: [] };

  componentDidMount() {
    dbPlayers.once("value").then((snap) => this.fetchPlayers(snap));
  }

  fetchPlayers = (snap) => {
    let players = [];
    snap.forEach((child) => {
      players.push({
        id: child.key,
        ...child.val(),
      });
    });
    this.setState({ players, loading: false });
  };

  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players.length > 0
                ? this.state.players.map((player, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>{player.number}</TableCell>
                      <TableCell>{player.position}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>
        <div className="admin_progress">
          {this.state.loading ? (
            <CircularProgress thickness={7} style={{ color: "#98C5E9" }} />
          ) : null}
        </div>
      </AdminLayout>
    );
  }
}

export default Players;
