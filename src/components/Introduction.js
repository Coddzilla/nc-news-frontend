import React, { Component } from "react";
import * as api from "./api";

class Introduction extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;

    //destructure
    return (
      <div className="Introduction">
        {topics.map(topic => (
          <p key={topic.id}>{topic.slug}</p>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => console.log(err));
  };
}

export default Introduction;
