import React, { Component } from "react";
import * as api from "./api";
import { Link } from "@reach/router";
import SideBar from "./Sidebar";

// const Articles = () => {
//   return (
//     <div className="Articles">
//       <h2>Articles</h2>
//     </div>
//   );
// };

class TopArticles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <>
        <section className="MainLeft">
          {" "}
          <ul className="articleList">
            {" "}
            {articles.map(article => (
              <div key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {" "}
                  {article.title}{" "}
                </Link>
              </div>
            ))}
          </ul>
        </section>
        <SideBar
          sideBarView="default"
          article={{}}
          //why is this changed?
          username={this.props.username}
        />
      </>
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

export default TopArticles;
