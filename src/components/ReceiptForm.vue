<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="merchant">Merchant *</label>
      <input
        id="merchant"
        v-model="form.merchant"
        type="text"
        required
        placeholder="e.g., Starbucks, Amazon"
      />
    </div>

    <div class="form-group">
      <label for="amount">Amount *</label>
      <input
        id="amount"
        v-model="form.amount"
        type="number"
        step="0.01"
        min="0"
        required
        placeholder="0.00"
      />
    </div>

    <div class="form-group">
      <label for="date">Date *</label>
      <input
        id="date"
        v-model="form.date"
        type="date"
        required
      />
    </div>

    <div class="form-group">
      <label for="category">Category *</label>
      <select id="category" v-model="form.category" required>
        <option value="">Select a category</option>
        <option value="Food & Drink">Food & Drink</option>
        <option value="Shopping">Shopping</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label for="paymentMethod">Payment Method *</label>
      <select id="paymentMethod" v-model="form.paymentMethod" required>
        <option value="">Select payment method</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Debit Card">Debit Card</option>
        <option value="Mobile Payment">Mobile Payment</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        placeholder="Optional notes about this receipt"
      ></textarea>
    </div>

    <div class="modal-actions">
      <button type="button" class="secondary" @click="$emit('cancel')">
        Cancel
      </button>
      <button type="submit">
        {{ receipt ? 'Update' : 'Add' }} Receipt
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  receipt: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  merchant: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  paymentMethod: '',
  description: ''
})

watch(() => props.receipt, (newReceipt) => {
  if (newReceipt) {
    Object.assign(form, newReceipt)
  } else {
    form.merchant = ''
    form.amount = ''
    form.date = new Date().toISOString().split('T')[0]
    form.category = ''
    form.paymentMethod = ''
    form.description = ''
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
