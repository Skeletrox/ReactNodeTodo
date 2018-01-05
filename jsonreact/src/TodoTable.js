import React, { Component } from 'react';
import axios from 'axios';


class TodoTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoTable : '',
    };
  }

//All the data is populated the moment the element is loaded
  componentDidMount() {
    var table = [];
    axios.get('http://localhost:9090/get').then(res => {
      const todos = res.data.todos;
      for (var i in todos) {
        var parsed = todos[i];
        var currentID = Object.keys(parsed)[0];
        var currentName = parsed[currentID]['name'];
        var currentDone = parsed[currentID]['done'];
        var row = <tr><td>{currentID}</td><td>{currentName}</td><td><input type='checkbox' checked={currentDone}></input></td></tr>;
        table.push(row);
      }
      this.setState({todoTable: <tbody>{table}</tbody>});
    });
  }

  render() {

    return (
      <div align='center'>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Done?</th>
          </tr>
        </thead>
        {this.state.todoTable}
      </table>
    </div>
    );
  }
}

export default TodoTable;
