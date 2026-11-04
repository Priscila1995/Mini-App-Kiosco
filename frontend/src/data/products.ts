import type { Product } from "../types";
import coca from "../assets/products/coca.png";
import agua from "../assets/products/agua.png";
import lays from "../assets/products/lays.png";
import alfajor from "../assets/products/alfajor.png";
import chicles from "../assets/products/chicles.png";
import cigarrillos from "../assets/products/cigarrillos.png";
import gatoradde from "../assets/products/gatoradde.png";
import mani from "../assets/products/mani.png";
import menta from "../assets/products/menta.png";
import encendedor from "../assets/products/encendedor.png";

export const products: Product[] = [
  { id: 1, name: "Coca-Cola 500ml", category: "bebidas", price: 1200, stock: 25, description: "Gaseosa clásica", image: coca },
  { id: 2, name: "Agua mineral 500ml", category: "bebidas", price: 800, stock: 40, description: "Agua sin gas", image: agua},
  { id: 3, name: "Papas Lays Clásicas", category: "snacks", price: 1500, stock: 30, description: "Papas fritas clásicas", image: lays },
  { id: 4, name: "Alfajor Jorgelín", category: "golosinas", price: 900, stock: 50, description: "Alfajor de chocolate", image: alfajor },
  { id: 5, name: "Chicles Trident", category: "golosinas", price: 600, stock: 60, description: "Pack de chicles", image: chicles },
  { id: 6, name: "Cigarrillos", category: "varios", price: 2500, stock: 20, description: "Atado de cigarrillos", image: cigarrillos },
  { id: 7, name: "Gatorade 500ml", category: "bebidas", price: 1800, stock: 15, description: "Bebida isotónica", image: gatoradde },
  { id: 8, name: "Maní salado", category: "snacks", price: 1100, stock: 35, description: "Maní tostado con sal", image: mani },
  { id: 9, name: "Pastillas Mynthon", category: "golosinas", price: 700, stock: 45, description: "Caramelos de menta", image: menta },
  { id: 10, name: "Encendedor", category: "varios", price: 1000, stock: 30, description: "Encendedor descartable", image: encendedor },
];
