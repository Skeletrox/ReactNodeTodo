import React, { Component } from 'react';
import axios from 'axios';

class PostInput extends Component {
  constructor (props) {
    super(props);
    this.postValue = this.postValue.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.state = {
      id : '',
      name : '',
      result : null,
    };
  }

  postValue(event) {
    event.preventDefault();
    var todoID = this.state.id;
    var todoName = this.state.name;
    axios.post('http://localhost:9090/post', {id : todoID, name : todoName}).then(res => {
      this.setState({result: res.data.result});
    });
  }

  handleIDChange(event) {
    this.setState({id : event.target.value});
  }

  handleNameChange(event) {
    this.setState({name : event.target.value});
  }

  render() {

    return (
      <div>
        <form>
          <label for = 'id'>ID: </label>
          <input type='text' id='id' onChange = {this.handleIDChange}/> <br /><br />
          <label for = 'name'>Name: </label>
          <input type='text' id='name' onChange = {this.handleNameChange}/><br /><br />
          <button onClick={this.postValue}>Add TODO</button>
          </form>
        <p>
          {this.state.result ? <span>{this.state.result}</span> : null}
        </p>
      </div>
    );
  }
}

export default PostInput;
