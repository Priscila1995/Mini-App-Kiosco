import { useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryGrid from "../components/CategoryGrid";
import ProductCard from "../components/ProductCard";
import ProductsFeedback from "../components/ProductsFeedback";
import { useProducts } from "../hooks/useProducts";
import "./Product.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  const category = searchParams.get("category") as
    | "bebidas"
    | "snacks"
    | "golosinas"
    | "varios"
    | null;

  const query = searchParams.get("q") ?? "";

  // La categoría se filtra en el backend (?category=); la búsqueda es local
  const { products, loading, error, reload } = useProducts(category);

  const filteredProducts = products.filter((product) =>
    query ? product.name.toLowerCase().includes(query.toLowerCase()) : true,
  );

  const scrollToResults = useCallback(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleSearch = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set("q", value);
    } else {
      next.delete("q");
    }
    setSearchParams(next);
  };

  return (
    <section className="products-page container">
      <header className="page-head">
        <p className="page-kicker">Catálogo</p>
        <h1>El mostrador</h1>
        <p>Elegí, sumá al carrito y listo. Todo lo que un kiosco tiene que tener.</p>
      </header>

      <CategoryGrid active={category} onSelect={scrollToResults} />

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            placeholder="Buscar en el mostrador"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
          />
        </label>
      </div>

      <div className="catalog-results" ref={resultsRef}>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <ProductsFeedback loading={loading} error={error} onRetry={reload} />
        {!loading && !error && filteredProducts.length === 0 ? (
          <p className="catalog-empty">No hay productos para esa búsqueda.</p>
        ) : null}
      </div>
    </section>
  );
}
