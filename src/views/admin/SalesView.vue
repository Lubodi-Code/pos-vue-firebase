<script setup>
import { ref, computed } from 'vue';
import { useSalesStore } from '@/stores/sales';
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SaleDetails from '@/components/SaleDetails.vue';
import { formatCurrceny } from '@/helpers';

const salesStore = useSalesStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMM",
});

// Pasamos las refs directamente para mantener la reactividad
</script>

<template>
  <div class="flex gap-5 items-start p-5">
    <!-- Columna con DatePicker -->
    <div class="w-1/2 bg-white flex flex-col justify-start items-center p-5 shadow-md rounded-lg border">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Selecciona una fecha</h2>
      <VueTailwindDatepicker
        :formatter="formatter"
        v-model="salesStore.date"
        as-single
        no-input
      />
    </div>  

    <!-- Columna con detalle de ventas -->
    <div class="w-1/2 bg-white flex flex-col justify-start items-start p-5 shadow-md rounded-lg border lg:h-screen lg:overflow-y-scroll">
      <h1 class="text-3xl font-extrabold text-gray-900">Ventas</h1>

      <!-- Muestra la fecha si está seleccionada -->
      <div v-if="salesStore.isDateSelected" class="mt-4">
        <p class="text-lg">Fecha seleccionada: {{ salesStore.date }}</p>
      </div>
      <div v-else class="mt-4">
        <p class="text-lg text-gray-500">No hay fecha seleccionada.</p>
      </div>

      <!-- Verifica si existe alguna venta -->
      <div v-if="salesStore.salesCollection && salesStore.salesCollection.length">
        <p class="mt-4 text-5xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Total del día: {{ formatCurrceny(salesStore.totalSaleOfDay) }}</p>
        <SaleDetails
          v-for="sale in salesStore.salesCollection"
          :key="sale.id"
          :sale="sale"
        />

      </div>
      <div v-else class="mt-4">
        <p class="text-lg">No hubieron ventas</p>
      </div>
    </div>
  </div>
</template>