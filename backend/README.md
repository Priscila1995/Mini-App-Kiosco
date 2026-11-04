# Kiosco El Rápido (backend)

API REST del kiosco con FastAPI + SQLite + SQLAlchemy + Pydantic.

## Cómo correrlo

Desde la carpeta `backend` (en Windows):

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- API: http://127.0.0.1:8000
- Documentación interactiva (Swagger): http://127.0.0.1:8000/docs

Al arrancar se crea `kiosco.db` (SQLite) y se cargan los 10 productos iniciales solo si la tabla está vacía, así que reiniciar no duplica datos ni pierde pedidos. `kiosco.db` no se versiona.

## Endpoints

| Método | Ruta                      | Respuesta |
|--------|---------------------------|-----------|
| GET    | `/api/products?category=` | 200 lista de productos; 422 si la categoría es inválida |
| GET    | `/api/products/{id}`      | 200 producto; 404 si no existe |
| POST   | `/api/orders`             | 201 pedido; 404 producto inexistente; 400 stock insuficiente; 422 datos inválidos |
| GET    | `/api/orders`             | 200 lista de pedidos (más recientes primero) |

Los errores siempre responden `{"detail": "mensaje"}`.

## Correr el frontend contra la API

1. Dejar el backend corriendo en el puerto 8000.
2. En `frontend`, copiar `.env.example` a `.env` (define `VITE_API_URL=http://127.0.0.1:8000`).
3. `npm install` y `npm run dev` (http://localhost:5173, el origen permitido por CORS).
