import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h2>NC-News!</h2>
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
