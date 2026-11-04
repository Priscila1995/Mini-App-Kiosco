<<<<<<< HEAD
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function Cart() {
  const navigate = useNavigate();
  const { openCart } = useCartDrawer();

  useEffect(() => {
    openCart();
    navigate("/products", { replace: true });
  }, [navigate, openCart]);

  return null;
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const [successMessage, setSuccessMessage] = useState("");

  const handleClear = () => {
    clearCart();
    setSuccessMessage("");
  };

  const handleCheckout = () => {
    clearCart();
    setSuccessMessage("Pedido realizado con éxito.");
  };

  return (
    <section>
      <h1>Carrito</h1>

      {successMessage && <p>{successMessage}</p>}

      {items.length === 0 ? (
        !successMessage && <p>El carrito está vacío.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
          <p>Total: ${totalPrice}</p>
          <button type="button" onClick={handleClear}>
            Vaciar carrito
          </button>
          <button type="button" onClick={handleCheckout}>
            Finalizar pedido
          </button>
        </>
      )}

      <p>
        <Link to="/products">Volver al catálogo</Link>
      </p>
    </section>
  );
>>>>>>> main
}
