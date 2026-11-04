import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">

      <div className="product-image">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
          />
        ) : (
          <span>🛒</span>
        )}
      </div>


      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>


        <h3>
          {product.name}
        </h3>


        <p className="product-price">
          ${product.price}
        </p>


        <div className="product-actions">

          <Link 
            className="detail-button"
            to={`/products/${product.id}`}
          >
            Ver detalle
          </Link>


          <button 
            className="cart-button"
            onClick={() => addToCart(product, 1)}
          >
            + Agregar
          </button>

        </div>

      </div>

    </article>
  );
}