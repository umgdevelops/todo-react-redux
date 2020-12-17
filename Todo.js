import React from 'react';
import {Link} from 'react-router-dom';
const Todo = (props) => {  
  const currentTodo = props.todo;
  // console.log(currentTodo); 
  return (
    <tr>
      <td className={currentTodo.completed ? "todoCompleted" : ""} >{currentTodo.description}</td>  
      <td className={currentTodo.completed ? "todoCompleted" : ""} >{currentTodo.priority}</td>  
      <td><Link to={"/edit/"+currentTodo._id}>Edit</Link></td>  
    </tr>
  )
}

export default Todo
