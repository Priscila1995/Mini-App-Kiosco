import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container empty-state">
      <p className="page-kicker">404</p>
      <h1>Esta góndola está vacía</h1>
      <p>La página no existe o se fue del kiosco.</p>
      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
