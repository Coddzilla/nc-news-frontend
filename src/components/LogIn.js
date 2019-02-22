import React, { Component } from "react";
import { Link } from "@reach/router";

class LogIn extends Component {
  render() {
    return (
      <div className="LogIn">
        <h2>LogIn</h2>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}

export default LogIn;
