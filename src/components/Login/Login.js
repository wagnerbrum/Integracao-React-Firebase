import React, { Component } from "react";

import "./Login.css";
import FirebaseService from "../../services/FirebaseService";

class Login extends Component {
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
    FirebaseService.auth_check();
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  submit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    console.log(email, password);
  };

  render() {
    return (
      <div className="login-div">
        <form className="login-form" onSubmit={this.submit}>
          <h2 className="login-form-title">Login</h2>

          <div className="login-form-body-input-group">
            <label>Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              required
            />
          </div>

          <div className="login-form-body-input-group">
            <label>Password</label>
            <input
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
