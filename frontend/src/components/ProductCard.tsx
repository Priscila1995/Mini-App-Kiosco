import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import { formatPrice } from "../utils/format";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { openCart } = useCartDrawer();

  return (
    <article className="product-card">
      <div className="product-media">
        <Link className="product-image" to={`/products/${product.id}`}>
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span>🛒</span>
          )}
        </Link>
      </div>

      <div className="product-info">
        <button
          type="button"
          className="product-add"
          aria-label={`Agregar al carrito ${product.name}`}
          onClick={() => {
            addToCart(product, 1);
            openCart();
          }}
        >
          +
        </button>
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
