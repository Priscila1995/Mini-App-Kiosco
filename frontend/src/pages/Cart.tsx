import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../hooks/useCheckout";
import { formatPrice } from "../utils/format";
import "./Cart.css";

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const { successMessage, errorMessage, submitting, checkout, clearMessages } = useCheckout();

  const handleClear = () => {
    clearCart();
    clearMessages();
  };

  return (
    <section className="cart-page container">
      <header className="page-head">
        <p className="page-kicker">Tu pedido</p>
        <h1>Carrito</h1>
      </header>

      {successMessage ? <p className="cart-success">{successMessage}</p> : null}
      {errorMessage ? <p className="cart-error" role="alert">{errorMessage}</p> : null}

      {items.length === 0 ? (
        !successMessage ? <p className="cart-empty">El carrito está vacío.</p> : null
      ) : (
        <>
          <ul className="cart-page-list">
            {items.map((item) => (
              <li key={item.product.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
          <p className="cart-page-total">
            Total <strong>{formatPrice(totalPrice)}</strong>
          </p>
          <div className="cart-page-actions">
            <button type="button" className="btn btn-ghost" onClick={handleClear} disabled={submitting}>
              Vaciar carrito
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void checkout()}
              disabled={submitting}
            >
              {submitting ? "Enviando pedido..." : "Finalizar pedido"}
            </button>
          </div>
        </>
      )}

      <p className="cart-page-back">
        <Link to="/products">Volver al catálogo</Link>
      </p>
    </section>
  );
}
