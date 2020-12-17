import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from './components/AddTodo';
import TodosList from './components/TodosList';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
        <div id="mainBody" className="container">
          <center>
            <h3>Your daily planner</h3>
            <i>If you don't know where you are going, you'll end up someplace else.</i>
          </center>
          
          <hr></hr>
          <Switch>
            <Route exact path="/" component={TodosList}></Route>
            <Route path="/add" component={AddTodo}></Route>
            <Route path="/edit/:id" component={EditTodo}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
