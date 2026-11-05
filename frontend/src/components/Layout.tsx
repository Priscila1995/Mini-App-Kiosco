import { Outlet } from "react-router-dom";
import { CartDrawerProvider } from "../context/CartDrawerContext";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import AnnouncementBar from "./AnnouncementBar";

export default function Layout() {
  return (
    <CartDrawerProvider>
      <div className="layout">
        <AnnouncementBar />
        <Header />
        <main className="site-main">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartDrawerProvider>
  );
}
