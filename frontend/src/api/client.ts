import { productImages } from "../data/productImages";
import type { Category, Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

// Cuerpo del pedido: solo id y cantidad (el precio y el total los calcula el servidor)
export interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  created_at: string;
  total: number;
  items: OrderItem[];
}

// Error de la API con el status HTTP, para que las pantallas distingan 404, 400, etc.
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    // fetch solo falla por problemas de red (backend apagado, CORS, etc.)
    throw new ApiError("No se pudo conectar con el servidor", 0);
  }

  if (!response.ok) {
    // El backend responde {"detail": "mensaje"}; si no viene, usamos un texto genérico
    let message = "Ocurrió un error inesperado";
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
    } catch {
      // la respuesta no era JSON, se deja el mensaje genérico
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

// La API no manda image: se completa desde el mapa local por id
function withImage(product: Product): Product {
  return { ...product, image: productImages[product.id] };
}

export async function getProducts(category?: Category | null): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const products = await request<Product[]>(`/api/products${query}`);
  return products.map(withImage);
}

export async function getProductById(id: number | string): Promise<Product> {
  const product = await request<Product>(`/api/products/${id}`);
  return withImage(product);
}

export function createOrder(items: OrderItemInput[]): Promise<Order> {
  return request<Order>("/api/orders", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}
