import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationComponent from "./navigation";
import Todo from "./pages/todo";
import Footer from "./footer";
import Auth from "./pages/auth";
import Settings from './pages/settings';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);


  }
  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }
  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }



  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;


        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })

      .catch((error) => {
        console.log("error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();

  }

  authorizedPages() {
    return [
      <Route
        key="todo"
        exact path="/todo"
        component={Todo}

      />,
      <Route
        key='Settings'
        path='/settings'
        component={Settings}
      />

    ];
  }

  render(props) {
    return (

      <div className="app">
        <Header />
        <Router>
          <div className="nav-wrapper">
            <NavigationComponent
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogin={this.handleSuccessfulLogin}
              handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              handleSuccessfulLogout={this.handleSuccessfulLogout}

            />
          </div>
          <Switch>
            {this.state.loggedInStatus === "LOGGED_IN" ? (
              this.authorizedPages()
            ) : null}
            <Route
              path="/"
              render={(props) => (
                <Auth
                  {...props}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />

              )}
            />

          </Switch>

        </Router>
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>

    );
  }
}
