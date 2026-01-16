import { reactive } from 'vue'

const state = reactive({
  receipts: [
    {
      id: 1,
      merchant: 'Starbucks',
      amount: 12.50,
      date: '2026-01-15',
      category: 'Food & Drink',
      description: 'Coffee and pastry',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      merchant: 'Amazon',
      amount: 89.99,
      date: '2026-01-14',
      category: 'Shopping',
      description: 'Office supplies',
      paymentMethod: 'Debit Card'
    },
    {
      id: 3,
      merchant: 'Uber',
      amount: 25.00,
      date: '2026-01-13',
      category: 'Transportation',
      description: 'Ride to office',
      paymentMethod: 'Credit Card'
    }
  ],
  nextId: 4
})

export const receiptStore = {
  state,

  getAllReceipts() {
    return state.receipts
  },

  getReceiptById(id) {
    return state.receipts.find(receipt => receipt.id === id)
  },

  addReceipt(receipt) {
    const newReceipt = {
      ...receipt,
      id: state.nextId++,
      amount: parseFloat(receipt.amount)
    }
    state.receipts.unshift(newReceipt)
    return newReceipt
  },

  updateReceipt(id, updatedReceipt) {
    const index = state.receipts.findIndex(receipt => receipt.id === id)
    if (index !== -1) {
      state.receipts[index] = {
        ...updatedReceipt,
        id,
        amount: parseFloat(updatedReceipt.amount)
      }
      return state.receipts[index]
    }
    return null
  },

  deleteReceipt(id) {
    const index = state.receipts.findIndex(receipt => receipt.id === id)
    if (index !== -1) {
      state.receipts.splice(index, 1)
      return true
    }
    return false
  },

  getTotalAmount() {
    return state.receipts.reduce((sum, receipt) => sum + receipt.amount, 0)
  },

  getReceiptsByCategory() {
    const categories = {}
    state.receipts.forEach(receipt => {
      if (!categories[receipt.category]) {
        categories[receipt.category] = []
      }
      categories[receipt.category].push(receipt)
    })
    return categories
  },

  searchReceipts(query) {
    const lowerQuery = query.toLowerCase()
    return state.receipts.filter(receipt =>
      receipt.merchant.toLowerCase().includes(lowerQuery) ||
      receipt.description.toLowerCase().includes(lowerQuery) ||
      receipt.category.toLowerCase().includes(lowerQuery)
    )
  }
}
