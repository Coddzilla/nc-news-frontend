import React, { Component } from "react";
import * as api from "../components/api";
import { Link } from "@reach/router";
import Comments from "./Comments";
import QuickView from "./QuickView";

class Topics extends Component {
  state = {
    articlesByTopic: []
  };
  render() {
    const { articlesByTopic } = this.state;

    return (
      <ul className="articleByTopicList">
        {articlesByTopic.map(article => {
          return (
            <span key={`${article.article_id}`}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <QuickView />
              <Comments />
            </span>
          );
        })}
      </ul>
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
}

export default Topics;
