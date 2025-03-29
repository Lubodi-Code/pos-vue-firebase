<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/Link.vue'
import { useProductsStore } from '@/stores/products'
import useImage from '@/composables/useImage'


const { onFileChange, url, isImageUploaded } = useImage()
const productStore = useProductsStore()
const router = useRouter()
const route = useRoute()
const db = useFirestore()
const product = doc(db, 'default', route.params.id)
const productData = useDocument(product)



// Objeto reactivo para el formulario con claves en español
const formData = ref({
  nombre: '',
  imagen: '',
  categoria: '',
  precio: '',
  disponibles: ''
})

watch(productData, (newData) => {
    if (!newData) {
        router.push({ name: 'productos' })
    }
    Object.assign(formData.value, newData)

     
})
 


// Handler del submit: actualiza el producto utilizando los datos del formulario
const submitHandler = (data) => {
  try {
    // Creamos una copia de data para no modificarla directamente
    const updatedData = { ...data };

    // Si se subió una nueva imagen, se asigna la nueva URL;
    // de lo contrario, se elimina la propiedad "imagen" para no actualizarla
    if (url.value) {
      updatedData.imagen = url.value;
    } else {
      delete updatedData.imagen;
    }

    console.log('Datos antes de guardar:', updatedData);
    productStore.updateProduct(product, updatedData);
    router.push({ name: 'productos' });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
}

</script>

<template>
  <div>
    <Link to="productos">Volver</Link>
    <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit 
          type="form" 
          v-model="formData" 
          submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes"
          @submit="submitHandler"
          :actions="false"
        >
          <!-- Campo para el nombre del producto -->
          <FormKit 
            type="text"
            label="Nombre del Producto"
            name="nombre"
            placeholder="Ingrese el nombre del producto"
            validation="required|length:3"
            validation-visibility="blur"
            v-model.trim="formData.nombre"
            :validation-messages="{
              required: 'El nombre del producto es obligatorio.',
              length: 'El nombre debe tener al menos 3 caracteres.'
            }"
          />

          <!-- Campo para la categoría del producto -->
          <FormKit 
            type="select"
            label="Categoría del Producto"
            name="categoria"
            v-model="formData.categoria"
            placeholder="Seleccione una categoría"
            :options="productStore.categoryOptions"
            validation="required"
            validation-visibility="blur"
            :validation-messages="{
              required: 'Por favor, seleccione una categoría.'
            }"
          />

          <!-- Campo para el precio del producto -->
          <FormKit
            type="number"
            label="Precio del Producto"
            name="precio"
            placeholder="Ingrese el precio del producto"
            v-model.number="formData.precio"
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
          />

          <!-- Campo para la cantidad disponible -->
          <FormKit
            type="number"
            label="Disponibles"
            name="disponibles"
            placeholder="Ingrese la cantidad disponible"
            v-model.number="formData.disponibles"
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
          />

          <!-- Previsualización de la imagen -->
          <div v-if="isImageUploaded" class="mt-2">
            <p class="text-sm text-gray-500">Previsualización de la nueva imagen:</p>
            <img :src="url" alt="Previsualización de la imagen" class="w-64">
          </div>
          <div v-else class="mt-2">
            <p class="text-sm text-gray-500">Imagen actual:</p>
            <img :src="formData.imagen" :alt="'Imagen de ' + formData.nombre" class="w-64">
          </div>

          <!-- Campo para cambiar la imagen -->
          <FormKit
            type="file"
            label="Cambiar Imagen"
            name="imagen"
            accept="image/*"
            @change="onFileChange"
            validation="image"
            validation-visibility="blur"
            :validation-messages="{
              image: 'Por favor, sube un archivo de imagen válido.'
            }"
            help="Formatos aceptados: jpg, png, gif. Tamaño máximo: 5MB."
          />

          <FormKit type="submit">Guardar Cambios</FormKit>
        </FormKit>
      </div>
    </div>
  </div>
</template>
