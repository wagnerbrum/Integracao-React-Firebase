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
    FirebaseService.auth_check(user_state => {
      this.setState({ user: user_state });
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  submit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    console.log(email, password);

    FirebaseService.login_user(email, password);
  };

  logout = () => {
    FirebaseService.logout_user();
  };

  check_logged = () => {
    if (!this.state.user) {
      return (
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
      );
    }

    return (
      <div>
        <h2>Usuário já está logado...</h2>
        <button onClick={this.logout}>Sair</button>
      </div>
    );
  };

  render() {
    return <div className="login-div">{this.check_logged()}</div>;
  }
}

export default Login;
