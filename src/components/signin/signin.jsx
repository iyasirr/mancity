import React, { Component } from "react";
import { FadeLoader } from "react-spinners";
import { auth } from ".././../firebase";

import TextField from "../ui/textField";

class signin extends Component {
  state = {
    loading: false,
    buttonDisabled: false,
    formSucces: "",
    formError: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validMsg: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
      },
    },
  };

  isValid = (field) => {
    let error = [];
    error = field.validation.required
      ? field.value.trim() === ""
        ? error.concat(`${field.config.name} is empty`)
        : error
      : error;

    error = field.validation.email
      ? !/\S+@\S+\.\S+/.test(field.value)
        ? error.concat(`${field.config.name} must be valid`)
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

    if (isValidForm) this.toDatabase(data);
    else
      this.setState({ formError: true, loading: false, buttonDisabled: false });
  };

  toDatabase = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.setState({ loading: false, buttonDisabled: false });
        this.props.history.push("/admin");
      })
      .catch((err) =>
        this.setState({
          formError: true,
          loading: false,
          buttonDisabled: false,
        })
      );
  };

  render() {
    const { email, password } = this.state.formData;

    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={(event) => this.submitHandler(event)}>
            <h2>Please Login</h2>
            <TextField
              id="email"
              data={email}
              onChange={(element) => this.textHandler(element)}
            />
            <TextField
              id="password"
              data={password}
              onChange={(element) => this.textHandler(element)}
            />
            {this.state.loading ? (
              <div
                className="container"
                style={{
                  textAlign: "center",
                  width: "10%",
                  padding: "10px 0px",
                }}
              >
                <FadeLoader height={7} width={10} radius={2} margin={1} />
              </div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Something went wrong, Try again</div>
            ) : null}
            <button disabled={this.state.buttonDisabled}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default signin;
