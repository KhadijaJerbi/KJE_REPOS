<template>
  <li class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
    <input
      type="checkbox"
      :checked="task.done"
      @change="$emit('toggle-task')"
      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
    <span
      :class="[
        'flex-1 text-gray-800',
        { 'line-through text-gray-500': task.done }
      ]"
    >
      {{ task.text }}
    </span>
    <button
      @click="$emit('delete-task')"
      class="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <slot></slot>
    </button>
  </li>
</template>

<script setup>
defineProps(['task'])
defineEmits(['delete-task', 'toggle-task'])
</script>