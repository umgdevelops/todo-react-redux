import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from 'react-redux';
import {updateStoreStateTodos}from '../actions/updateStoreStateTodos';
import {deleteTodo}from '../actions/deleteTodo';
import {changeTodo}from '../actions/changeTodo';
import {Link} from 'react-router-dom'


class TodosList extends Component {

  render() { 
    return(
      <div>
        { this.createTodoList() }
      </div>
    )
  } // end render

  componentDidMount() {
    console.log("TodosList Mounted!!");
    axios.get('http://localhost:6001/todos/')
    .then(response => {
      console.log(response.data)
      this.props.updateStoreStateTodos(response.data)
    })
    .catch(function (error){
        console.log(error);
    })
    this.createTodoList()
  }

  createTodoList = () => {
    const {receivedTodos} = this.props;
    console.log("PROPS CALLED, ", receivedTodos);
    if(receivedTodos.length){
      const todosList = receivedTodos.map(todo=>{
        return(
          <tr key={todo._id}>
            <td className={todo.completed? "todoCompleted" : ""}>{todo.description}</td>
            <td className={todo.completed? "todoCompleted" : ""}>{todo.priority}</td>
            <td className="text-center form-group">
              <div className="form-check form-check-inline">
                <Link className="font-weight-bold text-dark" to={"/edit/"+todo._id}>Edit</Link>
              </div>
              <div className="form-check form-check-inline">
                <button type="submit" 
                id="completeButton"
                className="btn btn-sm btn-dark" 
                onClick={() => this.completeTodo(todo)}>Completed</button>
              </div>

              <div className="form-check form-check-inline">
                <label className="cb-checkbox">
                  <span className="cb-inner">
                    <i>
                      <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={() => this.toggleCheck(todo)} value={todo.completed}/>
                    </i>
                  </span>
                </label>
              </div>

            </td>
          </tr>
        )
        })
        return (
          <div className="container">
            <table className="table table-striped" style={{ marginTop: 20 }} >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Priority</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {todosList}
              </tbody>
            </table> 
          </div>
        )
    }else{
      return(
        <div> 
          <center>
            <h3>Yayy!! ur all done :)</h3>
            <h4>Keep it up!</h4>
          </center>
        </div>
      )
    }
  }

  toggleCheck = (todo) => {
    const updateThisTodo = {
      description: todo.description,
      priority: todo.priority,
      completed: !todo.completed
    };
    console.log("GOTTEN OBJ",updateThisTodo)
    this.props.changeTodo(todo);
      axios.post("http://localhost:6001/todos/update/"+todo._id, updateThisTodo)
      .then(res=>console.log("completed toggled succ, ",res.data))
      .catch(err=>console.log("toggle failed", err))
    this.props.history.push('/');
  }




  
  completeTodo = (todo) => {
    console.log(todo._id)
    // const url = `http://localhost:6001/todos/`;
    const id = todo._id
    
    axios.delete('http://localhost:6001/todos/'+id)
     .then(res=>{
       console.log(res);
       console.log("DELETED!!: ",res.data);
     })
     .catch(err=>{
       console.log("error in deleting :",err)
     })

    this.props.deleteTodo(todo);
    // this.props.history.push('/');
  }
} // end component

const mapDispatchToProps = (dispatch) => {
  return{
    updateStoreStateTodos : (todos) => { dispatch(updateStoreStateTodos(todos)) },
    deleteTodo : (todo) => { dispatch(deleteTodo(todo)) },
    changeTodo : (todo) => { dispatch(changeTodo(todo)) }
  }
}

const mapStoreStateToProps = (storeState) =>{
  // console.log("Inside TodoList",storeState);
  return{
    receivedTodos : storeState.todos
  }
}

export default connect(mapStoreStateToProps,mapDispatchToProps)(TodosList)