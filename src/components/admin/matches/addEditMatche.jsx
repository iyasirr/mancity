import React, { Component } from "react";

import TextField from "../../ui/textField";
import AdminLayout from "../../../hoc/adminLayout";

import { dbTeams, dbMatches, db } from "../../../firebase";

class AddEditMatches extends Component {
  state = {
    formType: "",
    matchId: "",
    loading: false,
    buttonDisabled: false,
    teams: [],
    formSucces: "",
    formError: false,
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event Date",
          name: "Date",
          type: "date",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Local",
          name: "Local team",
          type: "select",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: false,
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result Local",
          name: "Result-Local",
          type: "input",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: false,
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Away",
          name: "Away team",
          type: "select",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: false,
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result Away",
          name: "Result-Away",
          type: "input",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: false,
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "Referee",
          type: "input",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "Stadium",
          type: "input",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team Result",
          name: "Result",
          type: "select",
          options: [
            { key: "W", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "n/a", value: "n/a" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played ?",
          name: "Played",
          type: "select",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
    },
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;

    const getTeams = (match) => {
      dbTeams.once("value").then((snap) => {
        const teams = this.fetchTeams(snap);
        const teamsOptions = this.fetchOptions(snap);
        this.updateForm(match, teamsOptions, teams, matchId);
      });
    };

    if (!matchId) {
      this.setState({ formType: "Add Match" });
      getTeams(false);
    } else {
      this.setState({ formType: "Edit Match" });
      db.ref(`matches/${matchId}`)
        .once("value")
        .then((snap) => {
          getTeams(snap.val());
        });
    }
  }

  fetchTeams = (snap) => {
    let teams = [];
    snap.forEach((child) => {
      teams.push({
        id: child.key,
        ...child.val(),
      });
    });

    return teams;
  };

  updateForm = (match, teamsOptions, teams, matchId) => {
    const formData = { ...this.state.formData };
    for (let key in formData) {
      if (match) {
        formData[key].value = match[key];
        formData[key].valid = true;
      }
      if (key === "local" || key === "away")
        formData[key].config.options = teamsOptions;
    }

    this.setState({ formData, matchId, teams });
  };

  fetchOptions = (snap) => {
    let matchesOptions = [];
    snap.forEach((child) => {
      matchesOptions.push({
        key: child.val().shortName,
        value: child.val().shortName,
      });
    });

    return matchesOptions;
  };

  isValid = (field) => {
    let error = [];
    error = field.validation.required
      ? field.value.trim() === ""
        ? error.concat(`${field.config.name} is empty`)
        : error
      : error;

    return error;
  };

  textHandler = (element) => {
    const formData = { ...this.state.formData };
    formData[element.id].value = element.event.target.value;
    const error = this.isValid(formData[element.id]);
    formData[element.id].valid = error.length > 0 ? false : true;
    formData[element.id].validationMessage = error.toString();
    this.setState({ formError: false, formData });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true, buttonDisabled: true });
    let isValidForm = true;
    let data = {};
    const { formData } = this.state;

    for (let key in formData) {
      data[key] = formData[key].value;
      isValidForm = formData[key].valid && isValidForm;
    }

    this.state.teams.forEach((team) => {
      if (team.shortName === data.local) data["localThmb"] = team.thmb;
      if (team.shortName === data.away) data["awayThmb"] = team.thmb;
    });

    if (isValidForm) {
      if (this.state.formType === "Edit Match") this.toDatabaseEdit(data);
      else if (this.state.formType === "Add Match") this.toDatabaseAdd(data);
    } else
      this.setState({
        formError: true,
        loading: false,
        buttonDisabled: false,
      });
  };

  toDatabaseEdit = (data) => {
    db.ref(`matches/${this.state.matchId}`)
      .update(data)
      .then(() => {
        this.setState({ formSucces: "Updated" });
        setTimeout(() => this.setState({ formSucces: "" }), 2000);
      })
      .catch(() => this.setState({ formError: true }));
  };

  toDatabaseAdd = (data) => {
    dbMatches
      .push(data)
      .then(() => this.props.history.push("/admin_matches"))
      .catch(() => this.setState({ formError: true }));
  };

  render() {
    const {
      date,
      local,
      resultLocal,
      away,
      resultAway,
      referee,
      final,
      result,
      stadium,
    } = this.state.formData;

    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(event) => this.submitHandler(event)}>
              <TextField
                id="date"
                data={date}
                onChange={(element) => this.textHandler(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <TextField
                      id="local"
                      data={local}
                      onChange={(element) => this.textHandler(element)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="resultLocal"
                      data={resultLocal}
                      onChange={(element) => this.textHandler(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <TextField
                      id="away"
                      data={away}
                      onChange={(element) => this.textHandler(element)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="resultAway"
                      data={resultAway}
                      onChange={(element) => this.textHandler(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <TextField
                  id="referee"
                  data={referee}
                  onChange={(element) => this.textHandler(element)}
                />

                <TextField
                  id="stadium"
                  data={stadium}
                  onChange={(element) => this.textHandler(element)}
                />
              </div>

              <div className="split_fields last">
                <TextField
                  id="result"
                  data={result}
                  onChange={(element) => this.textHandler(element)}
                />

                <TextField
                  id="final"
                  data={final}
                  onChange={(element) => this.textHandler(element)}
                />
              </div>

              <div className="success_label">{this.state.formSucces}</div>
              {this.state.formError ? (
                <div className="error_label"> Invalid Fields</div>
              ) : (
                ""
              )}
              <div className="admin_submit">
                <button onClick={(event) => this.submitHandler(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatches;
