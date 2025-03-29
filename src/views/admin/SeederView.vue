<script setup>
  import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirebaseStorage, useFirestore } from 'vuefire'
  import { products } from '../../data/products'

  const storage = useFirebaseStorage()
  const db = useFirestore();

  async function seedDB() {
    // Usamos la colección "default" para que coincida con el resto de la app
    const productsCollection = collection(db, "default");

    // Iteramos sobre el array de productos; 
    // en este ejemplo, se asume que products está indexado desde 0
    for (let i = 1; i <= products.length; i++) {
      try {
        // Se obtiene la URL de la imagen: se espera que las imágenes estén en "products/producto1.jpg", etc.
        const downloadURL = await getDownloadURL(ref(storage, `products/producto${i}.jpg`));
  
        // Se agrega el producto usando los nombres de campos en español
        await addDoc(productsCollection, { 
          nombre: products[i - 1].name,
          precio: products[i - 1].price,
          disponibles: products[i - 1].availability,
          categoria: products[i - 1].category,
          imagen: downloadURL
        });
  
        console.log("Producto Agregado...");
      } catch (error) {
        console.error("Error agregando producto:", error);
      }
      
      if (i === products.length) {
        alert('Se subieron los Productos');
      }
    }
  }

  const handleSubmit = (data) => {
    const urls = []
    data.images.forEach(fileItem => {
      const storageFolderRef = ref(storage, '/products');
      
      // Subir el archivo a Firebase Storage
      const uploadTask = uploadBytesResumable(ref(storageFolderRef, fileItem.name), fileItem.file);
  
      // Monitorea el progreso y obtiene la URL de descarga
      uploadTask.on('state_changed', snapshot => {
        // Se puede monitorear el progreso aquí
      }, error => {
        console.log(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          urls.push(downloadURL);
          if (urls.length === data.images.length) {
            alert('Se subieron las imágenes');
          }
        });
      });
    });
  }
</script>

<template>
  <div class="mt-10">
    <Link to="products">Volver</Link>
    <h1 class="text-4xl my-10 font-extrabold">Seeder</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
        <!-- Formulario para subir imágenes -->
        <FormKit
          type="form"
          submit-label="Agregar Imágenes"
          incomplete-message="No se pudo enviar, revisa los mensajes"
          @submit="handleSubmit"
        >
          <FormKit 
            type="file"
            multiple="true"
            name="images"
          />
        </FormKit>
        <div class="mt-16">
          <!-- Formulario para agregar productos (Seeder) -->
          <FormKit
            type="form"
            submit-label="Agregar Productos"
            incomplete-message="No se pudo enviar, revisa los mensajes"
            @submit="seedDB"
          />
        </div>
      </div>
    </div>
  </div>
</template>
