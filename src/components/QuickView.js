import React, { Component } from "react";

class QuickView extends Component {
  render() {
    const { article } = this.props;

    return (
      <button
        id={this.props.id}
        onClick={() => {
          this.props.handleClick(article);
        }}
      >
        Quick view
      </button>
    );
  }
}

export default QuickView;
