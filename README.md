# Receipt App

A simple and elegant Vue 3 web application for managing receipts with in-memory storage.

## Features

- ✨ Create, read, update, and delete receipts
- 🔍 Search receipts by merchant, description, or category
- 📊 View total receipts count and total amount
- 💳 Track payment methods and categories
- 📱 Responsive and modern UI
- 💾 In-memory data storage (no database required)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
receipt-app/
├── src/
│   ├── assets/
│   │   └── style.css          # Global styles
│   ├── components/
│   │   ├── ReceiptList.vue    # Display list of receipts with search
│   │   ├── ReceiptForm.vue    # Form for adding/editing receipts
│   │   ├── ReceiptModal.vue   # Modal wrapper component
│   │   └── ReceiptDetail.vue  # Receipt detail view
│   ├── stores/
│   │   └── receiptStore.js    # In-memory data store
│   ├── App.vue                # Main application component
│   └── main.js                # Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## API Documentation

### Receipt Store API

The `receiptStore` provides the following methods for managing receipts in memory:

#### Data Model

Each receipt has the following structure:

```javascript
{
  id: Number,              // Auto-generated unique identifier
  merchant: String,        // Name of the merchant (required)
  amount: Number,          // Receipt amount (required)
  date: String,            // Date in YYYY-MM-DD format (required)
  category: String,        // Category of expense (required)
  paymentMethod: String,   // Payment method used (required)
  description: String      // Optional description/notes
}
```

#### Available Methods

##### `getAllReceipts()`
Returns all receipts in the store.

**Returns:** `Array<Receipt>` - Array of receipt objects

**Example:**
```javascript
import { receiptStore } from './stores/receiptStore'

const receipts = receiptStore.getAllReceipts()
```

---

##### `getReceiptById(id)`
Retrieves a specific receipt by its ID.

**Parameters:**
- `id` (Number) - The receipt ID

**Returns:** `Receipt | undefined` - The receipt object or undefined if not found

**Example:**
```javascript
const receipt = receiptStore.getReceiptById(1)
```

---

##### `addReceipt(receipt)`
Adds a new receipt to the store.

**Parameters:**
- `receipt` (Object) - Receipt data without ID (ID is auto-generated)

**Returns:** `Receipt` - The newly created receipt with generated ID

**Example:**
```javascript
const newReceipt = receiptStore.addReceipt({
  merchant: 'Starbucks',
  amount: 12.50,
  date: '2026-01-15',
  category: 'Food & Drink',
  paymentMethod: 'Credit Card',
  description: 'Morning coffee'
})
```

---

##### `updateReceipt(id, updatedReceipt)`
Updates an existing receipt.

**Parameters:**
- `id` (Number) - The receipt ID to update
- `updatedReceipt` (Object) - Updated receipt data

**Returns:** `Receipt | null` - The updated receipt or null if not found

**Example:**
```javascript
const updated = receiptStore.updateReceipt(1, {
  merchant: 'Starbucks',
  amount: 15.75,
  date: '2026-01-15',
  category: 'Food & Drink',
  paymentMethod: 'Credit Card',
  description: 'Coffee and lunch'
})
```

---

##### `deleteReceipt(id)`
Deletes a receipt from the store.

**Parameters:**
- `id` (Number) - The receipt ID to delete

**Returns:** `Boolean` - true if deleted successfully, false if not found

**Example:**
```javascript
const deleted = receiptStore.deleteReceipt(1)
```

---

##### `getTotalAmount()`
Calculates the total amount of all receipts.

**Returns:** `Number` - Sum of all receipt amounts

**Example:**
```javascript
const total = receiptStore.getTotalAmount()
// Returns: 127.49
```

---

##### `getReceiptsByCategory()`
Groups receipts by category.

**Returns:** `Object` - Object with category names as keys and arrays of receipts as values

**Example:**
```javascript
const byCategory = receiptStore.getReceiptsByCategory()
// Returns: {
//   'Food & Drink': [receipt1, receipt2],
//   'Shopping': [receipt3],
//   'Transportation': [receipt4]
// }
```

---

##### `searchReceipts(query)`
Searches receipts by merchant, description, or category.

**Parameters:**
- `query` (String) - Search term (case-insensitive)

**Returns:** `Array<Receipt>` - Array of matching receipts

**Example:**
```javascript
const results = receiptStore.searchReceipts('coffee')
// Returns all receipts containing "coffee" in merchant, description, or category
```

---

### Categories

The following categories are available:
- Food & Drink
- Shopping
- Transportation
- Entertainment
- Healthcare
- Utilities
- Other

### Payment Methods

The following payment methods are supported:
- Cash
- Credit Card
- Debit Card
- Mobile Payment
- Other

## Component API

### ReceiptList

**Events:**
- `@add-receipt` - Emitted when the "Add Receipt" button is clicked
- `@view-receipt` - Emitted when a receipt card is clicked, passes the receipt object

**Features:**
- Displays receipt statistics (count and total amount)
- Search functionality
- Responsive grid layout
- Empty state when no receipts found

---

### ReceiptForm

**Props:**
- `receipt` (Object, optional) - Receipt to edit. If null, form is in "add" mode

**Events:**
- `@submit` - Emitted when form is submitted, passes the form data
- `@cancel` - Emitted when cancel button is clicked

---

### ReceiptModal

**Props:**
- `show` (Boolean) - Controls modal visibility
- `title` (String) - Modal title

**Events:**
- `@close` - Emitted when modal should be closed

---

### ReceiptDetail

**Props:**
- `receipt` (Object, required) - Receipt to display

**Events:**
- `@edit` - Emitted when edit button is clicked, passes the receipt
- `@delete` - Emitted when delete is confirmed, passes the receipt ID
- `@close` - Emitted when close button is clicked

---

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Composition API** - Modern Vue component authoring
- **Reactive Store** - Vue's reactive system for state management

## Notes

- Data is stored in memory and will be lost on page refresh
- No backend or database required
- Perfect for demo and testing purposes
- Can be easily extended to use localStorage or a real backend API

## License

MIT

---

Built with ❤️ using Vue 3 and Claude Code
