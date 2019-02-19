import React, { Component } from "react";
import * as api from "../components/api";

class Topics extends Component {
  state = {
    articlesByTopic: []
  };
  render() {
    const { articlesByTopic } = this.state;

    return (
      <ul>
        {articlesByTopic.map(article => {
          return <li key={`${article.article_id}`}>{article.title}</li>;
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
