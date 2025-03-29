<script setup>
import { formatCurrceny } from '@/helpers';
import { useCartStore } from '@/stores/cart';

 defineProps({
     product: {
         type: Object,
         required: true
     }
 })

 const cartStore = useCartStore();
</script>


<template>
    <div class="rounded bg-white shadow relative">
        <img :src="product.imagen" alt="product.name" class="w-full h-60 object-cover">
        <div class ="p-3 space-y-2">
            <h3 class="text-lg font-bold">{{product.nombre}}</h3>
            <p class="text-gray-500"> Disponibles: {{product.disponibles}}</p>
            <p class ="text-2xl font-extrabold text-gray-900"> {{ formatCurrceny(product.precio) }}</p>
          
            <button
  class="absolute top-2 right-2 w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transform transition-transform duration-200 hover:scale-105"
  @click="cartStore.addItem(product)">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
</button>


        </div>
    </div>
</template>