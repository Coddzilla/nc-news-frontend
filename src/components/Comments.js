import React, { Component } from "react";

class Comments extends Component {
  state = {};
  render() {
    const { article } = this.props;

    return (
      <button
        id={this.props.id}
        onClick={() => {
          this.props.handleClick(article);
        }}
      >
        view comments in side bar
      </button>
    );
  }
}

export default Comments;
