import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function Header() {
  const { totalItems } = useCart();
  const { openCart } = useCartDrawer();

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-mark">R</span>
          <span className="brand-text">
            El <em>Rápido</em>
          </span>
        </Link>
        <nav className="site-nav">
          <NavLink to="/" end className="nav-home">
            Inicio
          </NavLink>
          <NavLink to="/products" className="nav-products" aria-label="Productos">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-products-icon">
              <rect x="3" y="3" width="7" height="7" rx="1.6" fill="currentColor" />
              <rect x="14" y="3" width="7" height="7" rx="1.6" fill="currentColor" />
              <rect x="3" y="14" width="7" height="7" rx="1.6" fill="currentColor" />
              <rect x="14" y="14" width="7" height="7" rx="1.6" fill="currentColor" />
            </svg>
            <span className="nav-products-label">Productos</span>
          </NavLink>
          <button type="button" className="cart-link" aria-label="Carrito" onClick={openCart}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
              <path
                d="M6 7h15l-1.4 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5 4H3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.3" fill="currentColor" />
              <circle cx="18" cy="20" r="1.3" fill="currentColor" />
            </svg>
            <span className="cart-label">Carrito</span>
            {totalItems > 0 ? <span className="cart-badge">{totalItems}</span> : null}
          </button>
        </nav>
      </div>
    </header>
  );
}
