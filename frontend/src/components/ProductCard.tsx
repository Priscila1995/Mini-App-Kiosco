import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article>
      <div>
        <span>{product.image?? "🛒"}</span>
      </div>

      <h3>{product.name}</h3>

      <p>Categoría: {product.category}</p>

      <p>${product.price}</p>

      <Link to={`/products/${product.id}`}>
        Ver detalle
      </Link>

      <button onClick={() => addToCart(product, 1)}>
        Agregar al carrito
      </button>
    </article>
  );
}