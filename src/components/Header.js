import React, { Component } from "react";
import { Link } from "@reach/router";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h2>NC-News!</h2>
        <Link to="/">Home</Link>
        <button
          onClick={() => {
            this.props.handleClick();
          }}
        >
          Log out
        </button>
      </div>
    );
  }
}

export default Header;
