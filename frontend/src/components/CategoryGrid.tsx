import { Link, useSearchParams } from "react-router-dom";
import { catalogCategories } from "../data/categories";
import "./CategoryGrid.css";

interface CategoryGridProps {
  active?: string | null;
  onSelect?: () => void;
}

export default function CategoryGrid({ active, onSelect }: CategoryGridProps) {
  const [searchParams] = useSearchParams();

  const toCategory = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (slug === "todos") {
      next.delete("category");
    } else {
      next.set("category", slug);
    }
    const query = next.toString();
    return query ? `/products?${query}` : "/products";
  };

  const isActive = (slug: string) =>
    slug === "todos" ? !active : active === slug;

  return (
    <div className="category-grid">
      {catalogCategories.map((category) => (
        <Link
          key={category.slug}
          className={`category-card${isActive(category.slug) ? " is-active" : ""}`}
          to={toCategory(category.slug)}
          onClick={onSelect}
        >
          <div className="category-visual">
            <img src={category.image} alt="" />
          </div>
          <div className="category-sign">
            <h3>{category.label}</h3>
            <p>{category.hint}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
