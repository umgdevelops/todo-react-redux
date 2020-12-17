export const deleteTodo = (todo) => {
  console.log("received todo to be deleted",todo)
  return {
    type : "DELETE_TODO",
    todo : todo
  }
}