import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function Cart() {
  const navigate = useNavigate();
  const { openCart } = useCartDrawer();

  useEffect(() => {
    openCart();
    navigate("/products", { replace: true });
  }, [navigate, openCart]);

  return null;
}
