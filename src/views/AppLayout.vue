<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div class="flex items-center gap-6">
          <h1 class="text-xl font-bold text-gray-900 tracking-tight">
            OOUI Purchases
          </h1>
          <nav class="flex gap-4 border-l border-gray-200 pl-6">
            <router-link
              to="/purchases"
              class="text-sm font-medium transition-colors"
              active-class="text-black"
              exact-active-class="text-black"
              :class="[ $route.path.startsWith('/purchases') ? 'text-black' : 'text-gray-500 hover:text-gray-900' ]"
            >
              仕入れ (Purchases)
            </router-link>
            <router-link
              to="/products"
              class="text-sm font-medium transition-colors"
              active-class="text-black"
              exact-active-class="text-black"
              :class="[ $route.path.startsWith('/products') ? 'text-black' : 'text-gray-500 hover:text-gray-900' ]"
            >
              商品 (Products)
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
