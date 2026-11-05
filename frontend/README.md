# Kiosco El Rápido (frontend)

SPA del kiosco: Vite + React + TypeScript + React Router. Los productos y los pedidos salen de la API (`GET /api/products`, `POST /api/orders`).

## Cómo correrlo

El backend tiene que estar levantado (ver el README de la raíz o `backend/README.md`).

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Se abre en la URL que muestra Vite (por defecto http://localhost:5173).

`.env` define `VITE_API_URL=http://127.0.0.1:8000`. Si no existe `.env`, el cliente usa esa misma URL.

## Otros comandos

- `npm run build`: chequeo de TypeScript y build de producción.
- `npm run lint`: análisis con oxlint.

## Rutas

| Ruta            | Página        |
|-----------------|---------------|
| `/`             | Inicio        |
| `/products`     | Catálogo (filtro con `?category=`; el backend filtra) |
| `/products/:id` | Detalle       |
| `/cart`         | Carrito       |
| `*`             | 404           |

## Estado actual

Parte 2: el catálogo y el detalle se cargan desde FastAPI. "Finalizar pedido" envía `POST /api/orders`, muestra carga, confirma el éxito o un error visible (red, stock, validación). Las imágenes siguen en el front (`src/data/productImages.ts`).
