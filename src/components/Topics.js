import React, { Component } from "react";
import * as api from "../components/api";
import { Link } from "@reach/router";
import Comments from "./Comments";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";

class Topics extends Component {
  state = {
    articlesByTopic: [],
    sideBarView: "default",
    article: {}
  };
  render() {
    const { articlesByTopic, article, sideBarView } = this.state;

    return (
      <>
        <section className="MainLeft">
          <ul className="articleByTopicList">
            {articlesByTopic.map(article => {
              return (
                <span key={`${article.article_id}`}>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                  <QuickView
                    article={article}
                    handleClick={this.handleClickQuickView}
                  />
                  <Comments
                    article={article}
                    handleClick={this.handleClickComments}
                  />
                </span>
              );
            })}
          </ul>
        </section>
        <SideBar sideBarView={sideBarView} article={article} />
      </>
    );
  }

  componentDidMount() {
    this.fetchArticlesByTopic();
  }

  fetchArticlesByTopic = () => {
    const { topic } = this.props;

    api.getArticlesByTopic(topic).then(articlesByTopic => {
      this.setState({ articlesByTopic });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticlesByTopic();
    }
  }

  handleClickComments = article => {
    this.setState({ sideBarView: "commentView", article });
  };

  handleClickQuickView = article => {
    this.setState({ sideBarView: "QuickView", article });
  };
}

export default Topics;
