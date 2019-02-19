import React, { Component } from "react";
import * as api from "../components/api";

// const Articles = () => {
//   return (
//     <div className="Articles">
//       <h2>Articles</h2>
//     </div>
//   );
// };

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <ul className="articleList">
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
    api.getTopArticles().then(({ articles }) => {
      this.setState({ articles });
    });
  };

  // componendDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) this.fetchArticles();
  // }
}

export default Articles;
