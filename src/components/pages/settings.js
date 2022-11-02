import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";




export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      list2: [],
    };


  }


  // notes on hooks same as todo page


  componentDidMount() {
    this.hydrateStateWithLocalStorage();



    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }



  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }
  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {

          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {

    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  render() {
    return (
      <div className='page-wrapper-settings'>
        <div id='settings-text'>
        <h1>Example Settings page</h1>
        </div>
      <div id='space'></div>

      </div>

    );
  }
}


