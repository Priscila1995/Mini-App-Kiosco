import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1>Bienvenido a Kiosco El Rápido</h1>

      <p>
        Encontrá bebidas, snacks, golosinas y productos varios.
      </p>

      <Link to="/products">
        Ver productos
      </Link>
    </section>
  );
}
