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

// La API no devuelve imágenes (la tabla products no tiene ese campo),
// así que el front las asocia por id de producto (mismo orden que el seed).
export const productImages: Record<number, string> = {
  1: coca,
  2: agua,
  3: lays,
  4: alfajor,
  5: chicles,
  6: cigarrillos,
  7: gatoradde,
  8: mani,
  9: menta,
  10: encendedor,
};
