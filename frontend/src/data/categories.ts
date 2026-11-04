import kiosquitoImg from "../assets/products/kiosquito.png";
import bebidasImg from "../assets/products/bebidas.png";
import snacksImg from "../assets/products/snacks.png";
import golosinasImg from "../assets/products/dulces.png";
import variosImg from "../assets/products/fosforos.png";
import type { Category } from "../types";

export type CatalogFilter = Category | "todos";

export const catalogCategories: {
  slug: CatalogFilter;
  label: string;
  hint: string;
  image: string;
}[] = [
  { slug: "todos", label: "Todos", hint: "El kiosco entero", image: kiosquitoImg },
  { slug: "bebidas", label: "Bebidas", hint: "Frías y al toque", image: bebidasImg },
  { slug: "snacks", label: "Snacks", hint: "Para picar ahora", image: snacksImg },
  { slug: "golosinas", label: "Golosinas", hint: "El antojo dulce", image: golosinasImg },
  { slug: "varios", label: "Varios", hint: "Lo de todos los días", image: variosImg },
];
