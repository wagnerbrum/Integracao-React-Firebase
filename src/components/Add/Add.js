import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import FirebaseService from "../../services/FirebaseService";
import { urls } from "../../util/urlUtils";
import "./Add.css";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      humidity: "",
      client: "",
      date: ""
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  submit = event => {
    event.preventDefault();

    const { temperature, humidity, client, date } = this.state;

    const newid = FirebaseService.pushData("leituras", {
      temperature,
      humidity,
      client,
      date
    });

    this.props.history.push(urls.list.path);
  };

  render() {
    return (
      <div>
        <form className="div-form" onSubmit={this.submit}>
          <div className="input-field">
            <label>Temperature</label>
            <input
              type="text"
              name="temperature"
              value={this.state.temperature}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Humidity</label>
            <input
              type="text"
              name="humidity"
              value={this.state.humidity}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Client</label>
            <input
              type="text"
              name="client"
              value={this.state.client}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Date</label>
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <button type="submit"> Add Item </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Add);
