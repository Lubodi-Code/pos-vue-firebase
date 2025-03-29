<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useCouponStore } from '@/stores/coupons';
import ShopingCartItem from './ShopingCartItem.vue';
import Amount from './Amount.vue';
import CouponForm from './CouponForm.vue';
import { formatCurrceny } from '@/helpers';

const cartStore = useCartStore();
const couponStore = useCouponStore();
</script>

<template>
  <p v-if="cartStore.isEmpty" class="text-center text-sm text-gray-600">
    El carrito está vacío
  </p>

  <div v-else class="text-sm">
    <ul role="list" class="mt-3 divide-y divide-gray-200">
      <ShopingCartItem 
        v-for="item in cartStore.items" 
        :key="item.id" 
        :item="item" 
      />
    </ul>
    
    <dl class="mt-3 space-y-2 border-t border-gray-200 pt-3 text-xs font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        <template #value>{{ formatCurrceny(cartStore.subtotal) }}</template>
      </Amount>

      <Amount>
        <template #label>Impuestos:</template>
        <template #value>{{ formatCurrceny(cartStore.impuestos) }}</template>
      </Amount>
      
      <Amount v-if="couponStore.isCouponApplied">
        <template #label>Descuento:</template>
        <template #value>-{{ formatCurrceny(couponStore.discountAmount) }}</template>
      </Amount>

      <Amount>
        <template #label>Total:</template>
        <template #value>{{ formatCurrceny(cartStore.total) }}</template>
      </Amount>
    </dl>

    <CouponForm />

    <!-- Botón de confirmar compra -->
    <div class="mt-4 text-center">
      <button 
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        @click="cartStore.checkout">

        Confirmar Compra
      </button>
    </div>
  </div>
</template>
