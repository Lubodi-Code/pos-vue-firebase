<script setup>
import Link from './Link.vue'
import Logo from './Logo.vue'
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <Logo />
    <nav>
      <Link to="productos" class="text-black hover:text-gray-300 mr-4">
        Productos
      </Link>
      <Link to="ventas" class="text-black hover:text-gray-300 mr-4">
        Ventas
      </Link>
      <Link to="shop" class="text-black hover:text-gray-300">
        Ir a la tienda
      </Link>
    </nav>
  </header>
</template>