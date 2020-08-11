import React, { Component } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import TextField from "../../ui/textField";
import FileUploader from "../../ui/fileUploader";
import { db, dbPlayers, storage } from "../../../firebase";
import { CircularProgress } from "@material-ui/core";
import Players from "../../home/players/players";

class AddEditPlayer extends Component {
  state = {
    loading: false,
    playerId: "",
    defaultImg: "",
    formError: false,
    formSuccess: "",
    formType: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "Name",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Last Name",
          name: "Lastname",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player Number",
          name: "Number",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Player Position",
          name: "Postion",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validMsg: "",
        showLabel: true,
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({ formType: "Add Player" });
    } else {
      this.setState({ formType: "Edit Player" });
      db.ref(`players/${playerId}`)
        .once("value")
        .then((snap) => {
          storage
            .ref("players")
            .child(snap.val().image)
            .getDownloadURL()
            .then((url) => this.updateForm(snap.val(), playerId, url))
            .catch(() => {
              this.updateForm({ ...snap.val(), image: "" }, playerId, "");
            });
        });
    }
  }

  updateForm = (player, playerId, defaultImg) => {
    const formData = { ...this.state.formData };
    for (let key in formData) {
      formData[key].value = player[key];
      formData[key].valid = true;
    }
    this.setState({ formData, playerId, defaultImg });
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

  textHandler = (element, content = "") => {
    const formData = { ...this.state.formData };

    if (content === "") formData[element.id].value = element.event.target.value;
    else formData[element.id].value = content;

    const error = this.isValid(formData[element.id]);
    formData[element.id].valid = error.length > 0 ? false : true;
    formData[element.id].validationMessage = error.toString();
    this.setState({ formError: false, formData });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let isValidForm = true;
    let data = {};
    const { formData } = this.state;

    for (let key in formData) {
      data[key] = formData[key].value;
      isValidForm = formData[key].valid && isValidForm;
    }

    if (isValidForm) {
      if (this.state.formType === "Edit Player") this.toDatabaseEdit(data);
      else if (this.state.formType === "Add Player") this.toDatabaseAdd(data);
    } else
      this.setState({
        formError: true,
        loading: false,
        buttonDisabled: false,
      });
  };

  toDatabaseEdit = (data) => {
    db.ref(`players/${this.state.playerId}`)
      .update(data)
      .then(() => {
        this.setState({ formSuccess: "Updated", loading: false });
        setTimeout(() => this.setState({ formSuccess: "" }), 2000);
      })
      .catch(() => this.setState({ formError: true, loading: false }));
  };

  toDatabaseAdd = (data) => {
    dbPlayers
      .push(data)
      .then(() => this.props.history.push("/admin_players"))
      .catch(() => this.setState({ formError: true }));
  };

  resetImage = () => {
    const formData = { ...this.state.formData };
    formData["image"].value = "";
    formData["image"].valid = false;
    this.setState({ formData, defaultImg: "", defaultName: "" });
  };

  storeFile = (name) => {
    this.textHandler({ id: "image" }, name);
  };

  render() {
    const { name, lastname, number, position, image } = this.state.formData;

    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(event) => this.submitHandler(event)}>
              <FileUploader
                dir="players"
                tag="Player Image"
                defaultImg={this.state.defaultImg}
                defaultName={image.value}
                resetImage={this.resetImage}
                filename={(name) => this.storeFile(name)}
              />
              <TextField
                id="name"
                data={name}
                onChange={(element) => this.textHandler(element)}
              />
              <TextField
                id="lastname"
                data={lastname}
                onChange={(element) => this.textHandler(element)}
              />
              <TextField
                id="number"
                data={number}
                onChange={(element) => this.textHandler(element)}
              />
              <TextField
                id="position"
                data={position}
                onChange={(element) => this.textHandler(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Invalid Fields</div>
              ) : null}
              <div className="progress">
                {this.state.loading ? (
                  <CircularProgress
                    thickness={7}
                    style={{ textAlign: "center", margin: "30px 0" }}
                  />
                ) : null}
              </div>
              <div className="admin_submit">
                <button onClick={(event) => this.submitHandler(event)}>
                  {this.state.formType}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
