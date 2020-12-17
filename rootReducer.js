
const initState = {
  todos:[
    // {_id:1, description:"task 1", priority:"Low", completed:false},
    // {_id:2, description:"task 2", priority:"Medium", completed:true},
    // {_id:3, description:"task 3", priority:"Low", completed:false}
  ]
}

function rootReducer(storeState = initState, action){
  // console.log("root reducer", action)
  if(action.type==="UPDATE_INIT_STORE"){
    let newTodos = action.todos;
    return{
      ...storeState,
      todos:newTodos
    }
  }  
  else if( action.type==="DELETE_TODO" ){
    let receivedTodo = action.todo
    let tempTodosList = storeState.todos.filter(todo => {
      return receivedTodo._id !== todo._id
    })
    return{
      ...storeState,
      todos : tempTodosList
    }
  }else if( action.type==="CHANGE_TODO_CHECK" ){
    
    let tempTodosList = storeState.todos
    // console.log(storeState,"temptodo",tempTodosList)
    let newTodoIndex = tempTodosList.findIndex(todo => todo._id === action.todo._id)
    
    tempTodosList[newTodoIndex] = {...tempTodosList[newTodoIndex], completed:!action.todo.completed}
    // console.log("the todo to be updated: ",tempTodosList[newTodoIndex])  
    return{
      todos : tempTodosList
    }
  }

  return (storeState)
}

export default rootReducer