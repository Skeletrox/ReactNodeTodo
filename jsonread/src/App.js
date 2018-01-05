import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTable from './TodoTable.js';
import PostInput from './PostInput.js';
import PutInput from './PutInput.js';
import DeleteInput from './DeleteInput.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //The below boolean state variables indicate if any component is visible or not
      showTodoTable : false,
      showPostInput : false,
      showPutInput : false,
      showDeleteInput : false,
    };
    //Defining methods for modifying the boolean state variables
    this.getTodos = this.getTodos.bind(this);
    this.showPostForm = this.showPostForm.bind(this);
    this.showPutForm = this.showPutForm.bind(this);
    this.showDeleteForm = this.showDeleteForm.bind(this);
  }

  //the following methods toggle the display of the components
  getTodos() {
    this.setState({showTodoTable: !(this.state.showTodoTable)});
  }

  showPostForm() {
    this.setState({showPostInput: !(this.state.showPostInput)});
  }

  showPutForm() {
    this.setState({showPutInput: !(this.state.showPutInput)});
  }

  showDeleteForm() {
    this.setState({showDeleteInput : !(this.state.showDeleteInput)});
  }

  render() {
    /*
    * The return method returns the buttons for each component as well as the corresponding
    * component, provided the boolean value for it is true.
    */
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello, Friend.</h1>
        </header>
        <div>
          <button onClick={this.getTodos}>GET TODOS</button>
            {this.state.showTodoTable? <TodoTable /> : null} <br /><hr />
          <button onClick={this.showPostForm}>SHOW POST FORM</button>
            {this.state.showPostInput? <PostInput /> : null} <br /><hr />
          <button onClick={this.showPutForm}>SHOW PUT FORM</button>
            {this.state.showPutInput? <PutInput /> : null} <br /><hr />
          <button onClick={this.showDeleteForm}>SHOW DELETE FORM</button>
            {this.state.showDeleteInput? <DeleteInput /> : null}<br /><hr />
        </div>
      </div>
    );
  }
}

export default App;
