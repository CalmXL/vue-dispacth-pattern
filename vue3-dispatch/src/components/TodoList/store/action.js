import { todoService } from "@/services";

/**
 * addTodoMap -> todoServices['addTodo']: [
 *    add_todo,
 *    addCount
 * ]
 * 
 * ADD_TODO: [
 *   todoServices ['addTodo']: [
 *      addTodo,
 *      addCount
 *   ]
 * ] 
 * 
 * 任务分配机制 -> 
 * 通过任务类型进行任何的任何分配，
 * 任务执行器 -> 完成分配好的任务集合
 */
export default function (state) {
  const onAddTodo = (todo) => {
    todoService.addTodo(todo).then(res => {
      state.todoList.push(todo);
      addCount();
    });
  }

  const onToggleTodo = (id) => {
    todoService.toggleTodo(id).then((res) => {
      state.todoList = state.todoList.map(item => {
        item.id === id && (item.completed = !item.completed);
        return item;
      })
    })
  }

  const onRemoveTodo = (id) => {
    todoService.removeTodo(id).then((res) => {
      state.todoList = state.todoList.filter(item => item.id !== id);
      removeCount();
    })
  }

  const initTodoList = () => {
    todoService.getTodoList().then(res => {
      const todoList = res.data.data;
      state.todoList = todoList;
    });
  }

  function addCount () {
    state.addCount ++;
  }

  function removeCount () {
    state.removeCount ++;
  }

  return {
    onAddTodo,
    onToggleTodo,
    onRemoveTodo,
    initTodoList
  }
}