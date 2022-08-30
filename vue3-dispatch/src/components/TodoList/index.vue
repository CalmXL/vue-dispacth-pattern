<script setup>
  import FormComp from './Form.vue';
  import ListComp from './List.vue';
  import { onMounted, provide } from 'vue';

  import {
    todoReducer,
    ADD_TODO,
    TOGGLE_TODO,
    REMOVE_TODO,
    INIT_TODOLIST
  } from './store';

  const {
    todoList,
    addCount,
    removeCount,
    todoDispatch
  } = todoReducer();

  provide('todoHandlers', {
    toggleTodo: todoDispatch(TOGGLE_TODO),
    removeTodo: todoDispatch(REMOVE_TODO)
  })

  const addTodo = todoDispatch(ADD_TODO);
  const initTodoList = todoDispatch(INIT_TODOLIST);

  onMounted(() => {
    initTodoList();
  })

</script>

<template>
  <div>
    <form-comp @add-todo="addTodo"></form-comp>
    <list-comp
      :todo-list="todoList"
      :add-count="addCount"
      :remove-count="removeCount"
    ></list-comp>
  </div>
</template>

<style lang="scss" scoped>

</style>