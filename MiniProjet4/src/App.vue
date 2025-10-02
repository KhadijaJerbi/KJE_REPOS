<script setup>
import { ref, onMounted } from 'vue'
import TaskItem from './components/TaskItem.vue'

onMounted(() => console.log('Todo App loaded'))

const tasks = ref([])
const newTask = ref('')

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value.trim(), done: false })
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}

const toggleTask = (index) => {
  tasks.value[index].done = !tasks.value[index].done
}
</script>

<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTask" placeholder="Add a new task" />
    <button @click="addTask">Add Task</button>
    <ul>
      <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @delete-task="deleteTask(index)" @toggle-task="toggleTask(index)">Delete</TaskItem>
    </ul>
  </div>
</template>

<style scoped>
</style>
