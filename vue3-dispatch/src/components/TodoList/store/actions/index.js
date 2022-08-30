import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  INIT_TODOLIST
} from '../actionType';

import {
  addTodo,
  toggleTodo,
  removeTodo,
  initTodoList,
  addCount,
  removeCount
} from './tasks';

import { todoService } from '@/services';
import { asyncTaskCreator } from '@/shared/utils';

const initTodoListTask = asyncTaskCreator(todoService['getTodoList'],[
  initTodoList
])

const addTodoTask = asyncTaskCreator(todoService['addTodo'], [
  addTodo,
  addCount
])

const toggleTodoTask = asyncTaskCreator(todoService['toggleTodo'], [
  toggleTodo
])

const removeTodoTask = asyncTaskCreator(todoService['removeTodo'], [
  removeTodo,
  removeCount
])

// const addTodoMap = new Map();
// const toggleTodoMap = new Map();
// const removeTodoMap = new Map();
// const initTodoListMap = new Map();

// & 使用 map 结构 -> 键 执行异步任务
// & 值采用数组， 将异步任务执行的返回值传入 -> 执行同步任务
// initTodoListMap.set(todoServices['getTodoList'], [
//   initTodoList
// ]);

// addTodoMap.set(todoServices['addTodo'], [
//   addTodo,
//   addCount
// ]);

// toggleTodoMap.set(todoServicesp['toggleTodo'], [
//   toggleTodo
// ]);

// removeTodoMap.set(todoServices['removeTodo'], [
//   removeTodo,
//   removeCount
// ]);

export default {
  [ADD_TODO]: [
    addTodoTask
  ],
  [TOGGLE_TODO]: [
    toggleTodoTask
  ],
  [REMOVE_TODO]: [
    removeTodoTask
  ],
  [INIT_TODOLIST]: [
    initTodoListTask
  ]
}