<script setup>
import { useCouponStore } from '@/stores/coupons';
const couponStore = useCouponStore();
</script>

<template>
    <div class="mt-3">
        <p class="py-2 font-bold text-sm text-gray-900">Cupón de descuento</p>

        <div class="flex">
            <input
                type="text"
                v-model="couponStore.couponInput"
                placeholder="Ingresa el código (10%OFF, 20%OFF, 30%OFF)"
                class="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                :disabled="couponStore.isCouponApplied"
            />
            <button
                type="button"
                class="bg-indigo-500 text-white py-2 px-4 rounded ml-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 disabled:opacity-50"
                @click="couponStore.applyCoupon"
                :disabled="couponStore.isCouponApplied || !couponStore.couponInput"
            >
                {{ couponStore.isCouponApplied ? 'Aplicado' : 'Aplicar' }}
            </button>
        </div>
        
        <p class="mt-2 text-sm min-h-5" 
           :class="{
             'text-green-600': couponStore.couponValidationMessage.includes('aplicado'),
             'text-red-600': couponStore.couponValidationMessage.includes('inválido') || 
                            couponStore.couponValidationMessage.includes('tienes')
           }">
            {{ couponStore.couponValidationMessage }}
        </p>
    </div>
</template>