import React, { Component } from "react";
import * as api from "./api";

class Voter extends Component {
  state = {
    voteChanger: 0
  };
  render() {
    // const { votes } = this.props;
    const { voteChanger } = this.state;
    const { votes } = this.props;
    return (
      <div>
        <button
          key="voteUp"
          onClick={() => {
            this.addVote(1);
          }}
          disabled={voteChanger === 1}
        >
          Vote up!
        </button>
        <p>Votes: {votes + voteChanger}</p>
        <button
          key="voteDown"
          onClick={() => {
            this.addVote(-1);
          }}
          disabled={voteChanger === -1}
        >
          Vote Down!
        </button>
      </div>
    );
  }

  addVote = direction => {
    const { article_id } = this.props;
    api.vote(article_id, direction);
    this.setState(state => ({ voteChanger: state.voteChanger + direction }));
  };
}

export default Voter;
