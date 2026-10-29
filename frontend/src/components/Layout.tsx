import { Outlet } from "react-router-dom";

// TODO (Persona A): reemplazar por <Header />, <Outlet /> y <Footer />.
export default function Layout() {
  return (
    <div>
      <header>Header (placeholder)</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer (placeholder)</footer>
    </div>
  );
}
