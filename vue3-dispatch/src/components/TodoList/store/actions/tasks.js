
// data -> 异步完成返回的数据
export const addTodo = (state, { payload, data }) => {
  state.todoList.push(payload);
}

export const toggleTodo = (state, { payload, data }) => {
  state.todoList = state.todoList.map(item => {
    item.id === payload && (item.completed = !item.completed);
    return item;
  })
}

export const removeTodo = (state, { payload, data }) => {
  state.todoList = state.todoList.filter(item => item.id !== payload);
}

export const initTodoList = (state, { payload, data }) => {
  const todoList = data.data;
  state.todoList = todoList;
}

export const addCount = (state, { payload, data }) => {
  state.addCount ++;
}

export const removeCount = (state, { payload, data }) => {
  state.removeCount ++;
}

