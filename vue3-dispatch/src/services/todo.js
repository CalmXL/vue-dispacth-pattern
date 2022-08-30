import axios from '@/shared/http';

// 命名空间
const todoService = {

  getTodoList () {
    return axios('/api/get_todolist');
  },

  addTodo (todo) {
    return axios.post('/api/add_todo', { todo });
  },

  toggleTodo (id) {
    return axios.post('/api/toggle_todo', { id });
  },

  removeTodo (id) {
    return axios.post('/api/remove_todo', { id });
  }
}

export default todoService;
