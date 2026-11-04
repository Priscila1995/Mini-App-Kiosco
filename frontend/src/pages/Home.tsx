import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <span className="home-tag">
          Kiosco 24/7
        </span>

        <h1>
          Todo lo que querés,
          <br />
          cuando lo necesitás.
        </h1>

        <p>
          Encontrá bebidas, snacks, golosinas y productos varios
          en un solo lugar.
        </p>

        <Link className="home-button" to="/products">
          Ver productos
        </Link>
      </div>

      <div className="home-decoration">
        🥤 🍟 🍫
      </div>
    </section>
  );
}
