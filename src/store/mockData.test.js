import { describe, it, expect } from 'vitest'
import { addPurchase, addProduct, purchases, products, purchaseItems } from './mockData'

describe('mockData Service (Side Effects)', () => {
  // 注意: mockData.js の状態は reactive なシングルトンのため、
  // 各テストで状態が引き継がれる。初期状態の長さを基準にテストする。

  it('addPurchase should generate new id and add data to state', () => {
    const initialPurchasesLength = purchases.length
    const initialPurchaseItemsLength = purchaseItems.length

    const newPurchaseId = addPurchase('2026/05/24', [
      { productId: 'PROD-001', quantity: 2 } // PROD-001 price is 1200
    ])

    expect(newPurchaseId).toBeDefined()
    expect(purchases.length).toBe(initialPurchasesLength + 1)
    expect(purchaseItems.length).toBe(initialPurchaseItemsLength + 1)
    
    const addedPurchase = purchases.find(p => p.id === newPurchaseId)
    expect(addedPurchase).toBeDefined()
    expect(addedPurchase.date).toBe('2026/05/24')
    expect(addedPurchase.total).toBe(2400) // 1200 * 2 = 2400
  })

  it('addProduct should generate new id and add data to state', () => {
    const initialProductsLength = products.length

    const newProductId = addProduct('テスト用商品', 500)

    expect(newProductId).toBeDefined()
    expect(products.length).toBe(initialProductsLength + 1)
    
    const addedProduct = products.find(p => p.id === newProductId)
    expect(addedProduct).toBeDefined()
    expect(addedProduct.name).toBe('テスト用商品')
    expect(addedProduct.price).toBe(500)
  })
})
