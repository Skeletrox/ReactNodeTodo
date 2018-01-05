"use strict";

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fs = require('fs');

var fileName = 'todo.json';
var app = express();
var done = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

//Returns the Access-Control-Allow-Headers for the specified Origins and Methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

//Promise-based function for reading from a file, so that asynchronous execution does not end up with required data having garbage values
function readFromFile(fileName) {
  var promise = new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        console.log("Error in reading file!");
        reject(Error("Cannot read from file!"));
      }
      var returnData = null;
      try {
        returnData = JSON.parse(data)['todo'];
      }
      catch (err) {
        returnData = new Array();
      }
      resolve(returnData);
    });
  });
  return promise;
}

//Sorts data and writes to file
function writeToFile(writeData, fileName) {
  writeData = writeData.sort(function(a, b) {return Object.keys(a) - Object.keys(b)});
  var stringedData = JSON.stringify({'todo' : writeData});
  var result = true;
  fs.writeFile(fileName, stringedData, function (err) {
    if (err) {
      console.log(err);
      result = false;
    }
  });
  return result;
}

//Identifies dictionary in a list of dictionaries by using the key
function listContainsDict(list, key) {
  for (var i in list) {
    var now = list[i];
    if (now[key] != null) {
      return i;
    }
  }
  return -1;
}

//The DELETE Handler
app.delete('/delete', function (req, res) {
  var id = req.body['id'];
  var resultText = "Deleted task!";
  var promise = readFromFile(fileName);
  promise.then(function (result) {
    var todos = result;
    var keyLocation = listContainsDict(todos, id);
    if (keyLocation != -1) {
      todos.splice(keyLocation, 1);
      done = writeToFile(todos, fileName);
      if (!done) {
        resultText = "Error writing to file!";
      }
    }
    else {
      resultText = "No task exists with the specified ID";
    }
    var jsonResponse= {'result':resultText};
    jsonResponse= JSON.stringify(jsonResponse);
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.write(jsonResponse);
    res.end('');
  }, function (err) {
    res.writeHead(500, {'Content-Type' : 'application/json'});
    res.write({'error' : 'Unable to read file!'});
    res.end('');
  });

});

//The PUT handler
app.put('/put', function (req, res) {
  var id = req.body['id'];
  var resultText = "Successfully toggled finished status";
  var promise = readFromFile(fileName);
  promise.then(function (result) {
    var todos = result;
    var keyLocation = listContainsDict(todos, id);
    if (keyLocation == -1) {
      resultText = "No task exists with given ID";
    }
    else {
      var task = todos[keyLocation];
      task[id]['done'] = !(task[id]['done']);
    }

    done = writeToFile(todos, fileName);
    if (!done) {
      resultText = "Error writing to file!";
    }
    var jsonResponse= {'result':resultText};
    jsonResponse= JSON.stringify(jsonResponse);
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.write(jsonResponse);
    res.end('');
  }, function (err) {
    res.writeHead(500, {'Content-Type' : 'application/json'});
    res.write({'error' : 'Unable to read file!'});
    res.end('');
  });
});

//The GET Handler
app.get('/get', function (req, res) {
  var promise = readFromFile(fileName);
  promise.then(function (result) {
    var todos = result;
    var jsonResponse = {'todos' : todos};
    jsonResponse = JSON.stringify(jsonResponse);
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.write(jsonResponse);
    res.end('');
  }, function (err) {
    res.writeHead(500, {'Content-Type' : 'application/json'});
    res.write({'error' : 'Unable to read file!'});
    res.end('');
  });
});

//The POST handler
app.post('/post', function (req, res) {
  var todoID = req.body['id'];
  var todoName = req.body['name'];

  //ID validator, modify idRegExp for custom behavior
  var idRegExp = /^[0-9]{4}$/;

  if (todoID.search(idRegExp) == -1) {
    res.writeHead(201, {'Content-Type' : 'application/json'});
    var jsonResponse = {'result':'Illegal ID Format!'};
    jsonResponse = JSON.stringify(jsonResponse);
    res.write(jsonResponse);
    res.end('');
    return;
  }
  var todoDone = false;
  var resultText = "Successfully wrote to file!";
  var promise = readFromFile(fileName);
  promise.then(function (result) {
    var todos = result;
    if (todos == null) {
      console.log("Fresh Start");
      todos = new Array();
    }
    var keyLocation = listContainsDict(todos, todoID);
    if(keyLocation != -1) {
      resultText = "Same ID already exists!";
    }
    else {
      todos.push({[todoID] : {'name' : todoName, 'done' : false}});
      var done = writeToFile(todos, fileName);
      if (!(done)) {
        resultText = "Error writing to file!";
      }
    }
    res.writeHead(201, {'Content-Type' : 'application/json'});
    var jsonResponse = {'result': resultText};
    jsonResponse = JSON.stringify(jsonResponse);
    res.write(jsonResponse);
    res.end('');
  }, function (err) {
    res.writeHead(201, {'Content-Type' : 'application/json'});
    var jsonResponse = {'result': 'Error in reading file'};
    jsonResponse = json.stringify(jsonResponse);
    res.write(jsonResponse);
    res.end('');
  });
});

//Starts the server
app.listen(9090, function(err, data) {
  if (err) {
    console.log('Error ' + err);
  }
  else {
    console.log('Server is running successfully');
  }
});
