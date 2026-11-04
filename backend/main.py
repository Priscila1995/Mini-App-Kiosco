from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import models  # noqa: F401  (registra las tablas en Base antes de create_all)
from database import Base, SessionLocal, engine
from routers import orders, products
from seed import seed_products


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crea las tablas si no existen y carga los productos iniciales al arrancar
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_products(db)
    yield


app = FastAPI(title="Kiosco El Rápido API", lifespan=lifespan)

# CORS: permite que el frontend de Vite consuma la API desde otro origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    # Pydantic devuelve una lista de errores; la resumimos en un texto legible
    # para que el front pueda mostrar `detail` directamente.
    mensajes = []
    for err in exc.errors():
        campo = ".".join(str(p) for p in err["loc"] if p not in ("body", "query", "path"))
        mensajes.append(f"{campo}: {err['msg']}" if campo else err["msg"])
    return JSONResponse(status_code=422, content={"detail": "; ".join(mensajes)})


@app.exception_handler(Exception)
async def unhandled_error_handler(request: Request, exc: Exception):
    # Cualquier error no previsto responde 500 con el mismo formato {"detail": ...}
    return JSONResponse(status_code=500, content={"detail": "Error interno del servidor"})


app.include_router(products.router)
app.include_router(orders.router)
