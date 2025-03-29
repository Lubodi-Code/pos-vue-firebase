import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSalesStore = defineStore("sales", () => {
  const db = useFirestore();

  const date = ref("");
  const isDateSelected = computed(() => date.value !== "");

  // Construye la query reactiva filtrando por el campo "date"
  const salesSource = computed(() => {
    if (date.value) {
      return query(
        collection(db, "orders"),
        where("fecha", "==", date.value)
      );
    }
    return null;
  });

  // useCollection devuelve un ref con el arreglo de documentos que coinciden con la query
  const salesCollection = useCollection(salesSource, console.log("hola", salesSource.value));

  // Computed para el total de ventas del día, sumando el campo "total" de cada venta
  const totalSaleOfDay = computed(() => {
    return salesCollection.value ? salesCollection.value.reduce((total, sale) => {
      return total + sale.total;
    }, 0) : 0;
  });

  return { date, isDateSelected, salesSource, salesCollection, totalSaleOfDay };
});