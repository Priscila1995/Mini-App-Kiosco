# Kiosco El Rápido

Mini-app de un kiosco de barrio: catálogo, filtros, detalle, carrito y pedidos contra una API (FastAPI + SQLite).

Hay que levantar **backend y frontend**. El orden importa: primero la API.

## 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- API: http://127.0.0.1:8000
- Documentación: http://127.0.0.1:8000/docs

Al arrancar se crea `kiosco.db` y se cargan 10 productos si la tabla está vacía.

## 2. Frontend

En otra terminal:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

La app queda en http://localhost:5173 y usa `VITE_API_URL` (por defecto `http://127.0.0.1:8000`).

Más detalle en `backend/README.md` y `frontend/README.md`.
