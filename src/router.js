import { createRouter, createWebHistory } from 'vue-router'

const AppLayout = () => import('./views/AppLayout.vue')
const PurchaseList = () => import('./views/PurchaseList.vue')
const PurchaseDetail = () => import('./views/PurchaseDetail.vue')
const ProductList = () => import('./views/ProductList.vue')
const ProductDetail = () => import('./views/ProductDetail.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', redirect: '/purchases' },
        { path: 'purchases', component: PurchaseList, name: 'PurchaseList' },
        { path: 'purchases/:id', component: PurchaseDetail, name: 'PurchaseDetail' },
        { path: 'products', component: ProductList, name: 'ProductList' },
        { path: 'products/:id', component: ProductDetail, name: 'ProductDetail' },
      ]
    }
  ]
})
