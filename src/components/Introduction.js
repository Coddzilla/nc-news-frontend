import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import TopArticles from "./TopArticles";
import AllArticles from "./All_Articles";
import Topics from "./Topics";
import SideBar from "./Sidebar";

class Introduction extends Component {
  state = {
    topics: [],
    article_view: "Introduction"
  };
  render() {
    const { topics } = this.state;
    if (this.state.article_view === "Introduction") {
      return (
        <div className={`${this.state.article_view}`}>
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
              {/* this actually shows all articles, need to have a function that only shows the 3 top rated*/}
              <Link to="/top_articles">View top articles</Link>
              <Link to="/articles">View all articles</Link>
              {/* <button
                onClick={() => {
                  this.props.handleClick();
                }}
              >
                Log out
              </button> */}
            </nav>

            <Router>
              <TopArticles path="/top_articles" />
              <AllArticles path="/articles" />
              <Topics path="/topics/:topic" />
            </Router>
          </section>
        </div>
      );
    }
    return (
      <div className={`${this.state.article_view}`}>
        <p>Hello</p>
      </div>
    );
    // why is this not
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
