# JSON Read and Write using React and NodeJS

## Goal

Read and write to a JSON file using an React Frontend and a NodeJS Backend

## Cloning and Pre-Execution

1. Clone this repository using
```bash
git clone https://github.com/Skeletrox/ReactNodeTodo.git
```

2. Ensure that NodeJS and NPM are installed in your machine. Run
```bash
node -v
```
  and

```bash
npm -v
```
  to ensure installation. This project uses NodeJS 8.9.4 and npm 5.6.0

## Execution

Run the following commands in separate terminals for execution

### NodeJS Server
```bash
cd ReactNodeTodo/JSONRead
node index.js
```

### ReactJS Frontend
```bash
cd ReactNodeTodo/jsonreact
npm install
npm start
```

## Workflow

The NodeJS server uses a todo.json file local to index.js in order to read and write TODOs. The todos are of the form
```
  TODO_ID : {
    name : TODO_NAME,
    done : TODO_DONE [True or False]
  }
```

Here, ```TODO_ID``` is a four-character numeric value [eg. ```0001``` and ```0002```]. The server validates the ```POST``` that handles this for the ID over a regular expression.

All responses are of type ```application/json``` and are parsed by the ReactJS frontend.

### Requests

#### GET

Returns all the TODOs in the file

#### POST

Attempts to write a TODO specified by its ID and name to a file

#### PUT

Toggles the ```done``` status of a TODO specified by its ID

#### DELETE

Deletes a TODO specified by its ID

## Testing

The project has passed the following test cases: 

* GET from empty file
* POST to empty file
* PUT to empty file
* DELETE from empty file
* POST garbage ID
* POST duplicate ID
* PUT non-existent ID
* DELETE non-existent ID
