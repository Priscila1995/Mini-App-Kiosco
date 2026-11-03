from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models  # noqa: F401  (registra las tablas en Base antes de create_all)
from database import Base, engine
from routers import orders, products


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crea las tablas si no existen al arrancar el servidor
    Base.metadata.create_all(bind=engine)
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
