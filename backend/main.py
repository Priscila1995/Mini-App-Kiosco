from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

app.include_router(products.router)
app.include_router(orders.router)
