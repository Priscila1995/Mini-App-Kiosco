# Kiosco El Rápido (frontend)

Mini-app de un kiosco de barrio: catálogo de productos con filtro por categoría, detalle de cada producto y carrito de compras con pedido simulado.

Stack: Vite + React 19 + TypeScript + `react-router-dom`.

## Cómo correrlo

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

Se abre en la URL que muestra Vite (por defecto http://localhost:5173).

## Otros comandos

- `npm run build`: chequeo de TypeScript y build de producción.
- `npm run lint`: análisis con oxlint.

## Rutas

| Ruta            | Página        |
|-----------------|---------------|
| `/`             | Inicio        |
| `/products`     | Catálogo (filtro con `?category=`) |
| `/products/:id` | Detalle       |
| `/cart`         | Carrito       |
| `*`             | 404           |

## Estado actual

Parte 1: los productos salen de datos mock (`src/data/products.ts`) y "Finalizar pedido" solo simula el éxito y vacía el carrito.
