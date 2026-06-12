import { reactive } from 'vue'

export const products = reactive([
  { id: 'PROD-001', name: 'カーボンペン', price: 1200 },
  { id: 'PROD-002', name: '上質ノート', price: 850 },
  { id: 'PROD-003', name: '消しゴム', price: 200 },
  { id: 'PROD-004', name: 'カラーマーカーセット', price: 1500 },
])

export const purchaseItems = reactive([
  { purchaseId: 'P-10021', productId: 'PROD-001', quantity: 10 },
  { purchaseId: 'P-10021', productId: 'PROD-003', quantity: 2 },
  { purchaseId: 'P-10022', productId: 'PROD-002', quantity: 10 },
  { purchaseId: 'P-10023', productId: 'PROD-001', quantity: 5 },
  { purchaseId: 'P-10023', productId: 'PROD-004', quantity: 10 },
  { purchaseId: 'P-10023', productId: 'PROD-003', quantity: 1 },
  { purchaseId: 'P-10024', productId: 'PROD-001', quantity: 4 },
  { purchaseId: 'P-10024', productId: 'PROD-002', quantity: 1 },
])

export const purchases = reactive([
  { id: 'P-10021', date: '2026/05/20', total: 12400 },
  { id: 'P-10022', date: '2026/05/21', total: 8500 },
  { id: 'P-10023', date: '2026/05/22', total: 21200 },
  { id: 'P-10024', date: '2026/05/23', total: 5650 },
])

export const inventories = reactive([
  { id: 'INV-2024', year: 2024, date: '2024/12/31', total: 60500 },
  { id: 'INV-2025', year: 2025, date: '2025/12/31', total: 54000 },
])

export const inventoryItems = reactive([
  // INV-2024
  { inventoryId: 'INV-2024', productId: 'PROD-001', quantity: 20 },
  { inventoryId: 'INV-2024', productId: 'PROD-002', quantity: 15 },
  { inventoryId: 'INV-2024', productId: 'PROD-003', quantity: 80 },
  { inventoryId: 'INV-2024', productId: 'PROD-004', quantity: 5 },
  
  // INV-2025
  { inventoryId: 'INV-2025', productId: 'PROD-001', quantity: 15 },
  { inventoryId: 'INV-2025', productId: 'PROD-002', quantity: 10 },
  { inventoryId: 'INV-2025', productId: 'PROD-003', quantity: 50 },
  { inventoryId: 'INV-2025', productId: 'PROD-004', quantity: 10 },
])

export function getPurchaseDetails(purchaseId) {
  const purchase = purchases.find(p => p.id === purchaseId)
  if (!purchase) return null

  const items = purchaseItems
    .filter(pi => pi.purchaseId === purchaseId)
    .map(pi => {
      const product = products.find(p => p.id === pi.productId)
      return {
        ...pi,
        product,
        subtotal: product.price * pi.quantity
      }
    })

  return { ...purchase, items }
}

export function getProductDetails(productId) {
  const product = products.find(p => p.id === productId)
  if (!product) return null

  const history = purchaseItems
    .filter(pi => pi.productId === productId)
    .map(pi => {
      const purchase = purchases.find(p => p.id === pi.purchaseId)
      return {
        ...pi,
        purchase
      }
    })
    // Sort by date descending
    .sort((a, b) => new Date(b.purchase.date) - new Date(a.purchase.date))

  const inventoryHistory = inventoryItems
    .filter(ii => ii.productId === productId)
    .map(ii => {
      const inventory = inventories.find(inv => inv.id === ii.inventoryId)
      return {
        ...ii,
        inventory
      }
    })
    // Sort by date descending
    .sort((a, b) => new Date(b.inventory.date) - new Date(a.inventory.date))

  return { ...product, history, inventoryHistory }
}

export function formatPrice(value) {
  return new Intl.NumberFormat('ja-JP').format(value)
}

export function addPurchase(date, items) {
  // Generate a new ID based on the highest existing ID
  let nextId = 10025
  if (purchases.length > 0) {
    const ids = purchases.map(p => parseInt(p.id.split('-')[1], 10))
    nextId = Math.max(...ids) + 1
  }
  const id = `P-${nextId}`

  let total = 0
  items.forEach(item => {
    const product = products.find(p => p.id === item.productId)
    if (product) {
      total += product.price * item.quantity
      purchaseItems.push({
        purchaseId: id,
        productId: item.productId,
        quantity: item.quantity
      })
    }
  })

  purchases.push({
    id,
    date,
    total
  })
  
  // Return the newly created ID to allow redirecting
  return id
}

export function addProduct(name, price) {
  let nextId = 1
  if (products.length > 0) {
    const ids = products.map(p => parseInt(p.id.split('-')[1], 10))
    nextId = Math.max(...ids) + 1
  }
  const id = `PROD-${String(nextId).padStart(3, '0')}`

  products.push({
    id,
    name,
    price
  })
  
  return id
}

export function getInventoryDetails(inventoryId) {
  const inventory = inventories.find(inv => inv.id === inventoryId)
  if (!inventory) return null

  const items = inventoryItems
    .filter(ii => ii.inventoryId === inventoryId)
    .map(ii => {
      const product = products.find(p => p.id === ii.productId)
      return {
        ...ii,
        product,
        subtotal: product.price * ii.quantity
      }
    })

  return { ...inventory, items }
}

export function getReports() {
  const years = new Set()
  purchases.forEach(p => {
    years.add(new Date(p.date).getFullYear())
  })
  inventories.forEach(i => {
    years.add(i.year)
  })

  return Array.from(years).sort().map(year => {
    return getReportDetails(year)
  })
}

export function getReportDetails(year) {
  const previousInventory = inventories.find(i => i.year === year - 1)
  const previousInventoryTotal = previousInventory ? previousInventory.total : 0

  const currentPurchases = purchases.filter(p => new Date(p.date).getFullYear() === year)
  const purchasesTotal = currentPurchases.reduce((sum, p) => sum + p.total, 0)

  const currentInventory = inventories.find(i => i.year === year)
  const currentInventoryTotal = currentInventory ? currentInventory.total : 0

  const cogs = previousInventoryTotal + purchasesTotal - currentInventoryTotal

  return {
    year,
    previousInventoryTotal,
    purchasesTotal,
    currentInventoryTotal,
    cogs
  }
}
