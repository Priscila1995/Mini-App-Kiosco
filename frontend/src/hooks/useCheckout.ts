import { useEffect, useState } from "react";
import { ApiError, createOrder } from "../api/client";
import { useCart } from "../context/CartContext";

export function useCheckout() {
  const { items, clearCart } = useCart();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [items.length]);

  const checkout = async () => {
    if (items.length === 0 || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      await createOrder(
        items.map(({ product, quantity }) => ({
          product_id: product.id,
          quantity,
        })),
      );
      clearCart();
      setSuccessMessage("Pedido realizado con éxito.");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "No se pudo completar el pedido. Intentá de nuevo.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return { successMessage, errorMessage, submitting, checkout, clearMessages };
}
