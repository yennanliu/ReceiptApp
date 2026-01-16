<template>
  <div v-if="receipt">
    <div class="receipt-detail-card">
      <div class="detail-header">
        <h3 class="detail-merchant">{{ receipt.merchant }}</h3>
        <div class="detail-amount">
          ${{ receipt.amount.toFixed(2) }}
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-row">
          <span class="detail-icon">📅</span>
          <div class="detail-content">
            <span class="detail-label">Date</span>
            <span class="detail-value">{{ formatDate(receipt.date) }}</span>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-icon">🏷️</span>
          <div class="detail-content">
            <span class="detail-label">Category</span>
            <span class="detail-value">{{ receipt.category }}</span>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-icon">💳</span>
          <div class="detail-content">
            <span class="detail-label">Payment Method</span>
            <span class="detail-value">{{ receipt.paymentMethod }}</span>
          </div>
        </div>

        <div v-if="receipt.description" class="detail-row detail-description">
          <span class="detail-icon">📝</span>
          <div class="detail-content">
            <span class="detail-label">Description</span>
            <p class="detail-value">{{ receipt.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="danger" @click="handleDelete">
        <span style="margin-right: 6px;">🗑️</span>
        Delete
      </button>
      <button @click="$emit('edit', receipt)">
        <span style="margin-right: 6px;">✏️</span>
        Edit
      </button>
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
