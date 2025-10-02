<template>
  <li :class="{ completed: task.done }">
    <input type="checkbox" :checked="task.done" @change="$emit('toggle-task')" />
    {{ task.text }}
    <button @click="$emit('delete-task')"><slot></slot></button>
  </li>
</template>

<script setup>
defineProps(['task'])
defineEmits(['delete-task', 'toggle-task'])
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>