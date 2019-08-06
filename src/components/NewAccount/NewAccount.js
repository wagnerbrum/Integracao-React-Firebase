import React, { Component } from "react";

import "./NewAccount.css";
import FirebaseService from "../../services/FirebaseService";

class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      id: null,
      email: "",
      password: ""
    };
  }

  componentDidMount = () => {
    // FirebaseService.auth_check();
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  submit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    console.log(email, password);

    FirebaseService.create_user(email, password);
  };

  render() {
    return (
      <div className="new-div">
        <form className="new-form" onSubmit={this.submit}>
          <h2 className="new-form-title">New account</h2>

          <div className="new-form-body-input-group">
            <label>Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              required
            />
          </div>

          <div className="new-form-body-input-group">
            <label>Password</label>
            <input
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              required
            />
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default NewAccount;
