<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button @click="$emit('close')" style="padding: 5px 10px">✕</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
</script>
