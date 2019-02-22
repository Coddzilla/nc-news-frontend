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
          <button
            onClick={() => {
              this.props.navigate("/postArticle");
            }}
          >
            Post an article!
          </button>
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
                  {this.props.username === article.author && (
                    <button
                      onClick={() => {
                        this.handleClick(article.article_id);
                      }}
                      key="deleteArticle"
                    >
                      Delete Article
                    </button>
                  )}
                </span>
              );
            })}
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

  /*
 componentDidMount() {
    const retrievedState = localStorage.getItem('state')
    if (retrievedState) {
      this.setState(JSON.parse(retrievedState));
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }
*/

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

  handleClick = article_id => {
    api
      .deleteArticleById(article_id)
      .then(data => {
        console.log(data, "inside .then");
        const newArticles = this.state.articlesByTopic.filter(
          article => article.article_id !== article_id
        );

        this.setState({ articlesByTopic: newArticles });
      })
      .catch(err => console.dir(err, "inside catch"));

    //set state so it rerenders but don't know if this is necessary?
  };
}

export default Topics;
