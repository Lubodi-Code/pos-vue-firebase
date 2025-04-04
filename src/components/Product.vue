<script setup>
import { computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import { formatCurrceny } from '@/helpers';

const productStore = useProductsStore();

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Computed que verifica si el producto no está disponible (disponibles === 0)
const isProductNotAvailable = computed(() => props.product.disponibles === 0);
</script>

<template>
  <!-- Se aplica la clase 'opacity-30' si isProductNotAvailable es true -->
  <li :class="{'opacity-30': isProductNotAvailable}"
      class="flex items-center justify-between border border-gray-200 p-6 bg-white shadow transition transform duration-200 hover:scale-105 active:scale-95">
    <!-- Contenedor de imagen + texto -->
    <div class="flex items-center space-x-6">
      <img
        :src="product.imagen"
        :alt="`Imagen de ${product.nombre}`"
        class="w-24 h-24 object-cover rounded"
      >
      <div class="space-y-2">
        <h3 class="text-lg font-medium text-gray-900">{{ product.nombre }}</h3>
        <p>{{ formatCurrceny(product.precio) }}</p>
        <p>{{ product.disponibles }} En existencia</p>
      </div>
    </div>

    <!-- Ícono de edición y botón de eliminación -->
    <div class="flex items-center gap-3">
      <RouterLink :to="{ name: 'editar-producto', params: { id: product.id } }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-blue-500 transition transform duration-200 hover:scale-110"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </RouterLink>
  
      <button type="button" @click="productStore.deleteProduct(product.id)">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6 text-red-500 transition transform duration-200 hover:scale-110"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>
</template>
