import React, { Component } from "react";
import { Link } from "react-router-dom";

import { dbMatches } from "../../../firebase";
import AdminLayout from "../../../hoc/adminLayout";

//UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

class Matches extends Component {
  state = { loading: true, matches: [] };

  componentDidMount() {
    dbMatches.once("value").then((snap) => this.fetchMatches(snap));
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

  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.matches
                ? this.state.matches.map((match, i) => (
                    <TableRow key={i}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                          {match.away} <strong>-</strong> {match.local}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {match.resultAway} <strong>-</strong>{" "}
                        {match.resultLocal}
                      </TableCell>
                      <TableCell>
                        {match.final === "Yes" ? (
                          <span className="matches_tag_red">Final</span>
                        ) : (
                          <span className="matches_tag_green">
                            To be played
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>
        <div className="admin_progress">
          {this.state.loading ? (
            <CircularProgress thickness={7} style={{ color: "#98C5E9" }} />
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default Matches;
