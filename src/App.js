import React, { Component } from "react";
import "./App.css";
import Nav from "./Nav";
import Axios from "axios";

var moment = require('moment');
require("moment/locale/fr");
moment.locale("fr");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

    componentDidMount = () => {
      Axios.get("https://127.0.0.1:8000/api/articles").then((res) =>
      this.setState({
        articles: res.data,
      })
    );
  };

  render = () => {
    return (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col p-2 titles">
              <h1>News Feed</h1>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col-6">
              {this.state.articles.map((article) => (
                <div
                  className="row d-flex justify-content-center mb-4"
                  key={article.id}
                >
                  <div className="card w-100">
                    <div className="card-body">
                      <h5 className="card-title titles">{article.title}</h5>
                      <a href={article.url}>
                        <img
                          className="card-img-top"
                          src="https://fakeimg.pl/250x100/"
                          alt="Card image cap"
                        />
                      </a>
                      <p className="card-text">{article.description}</p>
                      <a href={article.url} className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        {moment(article.date).format("LLLL")}
                      </small>
                      <span class="badge badge-pill badge-primary">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col"></div>
          </div>
        </div>
      </>
    );
  };
}



export default App;
