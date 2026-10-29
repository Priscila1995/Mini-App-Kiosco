import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">🛒 Kiosco El Rápido</Link>
        <nav className="site-nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/products">Productos</NavLink>
          <NavLink to="/cart" className="cart-link">Carrito ({totalItems})</NavLink>
        </nav>
      </div>
    </header>
  );
}
