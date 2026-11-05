import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/client";
import type { Category, Product } from "../types";

// Carga los productos desde la API (opcionalmente filtrados por categoría)
export function useProducts(category?: Category | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este contador vuelve a disparar la carga (botón "Reintentar")
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    getProducts(category)
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Evita pisar el estado con una respuesta vieja si cambió la categoría
    return () => {
      cancelled = true;
    };
  }, [category, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { products, loading, error, reload };
}
