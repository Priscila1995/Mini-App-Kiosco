import type { CartItem as CartItemData } from "../types";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import "./CartItem.css";

interface CartItemProps {
  item: CartItemData;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (value: string) => {
    // Input vacío: no tocar el carrito (Number("") daría 0 y eliminaría el ítem).
    if (value === "") return;
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    updateQuantity(product.id, next);
  };

  return (
    <article className="cart-item">
      <div className="cart-item-thumb">
        {product.image ? <img src={product.image} alt="" /> : <span>🛒</span>}
      </div>
      <div className="cart-item-copy">
        <h2>{product.name}</h2>
        <p>Precio: {formatPrice(product.price)}</p>
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
        <p>Subtotal: {formatPrice(product.price * quantity)}</p>
      </div>
      <button type="button" className="btn btn-ghost" onClick={() => removeFromCart(product.id)}>
        Eliminar
      </button>
    </article>
  );
}
