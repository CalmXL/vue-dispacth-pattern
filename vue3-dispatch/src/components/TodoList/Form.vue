<script setup>
  import { ref } from 'vue';

  const todoText = ref('');

  const emit = defineEmits(['addTodo']);

  const addTodo = () => {
    if (!todoText.value.length) return;

    emit('addTodo', {
      id: new Date().getTime(),
      content: todoText.value,
      completed: false
    })
  }

</script>

<template>
  <div>
    <input 
      type="text" 
      placeholder="please input someThing..."
      v-model="todoText"
    />&nbsp;
    <button
      @click="addTodo"
    >ADD</button>
  </div>
</template>

<style lang="scss" scoped>

</style>