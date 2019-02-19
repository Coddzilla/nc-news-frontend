import React, { Component } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Introduction from "./components/Introduction";
import * as api from "./components/api";
import Auth from "./components/Auth";
// import Articles from "./components/Articles";
// import { Link, Router } from "@reach/router";
import "./App.css";

class App extends Component {
  state = {
    user: ""
  };
  render() {
    console.log(this.state.user);
    return (
      <div className="App">
        <Header />
        <Auth LogIn={this.setUser} user={this.state.user}>
          {/* user={this.state.user} need to pass this down to Auth? */}
          <LogIn />
          <Introduction />
        </Auth>
      </div>
    );
  }

  // grumpy19;

  setUser = username => {
    // const { username } = this.props;
    console.log(username);
    api.fetchUser(username).then(user => {
      this.setState({ user });
    });
  };
}

export default App;

/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
*/
