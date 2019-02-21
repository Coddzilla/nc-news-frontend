import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import TopArticles from "./TopArticles";
import AllArticles from "./All_Articles";
import Topics from "./Topics";
import Article from "./Article";
import AuthorPage from "./AuthorPage";

class Introduction extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  render() {
    const { topics } = this.state;
    //
    if (this.state.isLoading) {
      return <h2>Loading...</h2>;
    }
    return (
      <section>
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

        <Router className="main">
          <TopArticles path="/top_articles" />
          <AllArticles path="/articles" />
          <Topics path="/topics/:topic" />
          <Article path="/articles/:article_id" />
          <AuthorPage path="/users/:username/articles" />
        </Router>
      </section>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

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
