import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./Product.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") as 
  | "bebidas"
  | "snacks"
  | "golosinas"
  | "varios"
  | null;

  const filteredProducts = category
    ? products.filter(
        (product) => product.category === category
      )
    : products;


  const handleFilter = (value: string) => {
    if (value === "todos") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value,
      });
    }
  };


  return (
    <section className="products-page">
      <h1 className="products-title">
          Productos
      </h1>


      <div className="filters">
        <button onClick={() => handleFilter("todos")}>
          Todos
        </button>

        <button onClick={() => handleFilter("bebidas")}>
          Bebidas
        </button>

        <button onClick={() => handleFilter("snacks")}>
          Snacks
        </button>

        <button onClick={() => handleFilter("golosinas")}>
          Golosinas
        </button>

        <button onClick={() => handleFilter("varios")}>
          Varios
        </button>
      </div>


      <div className="products-grid">
        {
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        }
      </div>

    </section>
  );
}
