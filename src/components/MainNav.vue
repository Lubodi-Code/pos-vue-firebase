<script setup>
import { useProductsStore } from '../stores/products';
import Link from './Link.vue'
import Logo from './Logo.vue'

const productStore = useProductsStore();
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <Logo />
    
    <div class="flex gap-5 text-white items-center"> 
      <h2 class="text-lg font-extrabold">Filtros:</h2>
      
      <div
        class="flex items-center gap-2"
        v-for="category in productStore.categories"
        :key="category.id"
      >
        <input
          type="radio"
          name="category"
          v-model="productStore.selectedCategory"
          :value="category.id"
          class="h-4 w-4 border-gray-300 accent-indigo-500 cursor-pointer"
        />
        <label class="text-gray-100 cursor-pointer">
          {{ category.name }}
        </label>
      </div>
    </div>
    
    <nav>
      <Link to="admin" class="text-black hover:text-gray-300 font-semibold">
        Admin
      </Link>
    </nav>
  </header>
</template>
