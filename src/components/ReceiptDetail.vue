<template>
  <div v-if="receipt">
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3>{{ receipt.merchant }}</h3>
        <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">
          ${{ receipt.amount.toFixed(2) }}
        </div>
      </div>

      <div style="display: grid; gap: 10px;">
        <div><strong>Date:</strong> {{ formatDate(receipt.date) }}</div>
        <div><strong>Category:</strong> {{ receipt.category }}</div>
        <div><strong>Payment Method:</strong> {{ receipt.paymentMethod }}</div>
        <div v-if="receipt.description">
          <strong>Description:</strong><br/>
          <p style="margin-top: 5px; color: #666;">{{ receipt.description }}</p>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="danger" @click="handleDelete">Delete</button>
      <button @click="$emit('edit', receipt)">Edit</button>
      <button class="secondary" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  receipt: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit', 'close'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleDelete = () => {
  if (confirm(`Are you sure you want to delete the receipt for ${props.receipt.merchant}?`)) {
    emit('delete', props.receipt.id)
  }
}
</script>
