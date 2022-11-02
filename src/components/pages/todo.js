import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Draggable from "react-draggable";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      list2: [],
    };


  }

  //incorporating local storage


  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page


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

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {

      // if the key exists in localStorage

      if (localStorage.hasOwnProperty(key)) {

        // get the key's value from localStorage

        let value = localStorage.getItem(key);

        // parse the localStorage string and setState

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {


          // handle empty string


          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state


    for (let key in this.state) {

      // save to localStorage


      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {


    // update react state

    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
    };

    // copy current list of items


    const list = [...this.state.list];

    // add the new item to the list


    list.push(newItem);

    // update state with new list, reset the new item input


    this.setState({
      list,
      newItem: "",
    });
  }

  deleteItem(id) {


    // copy current list of items
    const list = [...this.state.list];
    // filters out the item being deleted


    const updatedList = list.filter((item) => item.id !== id);

    this.setState({ list: updatedList });
  }





  render() {
    return (
      <div className='page-wrapper'>

        <Draggable><li id="sidenote"><h1> Draggable Sticky notes</h1></li></Draggable>

        <div className="todolist">

          <div className='text-title'>
            Add an Item...
          </div>
          <br />
          <div className='input-wrapper'>
            <input
              id='form'
              type="text"
              placeholder="Type item here"
              value={this.state.newItem}

              onChange={(e) => this.updateInput("newItem", e.target.value)}
            />
            <button id="otherbutton"
              type='submit' value='submit'
              className="add-btn btn-floating"
              onClick={() => this.addItem()}
              onSubmit={() => this.addItem()}
              disabled={!this.state.newItem.length}>
              <i id='plus' className="material-icons"> + </i>
            </button>
          </div>
          <div>
            <br id="unique" /> <br id="unique2" />
            <ul id='lister'>
              {this.state.list.map((item) => {
                return (
                  <Draggable key={item.id} id={item.id}>
                    <h1><li key={item.id} id={item.id}>
                      {item.value}
                      <button key="button"
                        className="btn btn-floating" id='button'
                        onClick={() => this.deleteItem(item.id)}
                      >
                        <i id='icon' className="material-icons"><p style={{ display: "flex", direction: 'reverse-row' }}>X </p></i>
                      </button>
                    </li>
                    </h1>
                  </Draggable>
                );
              })}
            </ul>
          </div>
        </div>
      </div>




    );
  }
}


