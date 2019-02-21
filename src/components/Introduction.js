import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import TopArticles from "./TopArticles";
import AllArticles from "./All_Articles";
import Topics from "./Topics";
import Article from "./Article";
import AuthorPage from "./AuthorPage";
import NoMatch from "./NoMatch";
import PostArticle from "./postArticle";

class Introduction extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  render() {
    const { topics } = this.state;
    console.log("in introduction", this.props.username);
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
          <Link to="/postArticle">Post an Article!</Link>
        </nav>

        <Router className="main">
          <TopArticles path="/top_articles" username={this.props.username} />
          <AllArticles path="/articles" username={this.props.username} />
          <Topics path="/topics/:topic" username={this.props.username} />
          <Article
            path="/articles/:article_id"
            username={this.props.username}
          />
          <AuthorPage
            path="/users/:username/articles"
            usernameLoggedIn={this.props.username}
          />
          <PostArticle path="/postArticle" username={this.props.username} />
          <NoMatch default />
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
