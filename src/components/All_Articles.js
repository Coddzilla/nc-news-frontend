import React, { Component } from "react";
import * as api from "./api";
import { Link } from "@reach/router";
import Comments from "./Comments";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";

class AllArticles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <section className="main">
        <select name="sort_by" id="sort_by">
          <option value="title" key="sort_by_title">
            title
          </option>
          <option value="date" key="sort_by_date">
            date
          </option>
        </select>
        <ul className="AllArticleList">
          {" "}
          {articles.map(article => (
            <div key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>{" "}
              <QuickView />
              <Comments />
            </div>
          ))}
        </ul>
        <SideBar />
      </section>
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
