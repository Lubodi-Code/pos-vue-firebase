<script setup>
import { formatCurrceny } from '@/helpers';
import Amount from './Amount.vue';
const props = defineProps({
  sale: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 class="text-lg font-semibold mb-2">Venta Detalles</h2>
    

    
    <p class="text-gray-600 mb-2">Productos vendidos:</p>
    <ul role="list" class="list-disc list-inside">
      <li 
        v-for="item in sale.items" 
        :key="item.id" 
        class="mb-4"
      >
        <div class="flex items-center gap-4">
          <img 
            :src="item.imagen" 
            alt="Product Image" 
            class="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <p><strong>Nombre:</strong> {{ item.nombre }}</p>
            <p><strong>Precio:</strong> {{ item.precio }}</p>
            <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
          </div>
        </div>
        
      </li>
    </ul>
    <dl class="mt-3 space-y-2 border-t border-gray-200 pt-3 text-xs font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        <template #value>{{ formatCurrceny(sale.subtotal) }}</template>
      </Amount>

      <Amount>
        <template #label>Impuestos:</template>
        <template #value>{{ formatCurrceny(sale.impuestos) }}</template>
      </Amount>

      <Amount>
        <template #label>Descuento:</template>
        <template #value>-{{ formatCurrceny(sale.descuento) }}</template>
      </Amount>

      <Amount>
        <template #label>Total:</template>
        <template #value>{{ formatCurrceny(sale.total) }}</template>
      </Amount>
    </dl>
  </div>
</template>