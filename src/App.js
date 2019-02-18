import React, { Component } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Introduction from "./components/Introduction";
import SideBar from "./components/Sidebar";
import Articles from "./components/Articles";
import { Link, Router } from "@reach/router";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header />
        <LogIn />
        <Introduction />
        <SideBar />
        <Router className="main">
          <Articles path="/" />
        </Router>
      </div>
    );
  }
}

export default App;

/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
*/
