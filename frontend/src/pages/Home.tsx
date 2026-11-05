import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductsFeedback from "../components/ProductsFeedback";
import { useProducts } from "../hooks/useProducts";
import heroCharacter from "../assets/products/gordo.png";
import "./Home.css";

export default function Home() {
  const { products, loading, error, reload } = useProducts();
  const featured = products.slice(0, 3);

  return (
    <div className="home">
      <section className="hero-stage">
        <div className="hero-rings" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-orb hero-orb-a" aria-hidden="true" />
        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <span className="hero-speck hero-speck-a" aria-hidden="true" />
        <span className="hero-speck hero-speck-b" aria-hidden="true" />
        <span className="hero-rule" aria-hidden="true" />

        <div className="hero-copy">
          <h1>
            Pensamos en vos
            <br />
            y en tus antojos{" "}
            <span className="hero-247">
              24/7!
            </span>
          </h1>
          <p className="hero-lead">
            Sabemos que los antojos no tienen horarios específicos, por eso estamos siempre disponibles con todo lo que te gusta!
          </p>
          <Link className="hero-cta" to="/products">
            Ver productos
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-halo" aria-hidden="true" />
          <div className="hero-halo hero-halo-soft" aria-hidden="true" />
          <div className="hero-figure">
            <img src={heroCharacter} alt="Personaje del kiosco con antojos" />
          </div>
        </div>
      </section>

      <section className="container home-section home-section-last">
        <header className="page-head">
          <p className="page-kicker">Destacados</p>
          <h2>Para llevar ahora</h2>
        </header>
        <ProductsFeedback loading={loading} error={error} onRetry={reload} />
        <div className="home-featured">
          {featured.map((product) => (
            <div key={product.id} className="home-featured-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
