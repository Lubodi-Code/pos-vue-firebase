import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import {ref as storageRef, deleteObject} from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc  // <-- Agregado aquí
} from "firebase/firestore";


export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const selectedCategory = ref(3);
  // Array de categorías
  const categories = [
    { id: 1, name: "Sudaderas" },
    { id: 2, name: "Tenis" },
    { id: 3, name: "Lentes" },
  ];

  // Query para obtener los productos de la colección "default"
  const q = query(collection(db, "default"), orderBy("disponibles", "asc"));
  const productsCollection = useCollection(q);

  // Crear producto
  async function createProduct(product) {
    await addDoc(collection(db, "default"), product);
  }

  // Actualizar producto
  async function updateProduct(docRef, updatedData) {
    if (!updatedData.imagen || updatedData.imagen.trim() === '') {
      const { imagen, ...rest } = updatedData;
      await updateDoc(docRef, rest);
    } else {
      await updateDoc(docRef, updatedData);
    }
  }

  async function deleteProduct(id) {
    if(confirm('¿Estás seguro de eliminar este producto?')) {
      // Eliminar producto
    const docRef = doc(db, "default", id);
    const docSnap = await   getDoc(docRef);
    const { imagen } = docSnap.data();
    const imageRef = storageRef(storage, imagen);
     Promise.all([
       deleteObject(imageRef),
       deleteDoc(docRef)
     ]);
    }
  }
 
  // Computed que detecta si no hay resultados
  const NoResult = computed(() => {
    return productsCollection.value.length === 0;
  });

  // Computed que genera las opciones para el select: { label, value }
  const categoryOptions = computed(() => {
    return [
      { label: "Selecciona una categoría", value: "", attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
  });

  const filterProducts = computed(() => {
    return productsCollection.value.filter((product) =>
      product.categoria === selectedCategory.value && product.disponibles > 0
    );
  });
  

  return {
    createProduct,
    updateProduct,
    categoryOptions,
    productsCollection,
    categories,
    selectedCategory,
    NoResult,
    deleteProduct,
    filterProducts
  };
});
