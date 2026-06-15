import { reactive } from 'vue'
import { calculateCOGS } from '../utils/calculations'
import { generateNextId } from '../utils/idGenerator'

export const products = reactive([
  { id: 'PROD-001', name: 'カーボンペン', price: 1200 },
  { id: 'PROD-002', name: '上質ノート', price: 850 },
  { id: 'PROD-003', name: '消しゴム', price: 200 },
  { id: 'PROD-004', name: 'カラーマーカーセット', price: 1500 },
])

export const purchaseItems = reactive([
  // 2020 Purchases
  { purchaseId: 'P-10001', productId: 'PROD-001', quantity: 8 },
  { purchaseId: 'P-10001', productId: 'PROD-002', quantity: 5 },
  { purchaseId: 'P-10002', productId: 'PROD-003', quantity: 20 },
  { purchaseId: 'P-10002', productId: 'PROD-004', quantity: 4 },

  // 2021 Purchases
  { purchaseId: 'P-10003', productId: 'PROD-001', quantity: 12 },
  { purchaseId: 'P-10003', productId: 'PROD-003', quantity: 15 },
  { purchaseId: 'P-10004', productId: 'PROD-002', quantity: 10 },
  { purchaseId: 'P-10004', productId: 'PROD-004', quantity: 5 },

  // 2022 Purchases
  { purchaseId: 'P-10005', productId: 'PROD-001', quantity: 10 },
  { purchaseId: 'P-10005', productId: 'PROD-002', quantity: 12 },
  { purchaseId: 'P-10006', productId: 'PROD-003', quantity: 30 },
  { purchaseId: 'P-10006', productId: 'PROD-004', quantity: 8 },

  // 2023 Purchases
  { purchaseId: 'P-10007', productId: 'PROD-001', quantity: 15 },
  { purchaseId: 'P-10007', productId: 'PROD-002', quantity: 15 },
  { purchaseId: 'P-10008', productId: 'PROD-003', quantity: 25 },
  { purchaseId: 'P-10008', productId: 'PROD-004', quantity: 10 },

  // 2024 Purchases
  { purchaseId: 'P-10009', productId: 'PROD-001', quantity: 20 },
  { purchaseId: 'P-10009', productId: 'PROD-002', quantity: 10 },
  { purchaseId: 'P-10010', productId: 'PROD-003', quantity: 40 },
  { purchaseId: 'P-10010', productId: 'PROD-004', quantity: 6 },

  // 2025 Purchases
  { purchaseId: 'P-10011', productId: 'PROD-001', quantity: 15 },
  { purchaseId: 'P-10011', productId: 'PROD-002', quantity: 12 },
  { purchaseId: 'P-10012', productId: 'PROD-003', quantity: 30 },
  { purchaseId: 'P-10012', productId: 'PROD-004', quantity: 8 },

  // 2026 Purchases (Existing)
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
  // 2020
  { id: 'P-10001', date: '2020/04/10', total: 13850 },
  { id: 'P-10002', date: '2020/09/15', total: 10000 },
  // 2021
  { id: 'P-10003', date: '2021/03/12', total: 17400 },
  { id: 'P-10004', date: '2021/08/20', total: 16000 },
  // 2022
  { id: 'P-10005', date: '2022/02/18', total: 22200 },
  { id: 'P-10006', date: '2022/07/22', total: 18000 },
  // 2023
  { id: 'P-10007', date: '2023/05/10', total: 30750 },
  { id: 'P-10008', date: '2023/11/05', total: 20000 },
  // 2024
  { id: 'P-10009', date: '2024/04/15', total: 32500 },
  { id: 'P-10010', date: '2024/09/20', total: 17000 },
  // 2025
  { id: 'P-10011', date: '2025/03/10', total: 28200 },
  { id: 'P-10012', date: '2025/08/25', total: 18000 },
  // 2026
  { id: 'P-10021', date: '2026/05/20', total: 12400 },
  { id: 'P-10022', date: '2026/05/21', total: 8500 },
  { id: 'P-10023', date: '2026/05/22', total: 21200 },
  { id: 'P-10024', date: '2026/05/23', total: 5650 },
])

export const inventories = reactive([
  { id: 'INV-2019', year: 2019, date: '2019/12/31', total: 38000 },
  { id: 'INV-2020', year: 2020, date: '2020/12/31', total: 38200 },
  { id: 'INV-2021', year: 2021, date: '2021/12/31', total: 40200 },
  { id: 'INV-2022', year: 2022, date: '2022/12/31', total: 46350 },
  { id: 'INV-2023', year: 2023, date: '2023/12/31', total: 62800 },
  { id: 'INV-2024', year: 2024, date: '2024/12/31', total: 60250 },
  { id: 'INV-2025', year: 2025, date: '2025/12/31', total: 51500 },
])

export const inventoryItems = reactive([
  // INV-2019
  { inventoryId: 'INV-2019', productId: 'PROD-001', quantity: 10 },
  { inventoryId: 'INV-2019', productId: 'PROD-002', quantity: 10 },
  { inventoryId: 'INV-2019', productId: 'PROD-003', quantity: 50 },
  { inventoryId: 'INV-2019', productId: 'PROD-004', quantity: 5 },

  // INV-2020
  { inventoryId: 'INV-2020', productId: 'PROD-001', quantity: 12 },
  { inventoryId: 'INV-2020', productId: 'PROD-002', quantity: 8 },
  { inventoryId: 'INV-2020', productId: 'PROD-003', quantity: 40 },
  { inventoryId: 'INV-2020', productId: 'PROD-004', quantity: 6 },

  // INV-2021
  { inventoryId: 'INV-2021', productId: 'PROD-001', quantity: 15 },
  { inventoryId: 'INV-2021', productId: 'PROD-002', quantity: 12 },
  { inventoryId: 'INV-2021', productId: 'PROD-003', quantity: 30 },
  { inventoryId: 'INV-2021', productId: 'PROD-004', quantity: 4 },

  // INV-2022
  { inventoryId: 'INV-2022', productId: 'PROD-001', quantity: 8 },
  { inventoryId: 'INV-2022', productId: 'PROD-002', quantity: 15 },
  { inventoryId: 'INV-2022', productId: 'PROD-003', quantity: 60 },
  { inventoryId: 'INV-2022', productId: 'PROD-004', quantity: 8 },

  // INV-2023
  { inventoryId: 'INV-2023', productId: 'PROD-001', quantity: 14 },
  { inventoryId: 'INV-2023', productId: 'PROD-002', quantity: 20 },
  { inventoryId: 'INV-2023', productId: 'PROD-003', quantity: 70 },
  { inventoryId: 'INV-2023', productId: 'PROD-004', quantity: 10 },

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



export function addPurchase(date, items) {
  const existingIds = purchases.map(p => p.id)
  const id = generateNextId(existingIds, 'P-', 10025)

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
  const existingIds = products.map(p => p.id)
  const id = generateNextId(existingIds, 'PROD-', 1, 3)

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

  const cogs = calculateCOGS(previousInventoryTotal, purchasesTotal, currentInventoryTotal)

  return {
    year,
    previousInventoryTotal,
    purchasesTotal,
    currentInventoryTotal,
    cogs
  }
}
