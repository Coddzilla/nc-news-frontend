import React, { Component } from "react";
import * as api from "./api";
import Voter from "./Voter";

class SideBar extends Component {
  state = {
    dataToView: [],
    fullComment: ""
  };
  render() {
    const { dataToView } = this.state;

    const { username, article, sideBarView } = this.props;

    //default
    if (!article.article_id || sideBarView === "default") {
      return (
        <div className="Sidebar">
          <h2>DEFAULT SideBar</h2>
        </div>
      );
    }

    /////comments
    if (sideBarView === "commentView" && article) {
      return (
        <div className="Sidebar">
          <form onSubmit={this.handleSubmit}>
            <label>Post a comment</label>
            <input
              onChange={this.handleChange}
              value={this.state.newComment}
              required
            />
            <button type="submit">Post</button>
          </form>
          <div>
            {dataToView.map(comment => {
              console.log(username, comment.author);
              return (
                <span key={comment.comment_id}>
                  <h4>Comment: {comment.body}</h4>
                  <Voter
                    article_id={comment.comment_id}
                    votes={comment.votes}
                  />
                  <h5>Written by:{comment.author}</h5>
                  <h5>created at: {comment.created_at}</h5>
                  <h5>id: {comment.comment_id}</h5>
                  <button
                    key="deleteComment"
                    disabled={this.props.username !== comment.author}
                  >
                    Delete comment
                  </button>
                </span>
              );
            })}
            <div className="postAComment" />
          </div>
        </div>
      );
    }

    //quick view
    if (sideBarView === "QuickView" && article) {
      return (
        <div className="Sidebar">
          <h2>{article.title}</h2>
          <h3>Votes: {article.votes}</h3>
          <p>You can vote on this by viewing the full article</p>
          <h3>Topic: {article.topic}</h3>
          <h3>created at: {article.created_at}</h3>
          <h3>Created by: {article.author}</h3>
        </div>
      );
    }
  }

  componentDidMount() {
    this.fetchViewData();
  }

  componentDidUpdate(prevProps) {
    //check if the article is changing so that it displays different comments when click on different
    if (this.props !== prevProps) {
      this.fetchViewData();
    }
  }

  fetchViewData = () => {
    const { article, sideBarView } = this.props;
    if (sideBarView === "commentView") {
      api.getViewComments(article.article_id).then(dataToView => {
        this.setState({ dataToView });
      });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const fullComment = event.target.value;

    this.setState({ fullComment });
  };
  handleSubmit = event => {
    const { article } = this.props;
    event.preventDefault();
    const fullComment = this.state.fullComment;
    // api.patchComments(fullComment, article.article_id);
    console.log("need to make a function for post comments in the back end");
    this.setState({ fullComment: "" });
  };
}

export default SideBar;
