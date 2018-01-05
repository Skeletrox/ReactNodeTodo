import React, { Component } from 'react';
import axios from 'axios';

class PutInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : '',
      result : null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.putValue = this.putValue.bind(this);
  }

  handleChange(event) {
    this.setState({id : event.target.value});
  }

  putValue(event) {
    event.preventDefault();
    //alert('Gonna put ' + this.state.id);
    var putID = this.state.id;
    axios.put('http://localhost:9090/put', {id : putID}).then(res => {
      this.setState({result : res.data.result});
    });
  }

  render() {
    return (
      <div>
        <h3>Enter ID of task to put</h3>
        <form>
          <input type='text' onChange={this.handleChange} /><br />
          <button onClick={this.putValue}>Modify TODO</button>
        </form>
        <p>
          {this.state.result ? <span>{this.state.result}</span> : null}
        </p>
      </div>
    );
  }
}

export default PutInput;
