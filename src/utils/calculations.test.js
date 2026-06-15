import { describe, it, expect } from 'vitest'
import { formatPrice, calculateTotalAmount, calculateCOGS } from './calculations'

describe('calculations.js', () => {
  describe('formatPrice', () => {
    it('should format numbers with commas', () => {
      expect(formatPrice(1200)).toBe('1,200')
      expect(formatPrice(1000000)).toBe('1,000,000')
    })

    it('should handle zero', () => {
      expect(formatPrice(0)).toBe('0')
    })
  })

  describe('calculateTotalAmount', () => {
    const mockProducts = [
      { id: 'P1', price: 1000 },
      { id: 'P2', price: 500 }
    ]

    it('should calculate total correctly for multiple items', () => {
      const items = [
        { productId: 'P1', quantity: 2 }, // 2000
        { productId: 'P2', quantity: 3 }  // 1500
      ]
      expect(calculateTotalAmount(items, mockProducts)).toBe(3500)
    })

    it('should return 0 when items array is empty', () => {
      expect(calculateTotalAmount([], mockProducts)).toBe(0)
    })

    it('should ignore items with product IDs not found in products array', () => {
      const items = [
        { productId: 'P1', quantity: 1 }, // 1000
        { productId: 'UNKNOWN', quantity: 5 } // 0
      ]
      expect(calculateTotalAmount(items, mockProducts)).toBe(1000)
    })
  })

  describe('calculateCOGS', () => {
    it('should correctly calculate Cost of Goods Sold', () => {
      // COGS = 前期末棚卸高(1000) + 当期仕入高(5000) - 当期末棚卸高(2000) = 4000
      expect(calculateCOGS(1000, 5000, 2000)).toBe(4000)
    })

    it('should handle zero values correctly', () => {
      expect(calculateCOGS(0, 0, 0)).toBe(0)
    })

    it('should handle cases where current inventory is higher than sum of previous inventory and purchases', () => {
      // 例: 仕入れ値の計算ミスや返品などの特殊ケース（計算式上はマイナスになる）
      expect(calculateCOGS(1000, 1000, 3000)).toBe(-1000)
    })
  })
})
