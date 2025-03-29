<script setup>
import Link from '@/components/Link.vue'
import Product from '@/components/Product.vue'
import { useProductsStore } from '@/stores/products'
const productStore = useProductsStore()
</script>

<template>
  <div>
    <Link to="nuevo-producto" class="block mb-10">
      Nuevo Producto
    </Link>
    <h1 class="text-4xl font-black my-10">Productos</h1>
    <p v-if="productStore.NoResults">No se encontraron productos</p>
    <ul role="list" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Product v-for="product in productStore.productsCollection" :key="product.id" :product="product" />
    </ul>
  </div>
</template>
