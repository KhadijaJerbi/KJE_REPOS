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

  <div class="h-screen bg-white flex items-center justify-center p-101">
    <div class="w-full max-w-md bg-gray-100 rounded-lg shadow-xl  p-6">
      <h1 class="text-3xl font-bold text-center text-green-400 mb-6">Todo App</h1>
      <div class="flex space-x-2 mb-6">
        <input
          v-model="newTask"
          placeholder="Add a new task"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          @keyup.enter="addTask"
        />
        <button
          @click="addTask"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
        >
          Add Task
        </button>
      </div>
      <ul class="space-y-2">
        <TaskItem
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @delete-task="deleteTask(index)"
          @toggle-task="toggleTask(index)"
        >
          Delete
        </TaskItem>
      </ul>
      <p v-if="tasks.length === 0" class="text-center text-gray-300 mt-6">No tasks yet. Add one above!</p>
    </div>
  </div>
  
</template>

<style scoped>
</style>
