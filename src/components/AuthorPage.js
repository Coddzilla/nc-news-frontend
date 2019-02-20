import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import Comments from "./Comments";
import Voter from "./Voter";
import QuickView from "./QuickView";

class AuthorPage extends Component {
  state = {
    authorsArticles: [],
    isLoading: true
  };
  render() {
    const { username } = this.props;
    const { isLoading, authorsArticles } = this.state;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    return (
      <section>
        <div>Articles written by {username}:</div>
        <ul>
          {authorsArticles.map(article => {
            return (
              <div key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
                <Comments />
                <QuickView />
                <Voter article_id={article.article_id} votes={article.votes} />
              </div>
            );
          })}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    this.fetchUserArticles();
  }

  fetchUserArticles = () => {
    const { username } = this.props;
    api.getUserArticles(username).then(authorsArticles => {
      this.setState({ authorsArticles, isLoading: false });
    });
  };
}

export default AuthorPage;
