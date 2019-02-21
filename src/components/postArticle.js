import React, { Component } from "react";
import * as api from "./api";

class PostArticle extends Component {
  state = {
    body: "",
    title: "",
    topic: ""
  };
  render() {
    return (
      <form className="articleAdd" onSubmit={this.handleSubmit}>
        <label htmlFor="">Pick the topic you would like to write about:</label>
        <div>
          <select name="topic" id="topic_dropDown" onChange={this.handleChange}>
            <option value="coding" key="coding">
              coding
            </option>

            <option value="football" key="football">
              football
            </option>

            <option value="cooking" key="cooking">
              cooking
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="">Title: </label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.title}
            name="title"
            required
          />

          <label htmlFor="">Write your article here...</label>
          <input
            onChange={this.handleChange}
            type="text"
            size="70"
            value={this.state.body}
            name="body"
            required
          />
          <button type="submit">POST!</button>
        </div>
      </form>
    );
  }

  componentDidMount() {
    const retrievedState = localStorage.getItem("state");
    if (retrievedState) {
      this.setState(JSON.parse(retrievedState));
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.props;
    const { body, title, topic } = this.state;
    // const articleData = { title, body, username };

    api.postArticle(title, body, username, topic).then(article => {
      console.log(article);
      // this.props.navigate(`/articles/${article.article_id}`)
    });
    this.setState({ body: "", title: "", topic: "" });
  };

  // need this????? --->
  // postNewArticle = () => {
  //   api.postArticle(body).then(post => console.log(post));
  // };
}

export default PostArticle;
