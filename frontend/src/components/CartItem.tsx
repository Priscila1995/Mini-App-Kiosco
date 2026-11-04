import type { CartItem as CartItemData } from "../types";
import { useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemData;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (value: string) => {
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    updateQuantity(product.id, next);
  };

  return (
    <article>
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
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
      <p>Subtotal: ${product.price * quantity}</p>
      <button type="button" onClick={() => removeFromCart(product.id)}>
        Eliminar
      </button>
    </article>
  );
}
