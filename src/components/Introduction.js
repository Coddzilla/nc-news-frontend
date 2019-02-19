import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import Articles from "./Articles";
import Topics from "./Topics";
import SideBar from "./Sidebar";

class Introduction extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;

    //destructure
    return (
      <div className="Introduction">
        <section className="Sidebar">
          <SideBar />
        </section>
        <section className="main">
          <nav className="nav">
            {" "}
            {topics.map(topic => (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                {topic.slug}
              </Link>
            ))}
            <Link to="/articles">View all articles</Link>
            <button
              onClick={() => {
                this.props.handleClick();
              }}
            >
              Log out
            </button>
          </nav>

          <Router>
            <Articles path="/articles" />
            <Topics path="/topics/:topic" />
          </Router>
        </section>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }
  ß;

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
