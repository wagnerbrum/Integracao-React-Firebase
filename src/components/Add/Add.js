import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Add.css";
import FirebaseService from "../../services/FirebaseService";
import { urls } from "../../util/urlUtils";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      temperature: "",
      humidity: "",
      client: "",
      date: ""
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      this.setState({ id });

      FirebaseService.getUniqueDataBy("leituras", id, data => {
        this.setState({ ...data }, () => console.log(this.state));
      });
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  submit = event => {
    event.preventDefault();

    const { temperature, humidity, client, date } = this.state;

    let objToSubmit = {
      temperature,
      humidity,
      client,
      date
    };

    if (this.props.match.params.id === undefined) {
      FirebaseService.pushData("leituras", objToSubmit);
    } else {
      FirebaseService.updateData(
        this.props.match.params.id,
        "leituras",
        objToSubmit
      );
    }

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

          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Add);
