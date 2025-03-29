<script setup>
import { ref } from 'vue'
import Link from '@/components/Link.vue'
import useImage from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'
import { useRouter } from "vue-router";
const { onFileChange, url, isImageUploaded } = useImage()
const productStore = useProductsStore()
const router = useRouter();
// Objeto reactivo para almacenar los datos del formulario
const formData = ref({
  nombre: '',
  imagen: '',
  categoria: '',
  precio: '',
  disponibles: ''
})

// Handler del submit: utiliza formData para crear el producto
const submitHandler = (data) => {
  try {
    // Si la URL de la imagen aún no se ha establecido, lanzamos un error
    if (!url.value) {
      throw new Error("La imagen aún no se ha subido, espere por favor.");
    }
    // Creamos un nuevo objeto sin mutar el original, asignando la URL obtenida
    const newData = { ...data, imagen: url.value };
    console.log('Datos del formulario:', newData);
    productStore.createProduct(newData);
    router.push({ name: 'productos' });
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    // Aquí podrías mostrar un mensaje de error en la UI
  }
}
</script>

<template>
  <div>
    <Link to="productos">Volver</Link>
    <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <!-- FormKit vinculado con formData. Se usará submit-label para renderizar el botón -->
        <FormKit 
          type="form" 
          @submit="submitHandler"
          v-model="formData"
          incomplete-message="Por favor, complete todos los campos."
          submit-label="Agregar Producto"
        >
          <!-- Campo para el nombre del producto con trim -->
          <FormKit
            type="text"
            name="nombre"
            v-model="formData.nombre"
            label="Nombre del Producto"
            trim
            validation="required|length:3"
            validation-visibility="blur"
            :validation-messages="{
              required: 'El nombre del producto es obligatorio.',
              length: 'El nombre debe tener al menos 3 caracteres.'
            }"
            placeholder="Ingrese el nombre del producto"
          />

          <!-- Campo para la carga de imágenes -->
          <FormKit
            type="file"
            name="imagen"
            v-model="formData.imagen"
            label="Imagen del Producto"
            accept="image/*"
            validation="required|image"
            validation-visibility="blur"
            :validation-messages="{
              required: 'La imagen del producto es obligatoria.',
              image: 'Por favor, sube un archivo de imagen válido.'
            }"
            help="Formatos aceptados: jpg, png, gif. Tamaño máximo: 5MB."
            @change="onFileChange"
          />

          <div v-if="isImageUploaded" class="mt-2">
            <p class="text-sm text-gray-500">Previsualización de la imagen:</p>
            <img :src="url" alt="Previsualización de la imagen" class="w-64">
          </div>

          <!-- Campo de selección para la categoría del producto usando opciones del store -->
          <FormKit
            type="select"
            name="categoria"
            v-model="formData.categoria"
            label="Categoría del Producto"
            :options="productStore.categoryOptions"
            validation="required"
            validation-visibility="blur"
            :validation-messages="{
              required: 'Por favor, seleccione una categoría.'
            }"
            placeholder="Seleccione una categoría"
          />

          <!-- Campo para el precio del producto -->
          <FormKit
            type="number"
            name="precio"
            v-model="formData.precio"
            label="Precio del Producto"
            :number="true"
            min="0.01"
            step="0.01"
            validation="required|number|min:0.01"
            validation-visibility="blur"
            :validation-messages="{
              required: 'El precio del producto es obligatorio.',
              number: 'Por favor, ingrese un número válido.',
              min: 'El precio debe ser al menos 0.01.'
            }"
            placeholder="Ingrese el precio del producto"
          />

          <!-- Campo para la cantidad disponible -->
          <FormKit
            type="number"
            name="disponibles"
            v-model="formData.disponibles"
            label="Disponibles"
            :number="true"
            min="0"
            step="1"
            validation="required|number|min:0"
            validation-visibility="blur"
            :validation-messages="{
              required: 'La cantidad disponible es obligatoria.',
              number: 'Por favor, ingrese un número válido.',
              min: 'La cantidad no puede ser negativa.'
            }"
            placeholder="Ingrese la cantidad disponible"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
