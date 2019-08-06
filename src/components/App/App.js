import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import FirebaseService from "../../services/FirebaseService";
import Datatable from "../Datatable/Datatable";
import { urls, privateUrls } from "../../util/urlUtils";
import Navbar from "../Navbar/Navbar";
import Welcome from "../Welcome/Welcome";
import Add from "../Add/Add";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    FirebaseService.getDataList("leituras", dataReceived => {
      this.setState({ data: dataReceived });
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />

          <Switch>
            <Route exact={true} path={urls.home.path}>
              <Welcome />
            </Route>

            <Route path={urls.list.path}>
              <Datatable data={this.state.data} />
            </Route>

            <Route path={urls.add.path}>
              <Add />
            </Route>

            <Route path={privateUrls.edit.path}>
              {props => <Add {...props} />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
