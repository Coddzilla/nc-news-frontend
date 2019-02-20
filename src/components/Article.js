import React, { Component } from "react";
import * as api from "./api";
import Voter from "./Voter";
import Comments from "./Comments";
import { Link } from "@reach/router";
import SideBar from "./Sidebar";

class Article extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    return (
      <section className="main">
        {" "}
        <article>
          <h2>{article.title}</h2>
          <h5>
            <Link to={`/users/${article.author}/articles`}>
              {article.author}
            </Link>
          </h5>
          <Voter article_id={article.article_id} votes={article.votes} />
          <Comments />
          <h4>{article.body}</h4>
        </article>
        <SideBar />
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    console.log(article_id);
    api.getArticle(article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  };
}

export default Article;
