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
    return (
      <div className="App">
        <Header />
        <Auth LogIn={this.setUser} user={this.state.user}>
          {/* user={this.state.user} need to pass this down to Auth? */}
          <LogIn />
          <Introduction handleClick={this.handleClick} />
        </Auth>
      </div>
    );
  }

  // grumpy19;

  setUser = username => {
    api.fetchUser(username).then(user => {
      this.setState({ user });
    });
  };

  handleClick = () => {
    this.setState({ user: "" });
  };
}

export default App;
