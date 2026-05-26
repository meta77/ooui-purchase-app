export const products = [
  { id: 'PROD-001', name: 'カーボンペン', price: 1200 },
  { id: 'PROD-002', name: '上質ノート', price: 850 },
  { id: 'PROD-003', name: '消しゴム', price: 200 },
  { id: 'PROD-004', name: 'カラーマーカーセット', price: 1500 },
]

export const purchaseItems = [
  { purchaseId: 'P-10021', productId: 'PROD-001', quantity: 10 },
  { purchaseId: 'P-10021', productId: 'PROD-003', quantity: 2 },
  { purchaseId: 'P-10022', productId: 'PROD-002', quantity: 10 },
  { purchaseId: 'P-10023', productId: 'PROD-001', quantity: 5 },
  { purchaseId: 'P-10023', productId: 'PROD-004', quantity: 10 },
  { purchaseId: 'P-10023', productId: 'PROD-003', quantity: 1 },
  { purchaseId: 'P-10024', productId: 'PROD-001', quantity: 4 },
  { purchaseId: 'P-10024', productId: 'PROD-002', quantity: 1 },
]

export const purchases = [
  { id: 'P-10021', date: '2026/05/20', total: 12400 },
  { id: 'P-10022', date: '2026/05/21', total: 8500 },
  { id: 'P-10023', date: '2026/05/22', total: 21200 },
  { id: 'P-10024', date: '2026/05/23', total: 5650 },
]

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

  return { ...product, history }
}

export function formatPrice(value) {
  return new Intl.NumberFormat('ja-JP').format(value)
}
