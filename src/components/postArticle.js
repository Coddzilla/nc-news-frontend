import React, { Component } from "react";
import * as api from "./api";

class PostArticle extends Component {
  state = {
    body: "",
    title: "",
    topic: "coding",
    newTopic: "",
    chooseNewTopic: "false"
  };
  render() {
    console.log(this.state.newTopic);
    return (
      <form className="articleAdd" onSubmit={this.handleSubmit}>
        <label htmlFor="">Pick the topic you would like to write about:</label>
        <div>
          {
            //map over topics instead of puttin in my own so that I can add a new topic
          }
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
            <option value="new" key="new_Topic">
              Make a new topic?
            </option>
          </select>

          {this.state.topic === "new" && (
            <div>
              <label htmlFor="">Make a new topic?</label>
              <input
                type="text"
                onChange={this.handleTopicChange}
                value={this.state.newTopic}
              />
              <button onClick={this.handleTopicClick}>Make new topic</button>
            </div>
          )}
        </div>
        <br />
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
    // const retrievedState = localStorage.getItem("state");
    // if (retrievedState) {
    //   this.setState(JSON.parse(retrievedState));
    // }
  }
  componentDidUpdate() {
    // this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleTopicChange = event => {
    event.preventDefault();
    const newTopic = event.target.value;
    this.setState({ newTopic: newTopic });
  };

  handleTopicClick = event => {
    event.preventDefault();
    const newTopic = this.state.newTopic;
    api.addTopic(newTopic).then(data => console.log(data));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.props;
    const { body, title, topic } = this.state;

    api.postArticle(title, body, username, topic).then(article => {
      console.log(article);
      this.props.navigate(`/articles/${article.article_id}`);
    });
    this.setState({ body: "", title: "", topic: "" });
  };
}

export default PostArticle;
