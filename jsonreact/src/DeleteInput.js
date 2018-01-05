import React, { Component } from 'react';
import axios from 'axios';

class DeleteInput extends Component {
  constructor(props) {
    super(props);

    //State variables: ID denotes the ID used in the body of the DELETE request, result stores the result sent back from the server
    this.state  = {
      id : '',
      result : null,  //result in DeleteInput, PostInput and PutInput determine the result obtained from the server
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteValue = this.deleteValue.bind(this);
  }

  //Updates ID accordingly as and when the value of ID input is modified
  handleChange(event) {
    this.setState({id : event.target.value});
  }

  //The function call to DELETE in the backend
  deleteValue(event) {
    event.preventDefault();
    var deleteID = this.state.id;
    /*
    * AXIOS request format:
    * axios.<GET|POST|PUSH|DELETE>(request_url, <request_body|request_headers|request_parameters>).then(callback)
    */
    axios.delete('http://localhost:9090/delete',{data : {id : deleteID}}).then(res => {
      this.setState({result : res.data.result}); //Once DELETE is sent, the response is stored in result
    });
  }

  render() {
    //Render the appropriate HTML
    return (
      <div>
        <h3>Enter ID of TODO to delete</h3>
        <form>
          <input type='text' onChange = {this.handleChange}/>
          <button onClick = {this.deleteValue}>Delete TODO </button>
        </form>
        <p>
          {this.state.result ? <span>{this.state.result}</span> : null}
        </p>
      </div>
    );
  }
}

export default DeleteInput;
