import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError, getProductById } from "../api/client";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";
import QuantityControl from "../components/QuantityControl";
import ProductsFeedback from "../components/ProductsFeedback";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { openCart } = useCartDrawer();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(false);
    setNotFound(false);
    setProduct(null);

    getProductById(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setQuantity(1);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  if (loading || error) {
    return (
      <section className="container empty-state">
        <ProductsFeedback loading={loading} error={error} onRetry={() => setAttempt((n) => n + 1)} />
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="container empty-state">
        <p className="page-kicker">404</p>
        <h1>Este producto no está en el mostrador</h1>
        <Link className="btn btn-primary" to="/products">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page container">
      <Link className="detail-back" to="/products">
        ← Catálogo
      </Link>

      <div className="detail-grid">
        <div className="detail-stage">
          <div className="detail-orb" aria-hidden="true" />
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span>🛒</span>
          )}
        </div>

        <div className="detail-copy">
          <p className="page-kicker">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-stock">{product.stock} unidades en mostrador</p>

          <div className="detail-buy">
            <QuantityControl
              value={quantity}
              min={1}
              max={product.stock}
              onChange={setQuantity}
            />
            <button
              type="button"
              className="btn btn-primary"
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart(product, quantity);
                openCart();
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
