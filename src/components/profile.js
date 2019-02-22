import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import Comments from "./Comments";

import QuickView from "./QuickView";
import SideBar from "./Sidebar";
import PostArticle from "./postArticle";

class Profile extends Component {
  state = {
    usersArticles: [],
    isLoading: true,
    sideBarView: "default",
    article: {}
  };
  render() {
    const { username } = this.props;
    const { isLoading, usersArticles, article, sideBarView } = this.state;
    if (isLoading) {
      return (
        <div>
          {" "}
          <p>
            Hummm... looks like you haven't got any live articles at the moment,
            want to post one?!
          </p>
          <PostArticle path="/postArticle" username={this.props.username} />
        </div>
      );
    }
    return (
      <>
        <section className="MainLeft">
          <div>Articles written by {username}:</div>
          <ul>
            {usersArticles.map(article => {
              return (
                <div key={article.article_id}>
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
                  <button
                    onClick={() => {
                      this.handleClick(article.article_id);
                    }}
                    key="deleteArticle"
                  >
                    Delete Article
                  </button>
                </div>
              );
            })}
          </ul>
          {usersArticles.length > 2 && (
            <p>You wrote all these articles... well done!</p>
          )}
          {usersArticles.length === 0 && (
            <div>
              <p>
                Hummm... looks like you haven't got any live articles at the
                moment, want to post one?!
              </p>
              <PostArticle path="/postArticle" username={this.props.username} />
            </div>
          )}
        </section>
        <SideBar
          sideBarView={sideBarView}
          article={article}
          username={this.props.usernameLoggedIn}
        />
      </>
    );
  }

  componentDidMount() {
    this.fetchUserArticles();
  }

  fetchUserArticles = () => {
    const { username } = this.props;
    api.getUserArticles(username).then(usersArticles => {
      this.setState({ usersArticles, isLoading: false });
    });
  };

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
        const newArticles = this.state.usersArticles.filter(
          article => article.article_id !== article_id
        );
        console.log("newArticles", newArticles);
        this.setState({ usersArticles: newArticles });
      })
      .catch(err => console.dir(err, "inside catch"));

    //set state so it rerenders but don't know if this is necessary?
  };
}

export default Profile;
