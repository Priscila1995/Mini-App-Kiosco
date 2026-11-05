import { useEffect, useState } from "react";
import { getProducts } from "../api/client";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import { useCheckout } from "../hooks/useCheckout";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer();
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();
  const { successMessage, errorMessage, submitting, checkout, clearMessages } = useCheckout();
  const [catalog, setCatalog] = useState<Product[]>([]);

  const suggestions = catalog
    .filter((product) => !items.some((item) => item.product.id === product.id))
    .slice(0, 3);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) return;
    getProducts()
      .then(setCatalog)
      .catch(() => setCatalog([]));
  }, [isOpen]);

  const handleClear = () => {
    clearCart();
    clearMessages();
  };

  return (
    <div
      className={`cart-drawer${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button type="button" className="cart-backdrop" aria-label="Cerrar carrito" onClick={closeCart} />
      <aside className="cart-sheet" role="dialog" aria-labelledby="cart-title" aria-modal={isOpen}>
        <header className="cart-sheet-head">
          <h2 id="cart-title">Carrito</h2>
          <button type="button" className="cart-sheet-close" aria-label="Cerrar" onClick={closeCart}>
            ×
          </button>
        </header>

        <div className="cart-sheet-body">
          {successMessage ? (
            <p className="cart-sheet-success">{successMessage}</p>
          ) : items.length === 0 ? (
            <p className="cart-sheet-empty">Tu bolsa está vacía. Sumá algo de la góndola.</p>
          ) : (
            <ul className="cart-sheet-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-sheet-item">
                  <div className="cart-sheet-thumb">
                    {product.image ? <img src={product.image} alt="" /> : <span>🛒</span>}
                  </div>
                  <div className="cart-sheet-meta">
                    <h3>{product.name}</h3>
                    <p>
                      {formatPrice(product.price)}
                      <strong>{formatPrice(product.price * quantity)}</strong>
                    </p>
                  </div>
                  <div className="cart-sheet-stepper">
                    <button
                      type="button"
                      className="cart-sheet-trash"
                      aria-label={`Quitar ${product.name}`}
                      onClick={() => removeFromCart(product.id)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M5 7h14M10 7V5h4v2m-7 0 1 13h8l1-13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label={`Restar ${product.name}`}
                      disabled={quantity <= 1}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Sumar ${product.name}`}
                      disabled={quantity >= product.stock}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!successMessage && suggestions.length > 0 ? (
            <section className="cart-suggest">
              <h3>Te puede interesar</h3>
              <div className="cart-suggest-row">
                {suggestions.map((product) => (
                  <article key={product.id} className="cart-suggest-card">
                    <div className="cart-suggest-media">
                      {product.image ? <img src={product.image} alt="" /> : null}
                      <button
                        type="button"
                        className="cart-suggest-add"
                        aria-label={`Agregar ${product.name}`}
                        onClick={() => addToCart(product, 1)}
                      >
                        +
                      </button>
                    </div>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <footer className="cart-sheet-foot">
          {errorMessage ? (
            <p className="cart-sheet-error" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <div className="cart-sheet-total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <button
            type="button"
            className="cart-clear"
            disabled={items.length === 0 || submitting}
            onClick={handleClear}
          >
            Vaciar carrito
          </button>
          <button
            type="button"
            className="cart-checkout"
            disabled={totalItems === 0 || submitting}
            onClick={() => void checkout()}
          >
            {submitting ? "Enviando pedido..." : "Finalizar pedido"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
