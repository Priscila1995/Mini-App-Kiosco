import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <Link to="/products">Volver al catálogo</Link>
      </section>
    );
  }

  const handleQuantityChange = (value: string) => {
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    setQuantity(Math.max(1, Math.min(next, product.stock)));
  };

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <section>
      {product.image && <p>{product.image}</p>}
      <h1>{product.name}</h1>
      <p>Categoría: {product.category}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>{product.description}</p>
      <label>
        Cantidad{" "}
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(event) => handleQuantityChange(event.target.value)}
        />
      </label>
      <button type="button" onClick={handleAdd}>
        Agregar al carrito
      </button>
      <p>
        <Link to="/products">Volver al catálogo</Link>
      </p>
    </section>
  );
}
