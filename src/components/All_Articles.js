import React, { Component } from "react";
import * as api from "../components/api";

class AllArticles extends Component {
  state = {
    all_articles: []
  };
  render() {
    const { all_articles } = this.state;

    return (
      <ul className="AllarticleList">
        {" "}
        {all_articles.map(article => (
          <li key={article.article_id}> {article.title} </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    this.fetchAll_articles();
  }

  fetchAll_articles = () => {
    api.getArticles().then(({ all_articles }) => {
      this.setState({ all_articles });
    });
  };
}

export default AllArticles;
