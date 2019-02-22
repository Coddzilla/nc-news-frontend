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
    user: {}
  };
  render() {
    console.log("user", this.state.user);
    return (
      <div className="App">
        <Header handleClick={this.handleClick} />
        <Auth LogIn={this.setUser} user={this.state.user}>
          {/* user={this.state.user} need to pass this down to Auth? */}
          <LogIn username={this.state.user.username} />
          <Introduction username={this.state.user.username} />
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

  componentDidMount() {
    const retrievedState = localStorage.getItem("state");
    if (retrievedState) {
      this.setState(JSON.parse(retrievedState));
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleClick = () => {
    this.setState({ user: "" });
  };
}

export default App;
