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
      <div>
        {" "}
        {articles.map(article => (
          <p key={article.id}> {article.title} </p>
        ))}
      </div>
    );
  }

  componendDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api.getArticles().then(articles => {
      this.setState({ articles });
    });
  };
}

export default Articles;
