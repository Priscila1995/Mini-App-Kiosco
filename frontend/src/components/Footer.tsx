import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-mark">
            <span className="brand-mark" aria-hidden="true">R</span>
            Kiosco El Rápido
          </p>
          <p className="footer-tagline">Tus antojos favoritos, siempre cerca y a cualquier hora!</p>
        </div>

        <div className="footer-block">
          <p className="footer-label">Ubicación</p>
          <p>San Martin 1245</p>
          <p>Tel: 3865 - 234589</p>
          <p>Concepción, Tucumán, Argentina</p>
        </div>

        <div className="footer-block">
          <p className="footer-label">Desarrolladores</p>
          <ul className="footer-devs">
            <li>Gonzalez Ricardo Joaquin</li>
            <li>Romero Priscila</li>
            <li>Rodriguez Agustina</li>
          </ul>
        </div>
      </div>

      <div className="footer-base">
        <div className="container">
          <p>Kiosco El Rápido © 2026. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
