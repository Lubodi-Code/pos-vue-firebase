import { defineStore } from 'pinia';
import { ref, computed, watchEffect } from 'vue';
import { useCouponStore } from '@/stores/coupons';
import { getCurrentDate } from '@/helpers';
import { collection, addDoc, doc, runTransaction, getDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useCartStore = defineStore('cart', () => {
  const subtotal = ref(0);
  const impuestos = ref(0);
  const total = ref(0);
  const items = ref([]);
  const db = useFirestore();

  const impuestos_Rate = 0.10; // 10% de impuestos

  function addItem(item) {
    const existingItem = items.value.find(i => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < 5) {
        existingItem.quantity += 1;
      }
    } else {
      items.value.push({
        ...item,
        quantity: 1,
        id: item.id
      });
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id);
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
  }

  const isEmpty = computed(() => items.value.length === 0);

  const checkprouctAvailable = computed(() => {
    return (product) => product.disponibles < 5 ? product.disponibles : 5;
  });

  // Importa el store de cupones para obtener el descuento
  const couponStore = useCouponStore();

  watchEffect(() => {
    // Calcula el subtotal
    const newSubtotal = items.value.reduce(
      (acc, item) => acc + (item.precio * item.quantity),
      0
    );
    subtotal.value = Math.max(0, newSubtotal);

    // Calcula los impuestos
    impuestos.value = Number((subtotal.value * impuestos_Rate).toFixed(2));

    // Calcula el total restándole el descuento
    total.value = subtotal.value + impuestos.value - couponStore.discountAmount;
  });

  // Función checkout para confirmar la compra, actualizar stock y guardar la orden en Firebase
  async function checkout() {
    try {
      // Registra la orden en la colección "orders"
      await addDoc(collection(db, "orders"), {
        // Mapea los items excluyendo 'disponibles' y 'categoria'
        items: items.value.map(item => {
          const { disponibles, categoria, ...rest } = item;
          return rest;
        }),
        subtotal: subtotal.value,
        impuestos: impuestos.value,
        total: total.value,
        fecha: getCurrentDate(),
        descuento: couponStore.discountAmount,
      });

      // Actualiza el stock de cada producto usando transacciones para garantizar la integridad
      for (const item of items.value) {
        const productRef = doc(db, "default", item.id);
        await runTransaction(db, async (transaction) => {
          const productSnap = await transaction.get(productRef);
          if (!productSnap.exists()) {
            throw new Error(`El producto ${item.id} no existe.`);
          }
          const currentStock = productSnap.data().disponibles;
          // Resta la cantidad comprada del stock actual
          transaction.update(productRef, { disponibles: currentStock - item.quantity });
        });
      }

      // Reinicia el carrito y el cupón
      items.value = [];
      couponStore.resetCoupon();

      return true;
    } catch (error) {
      console.error("Error en checkout:", error);
      return false;
    }
  }

  return {
    addItem,
    removeItem,
    updateQuantity,
    items,
    subtotal,
    impuestos,
    total,
    isEmpty,
    checkprouctAvailable,
    checkout
  };
});
