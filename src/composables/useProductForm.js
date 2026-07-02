import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { addProduct } from '../store/mockData'

export function useProductForm() {
  const router = useRouter()
  
  const name = ref('')
  const price = ref(0)
  
  const isValid = computed(() => name.value.trim() !== '' && price.value >= 0)
  
  const save = () => {
    if (!isValid.value) return
    
    const newId = addProduct(name.value.trim(), price.value)
    router.push(`/products/${newId}`)
  }
  
  return {
    name,
    price,
    isValid,
    save
  }
}
