import React, { Component } from "react";
import { Fade } from "react-reveal";

import { dbPromotions } from "../../../firebase";
import Field from "../../ui/textField";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
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
        validationMessage: "",
      },
    },
  };

  validData = (field) => {
    let error = [true, ""];

    if (field.validation.required)
      error =
        field.value.trim() === ""
          ? [false, `${field.config.name} is required`]
          : error;

    if (field.validation.email)
      error = !/\S+@\S+\.\S+/.test(field.value)
        ? [false, `${field.config.name} must be valid`]
        : error;

    if (field.validation.length)
      error =
        field.value.length <= 6
          ? [false, `${field.config.name} lenght must be greater than 6`]
          : error;

    return error;
  };

  handleText = (element) => {
    const formData = { ...this.state.formData };
    formData[element.id].value = element.event.target.value;
    const validText = this.validData(formData[element.id]);
    formData[element.id].valid = validText[0];
    formData[element.id].validationMessage = validText[1];
    this.setState({ formError: false, formData });
  };

  resetForm = (newEmail) => {
    let formData = { ...this.state.formData };
    for (let key in formData) {
      formData[key].value = "";
      formData[key].valid = false;
      formData[key].validationMessage = "";
    }
    this.setState({
      formData,
      formError: false,
      formSuccess: newEmail ? "Congratulation" : "Already registered",
    });
    this.clearSuccess();
  };

  clearSuccess = () => {
    setTimeout(() => this.setState({ formSuccess: "" }), 2000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let formValid = true;
    let data = {};

    for (let key in this.state.formData) {
      data[key] = this.state.formData[key].value;
      formValid = this.state.formData[key].valid && formValid;
    }

    if (formValid) this.toDatabase(data);
    else this.setState({ formError: true });
  };

  toDatabase = (data) => {
    dbPromotions
      .orderByChild("email")
      .equalTo(data.email)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() === null) {
          dbPromotions.push(data);
          this.resetForm(true);
        } else this.resetForm(false);
      });
  };

  render() {
    const { email } = this.state.formData;

    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <Field
                id="email"
                data={email}
                onChange={(element) => this.handleText(element)}
              />
              {this.state.formError ? (
                <div className="error_label"> Invalid field</div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.submitForm(event)}>
                Enroll
              </button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
