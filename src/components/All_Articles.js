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
    article: {},
    selectedSort: "",
    sort_by: ""
  };
  render() {
    console.log(this.props.username);
    const { article, articles, sideBarView, sort_by } = this.state;
    console.log("sort|_by", sort_by);
    return (
      <>
        <section className="MainLeft">
          <select name="sort_by" id="sort_by" onChange={this.handleChange}>
            <option value="title" key="title">
              title
            </option>
            <option value="created_at" key="created_at">
              date
            </option>
            <option value="comment_count" key="comment_count">
              comment count
            </option>
            <option value="votes" key="votes">
              votes
            </option>
          </select>
          <button
            onClick={() => {
              this.props.navigate("/postArticle");
            }}
          >
            Post an article!
          </button>
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { sort_by } = this.state;
    console.log("getting new artickes");
    api
      .getArticles(sort_by)
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

  handleSelect = chosen => {
    console.log(chosen);
    this.setState({ selectedSort: chosen });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClick = article_id => {
    api
      .deleteArticleById(article_id)
      .then(data => {
        console.log(data, "inside .then");
        const newArticles = this.state.articles.filter(
          article => article.article_id !== article_id
        );
        console.log("newArticles", newArticles);
        this.setState({ articles: newArticles });
      })
      .catch(err => console.dir(err, "inside catch"));

    //set state so it rerenders but don't know if this is necessary?
  };
}

export default AllArticles;
