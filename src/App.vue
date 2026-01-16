<template>
  <div class="container">
    <h1>📝 Receipt Manager</h1>

    <ReceiptList
      @add-receipt="showAddModal"
      @view-receipt="showDetailModal"
    />

    <ReceiptModal
      :show="isAddModalOpen"
      :title="editingReceipt ? 'Edit Receipt' : 'Add New Receipt'"
      @close="closeAddModal"
    >
      <ReceiptForm
        :receipt="editingReceipt"
        @submit="handleSubmit"
        @cancel="closeAddModal"
      />
    </ReceiptModal>

    <ReceiptModal
      :show="isDetailModalOpen"
      title="Receipt Details"
      @close="closeDetailModal"
    >
      <ReceiptDetail
        v-if="selectedReceipt"
        :receipt="selectedReceipt"
        @edit="handleEdit"
        @delete="handleDelete"
        @close="closeDetailModal"
      />
    </ReceiptModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { receiptStore } from './stores/receiptStore'
import ReceiptList from './components/ReceiptList.vue'
import ReceiptForm from './components/ReceiptForm.vue'
import ReceiptModal from './components/ReceiptModal.vue'
import ReceiptDetail from './components/ReceiptDetail.vue'

const isAddModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const selectedReceipt = ref(null)
const editingReceipt = ref(null)

const showAddModal = () => {
  editingReceipt.value = null
  isAddModalOpen.value = true
}

const closeAddModal = () => {
  isAddModalOpen.value = false
  editingReceipt.value = null
}

const showDetailModal = (receipt) => {
  selectedReceipt.value = receipt
  isDetailModalOpen.value = true
}

const closeDetailModal = () => {
  isDetailModalOpen.value = false
  selectedReceipt.value = null
}

const handleSubmit = (receiptData) => {
  if (editingReceipt.value) {
    receiptStore.updateReceipt(editingReceipt.value.id, receiptData)
  } else {
    receiptStore.addReceipt(receiptData)
  }
  closeAddModal()
}

const handleEdit = (receipt) => {
  editingReceipt.value = receipt
  closeDetailModal()
  isAddModalOpen.value = true
}

const handleDelete = (id) => {
  receiptStore.deleteReceipt(id)
  closeDetailModal()
}
</script>
