<script setup>
  import ListItem from './ListItem.vue';

  const props = defineProps({
    todoList: {
      type: Array,
      default: () => []
    },
    addCount: {
      type: Number,
      default: 0
    },
    removeCount: {
      type: Number,
      default: 0
    }
  })
</script>

<template>
  <div>
    <p>
      <span>已添加过{{ addCount }}条</span>/
      <span>已删除过{{ removeCount }}条</span>
    </p>
    <ul>
      <list-item 
        v-for="todo of todoList"
        :key="todo.id"
        :data="todo"
      ></list-item>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

</style>