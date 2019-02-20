/*
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
*/

import React, { Component } from "react";
import * as api from "./api";

// const Articles = () => {
//   return (
//     <div className="Articles">
//       <h2>Articles</h2>
//     </div>
//   );
// };

class AllArticles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <ul className="AllArticleList">
        {" "}
        {articles.map(article => (
          <li key={article.article_id}> {article.title} </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api.getArticles().then(({ articles }) => {
      this.setState({ articles });
    });
  };

  // componendDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) this.fetchArticles();
  // }
}

export default AllArticles;
