export const updateStoreStateTodos = (todos) => {
  return{
    type : "UPDATE_INIT_STORE",
    todos : todos
  }
}