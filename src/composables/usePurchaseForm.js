import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products, addPurchase } from '../store/mockData'
import { calculateTotalAmount } from '../utils/calculations'

export function usePurchaseForm() {
  const router = useRouter()

  // Default to today using YYYY-MM-DD for date input
  const today = new Date().toISOString().split('T')[0]
  const date = ref(today)

  const selectedItems = ref([
    { productId: products[0].id, quantity: 1 }
  ])

  const totalAmount = computed(() => {
    return calculateTotalAmount(selectedItems.value, products)
  })

  const getAvailableProducts = (currentIndex) => {
    const otherSelectedIds = selectedItems.value
      .filter((_, idx) => idx !== currentIndex)
      .map(item => item.productId)
    
    return products.filter(product => !otherSelectedIds.includes(product.id))
  }

  const addItem = () => {
    // Find the first product ID that hasn't been selected yet
    const selectedIds = selectedItems.value.map(item => item.productId)
    const nextAvailableProduct = products.find(p => !selectedIds.includes(p.id))
    
    if (nextAvailableProduct) {
      selectedItems.value.push({ productId: nextAvailableProduct.id, quantity: 1 })
    }
  }

  const removeItem = (index) => {
    if (selectedItems.value.length > 1) {
      selectedItems.value.splice(index, 1)
    }
  }

  const save = () => {
    const validItems = selectedItems.value.filter(item => item.quantity > 0)
    if (validItems.length === 0) return
    
    // mockData uses YYYY/MM/DD
    const formattedDate = date.value.replace(/-/g, '/')
    const newId = addPurchase(formattedDate, validItems)
    
    router.push(`/purchases/${newId}`)
  }

  return {
    date,
    selectedItems,
    totalAmount,
    products, // expose raw products if needed
    getAvailableProducts,
    addItem,
    removeItem,
    save
  }
}
