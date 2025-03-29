<script setup>
import { formatCurrceny } from '@/helpers';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- Ajusta los espacios y tamaños con Tailwind para que sea más compacto -->
  <li class="flex items-center space-x-2 p-2">
    <!-- Imagen más pequeña -->
    <img
      :src="item.imagen"
      :alt="item.nombre"
      class="h-16 w-16 rounded flex-none"
    />

    <div class="flex-auto space-y-1">
      <!-- Título algo más pequeño -->
      <h3 class="text-base font-medium text-gray-900">{{ item.nombre }}</h3>
      <!-- Texto del precio más pequeño -->
      <p class="text-xs text-gray-500">
        Precio: {{ formatCurrceny(item.precio) }}
      </p>
      <!-- Select reducido de tamaño -->
      <select
        class="w-16 text-center p-1 text-xs rounded bg-white border border-gray-300
               focus:ring focus:ring-indigo-200"
        @change="cartStore.updateQuantity(item.id, $event.target.value)"
        :value="item.quantity"
      >
        <option
          v-for="n in cartStore.checkprouctAvailable(item)"
          :value="n"
        >
          {{ n }}
        </option>
      </select>
    </div>

    <!-- Botón con ícono de basura (sin texto), color rojo y hover más oscuro -->
    <button
      type="button"
      @click="cartStore.removeItem(item.id)"
      class="text-red-500 hover:text-red-700 transition-colors duration-200
             focus:outline-none"
      title="Eliminar artículo"
    >
      <!-- Ícono de basura -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21
             c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673
             a2.25 2.25 0 0 1-2.244 2.077H8.084
             a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0
             a48.108 48.108 0 0 0-3.478-.397m-12 .562
             c.34-.059.68-.114 1.022-.165m0 0
             a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916
             c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0
             c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0
             a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  </li>
</template>
