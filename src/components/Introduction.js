import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import TopArticles from "./TopArticles";
import AllArticles from "./All_Articles";
import Topics from "./Topics";
import Article from "./Article";
import AuthorPage from "./AuthorPage";

import SideBar from "./Sidebar";

class Introduction extends Component {
  state = {
    topics: [],
    article_view: "Introduction",
    //
    isLoading: true
  };
  render() {
    const { topics } = this.state;
    //
    if (this.state.isLoading) {
      return <h2>Loading...</h2>;
    }
    //
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
              <Link to="/top_articles">View top articles</Link>
              <Link to="/articles">View all articles</Link>
            </nav>

            <Router>
              <TopArticles path="/top_articles" />
              <AllArticles path="/articles" />
              <Topics path="/topics/:topic" />
              <Article path="/articles/:article_id" />
              <AuthorPage path="/users/:username/articles" />
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
        this.setState({ topics, isLoading: false });
      })
      .catch(err => console.log(err));
  };
}

export default Introduction;
