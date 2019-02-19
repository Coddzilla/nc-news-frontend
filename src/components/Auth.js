import React, { Component } from "react";
// import LogIn from "./LogIn";

class Auth extends Component {
  state = { username: "" };
  render() {
    console.log(this.props);
    if (this.props.user) {
      return (
        <div>
          <p>{this.props.children}</p>
        </div>
      );
    }
    return (
      <div className="Auth">
        <form onSubmit={this.handleSubmit}>
          <label>Enter username to Log in</label>
          <input onChange={this.handleChange} value={this.state.username} />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    event.preventDefault();
    const username = event.target.value;
    this.setState({ username });
  };
  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    this.props.LogIn(username);
  };
}

export default Auth;
