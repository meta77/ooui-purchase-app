import { createRouter, createWebHistory } from 'vue-router'

const AppLayout = () => import('./views/AppLayout.vue')
const PurchaseList = () => import('./views/PurchaseList.vue')
const PurchaseDetail = () => import('./views/PurchaseDetail.vue')
const PurchaseCreate = () => import('./views/PurchaseCreate.vue')
const ProductList = () => import('./views/ProductList.vue')
const ProductCreate = () => import('./views/ProductCreate.vue')
const ProductDetail = () => import('./views/ProductDetail.vue')
const InventoryList = () => import('./views/InventoryList.vue')
const InventoryDetail = () => import('./views/InventoryDetail.vue')
const ReportList = () => import('./views/ReportList.vue')
const ReportDetail = () => import('./views/ReportDetail.vue')
const Settings = () => import('./views/Settings.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', redirect: '/purchases' },
        { path: 'purchases', component: PurchaseList, name: 'PurchaseList' },
        { path: 'purchases/new', component: PurchaseCreate, name: 'PurchaseCreate' },
        { path: 'purchases/:id', component: PurchaseDetail, name: 'PurchaseDetail' },
        { path: 'products', component: ProductList, name: 'ProductList' },
        { path: 'products/new', component: ProductCreate, name: 'ProductCreate' },
        { path: 'products/:id', component: ProductDetail, name: 'ProductDetail' },
        { path: 'inventories', component: InventoryList, name: 'InventoryList' },
        { path: 'inventories/:id', component: InventoryDetail, name: 'InventoryDetail' },
        { path: 'reports', component: ReportList, name: 'ReportList' },
        { path: 'reports/:year', component: ReportDetail, name: 'ReportDetail' },
        { path: 'settings', component: Settings, name: 'Settings' },
      ]
    }
  ]
})
