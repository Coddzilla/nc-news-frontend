import React, { Component } from "react";
import * as api from "./api";
import { Link } from "@reach/router";
import Comments from "./Comments";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";

class AllArticles extends Component {
  state = {
    articles: [],
    sideBarView: "default",
    article: {}
  };
  render() {
    const { article, articles, sideBarView } = this.state;
    return (
      <>
        <section className="MainLeft">
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
                <QuickView
                  article={article}
                  handleClick={this.handleClickQuickView}
                />
                <Comments
                  article={article}
                  handleClick={this.handleClickComments}
                />
                {
                  //how to get article from comment/quick view to sidebar
                  //onClick in each that changes the view type and the article to send
                }
              </div>
            ))}
          </ul>
        </section>
        <SideBar
          sideBarView={sideBarView}
          article={article}
          username={this.props.username}
        />
      </>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api
      .getArticles()
      .then(({ articles }) => {
        this.setState({ articles });
      })
      .catch(err => {});
  };

  handleClickComments = article => {
    this.setState({ sideBarView: "commentView", article });
  };

  handleClickQuickView = article => {
    this.setState({ sideBarView: "QuickView", article });
  };
}

export default AllArticles;
