import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";

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
          <p key={topic.slug}>
            <Link to={`/api/topics/${topic.slug}`}>{topic.slug}</Link>
          </p>
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
