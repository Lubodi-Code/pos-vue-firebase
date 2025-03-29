<script setup>
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '../stores/products';
import { storeToRefs } from 'pinia';
import ProductCard from '@/components/ProductCard.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
const productsStore = useProductsStore();
const {filterProducts, NoResult} = storeToRefs(productsStore);
</script>

<template>
    <MainNav />
    <main class="pt-10 lg:flex lg:h-screen lg:overflow-hidden">
      <!-- Contenedor de productos -->
      <div class="lg:w-3/4 lg:overflow-y-scroll  py-24 px-10">
        <p v-if="NoResult" class="text-center text-4xl">No se encontraron productos en la búsqueda</p>
  
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <ProductCard
            v-for="product in filterProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
  
      <!-- Carrito de compras -->
      <aside class="lg:w-1/4 lg:overflow-y-scroll pt-10 pb-32 px-5 bg-white border-l">
        <p class="text-xl font-bold mb-5">Carrito de compras</p>
        <ShoppingCart />
      </aside>
    </main>
  </template>
  