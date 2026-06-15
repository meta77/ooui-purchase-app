/**
 * 金額を日本円形式の文字列にフォーマットする純粋関数
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('ja-JP').format(value)
}

/**
 * 明細行と商品データから合計金額を計算する純粋関数
 * @param {Array<{productId: string, quantity: number}>} items
 * @param {Array<{id: string, price: number}>} products
 * @returns {number}
 */
export function calculateTotalAmount(items, products) {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)
}

/**
 * 売上原価（COGS）を計算する純粋関数
 * @param {number} previousInventoryTotal 前期末の棚卸高
 * @param {number} purchasesTotal 今期の仕入高
 * @param {number} currentInventoryTotal 今期末の棚卸高
 * @returns {number}
 */
export function calculateCOGS(previousInventoryTotal, purchasesTotal, currentInventoryTotal) {
  return previousInventoryTotal + purchasesTotal - currentInventoryTotal
}
