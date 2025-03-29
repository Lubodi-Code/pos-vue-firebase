import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCartStore } from "./cart"; // Ajusta la ruta según corresponda

export const useCouponStore = defineStore("coupons", () => {
  const couponInput = ref("");
  const couponValidationMessage = ref("");
  // couponFactor guardará el valor porcentual (por ejemplo, 0.1 para 10%OFF)
  const couponFactor = ref(0);
  const isCouponApplied = ref(false);
  
  const VALID_COUPONS = [
    { name: "10%OFF", discount: 0.1 },
    { name: "20%OFF", discount: 0.2 },
    { name: "30%OFF", discount: 0.3 },
  ];

  // Se obtiene el store del carrito para acceder a subtotal e impuestos
  const cartStore = useCartStore();

  // Calcula el descuento en base a la suma de subtotal e impuestos
  const discountAmount = computed(() => {
    const baseTotal = cartStore.subtotal + cartStore.impuestos;
    return isCouponApplied.value ? baseTotal * couponFactor.value : 0;
  });

  // Función para limpiar el mensaje después de 3 segundos
  const clearMessage = () => {
    setTimeout(() => (couponValidationMessage.value = ""), 3000);
  };

  function applyCoupon() {
    if (isCouponApplied.value) {
      couponValidationMessage.value = "Ya tienes un cupón aplicado";
      return clearMessage();
    }

    const coupon = VALID_COUPONS.find(c => c.name === couponInput.value);
    if (coupon) {
      couponValidationMessage.value = "Aplicando...";
      setTimeout(() => {
        couponFactor.value = coupon.discount;
        isCouponApplied.value = true;
        couponValidationMessage.value = `¡Cupón ${coupon.name} aplicado!`;
        clearMessage();
      }, 1500);
    } else {
      couponValidationMessage.value = "Cupón inválido";
      clearMessage();
    }
  }

  // Función para reiniciar los valores del cupón
  function resetCoupon() {
    couponInput.value = "";
    couponValidationMessage.value = "";
    couponFactor.value = 0;
    isCouponApplied.value = false;
  }

  return { 
    couponInput, 
    applyCoupon, 
    couponValidationMessage,
    discountAmount,
    isCouponApplied,
    resetCoupon
  };
});
