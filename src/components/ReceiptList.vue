<template>
  <div>
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">{{ receipts.length }}</div>
        <div class="stat-label">Total Receipts</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${{ totalAmount.toFixed(2) }}</div>
        <div class="stat-label">Total Amount</div>
      </div>
    </div>

    <div class="actions-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search receipts..."
        style="max-width: 300px"
      />
      <button @click="$emit('add-receipt')">+ Add Receipt</button>
    </div>

    <div v-if="filteredReceipts.length === 0" class="empty-state">
      <div class="empty-state-icon">📝</div>
      <h3>No receipts found</h3>
      <p>{{ searchQuery ? 'Try a different search term' : 'Add your first receipt to get started' }}</p>
    </div>

    <div v-else>
      <div
        v-for="receipt in filteredReceipts"
        :key="receipt.id"
        class="receipt-card"
        @click="$emit('view-receipt', receipt)"
      >
        <div class="receipt-header">
          <div class="receipt-title">{{ receipt.merchant }}</div>
          <div class="receipt-amount">${{ receipt.amount.toFixed(2) }}</div>
        </div>
        <div class="receipt-meta">
          <span>📅 {{ formatDate(receipt.date) }}</span>
          <span>🏷️ {{ receipt.category }}</span>
          <span>💳 {{ receipt.paymentMethod }}</span>
        </div>
        <div v-if="receipt.description" style="margin-top: 10px; color: #666;">
          {{ receipt.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { receiptStore } from '../stores/receiptStore'

const searchQuery = ref('')

const receipts = computed(() => receiptStore.getAllReceipts())

const filteredReceipts = computed(() => {
  if (!searchQuery.value) {
    return receipts.value
  }
  return receiptStore.searchReceipts(searchQuery.value)
})

const totalAmount = computed(() => receiptStore.getTotalAmount())

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

defineEmits(['add-receipt', 'view-receipt'])
</script>
