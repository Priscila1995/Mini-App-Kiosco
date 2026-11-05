from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Product
from schemas import ProductBase

# Productos iniciales (ids 1-10). Las fotos del front se mapean por id en productImages.ts.
INITIAL_PRODUCTS = [
    {"name": "Coca-Cola 500ml", "category": "bebidas", "price": 1200, "stock": 25, "description": "Gaseosa clásica"},
    {"name": "Agua mineral 500ml", "category": "bebidas", "price": 800, "stock": 40, "description": "Agua sin gas"},
    {"name": "Papas Lays Clásicas", "category": "snacks", "price": 1500, "stock": 30, "description": "Papas fritas clásicas"},
    {"name": "Alfajor Jorgelín", "category": "golosinas", "price": 900, "stock": 50, "description": "Alfajor de chocolate"},
    {"name": "Chicles Trident", "category": "golosinas", "price": 600, "stock": 60, "description": "Pack de chicles"},
    {"name": "Cigarrillos", "category": "varios", "price": 2500, "stock": 20, "description": "Atado de cigarrillos"},
    {"name": "Gatorade 500ml", "category": "bebidas", "price": 1800, "stock": 15, "description": "Bebida isotónica"},
    {"name": "Maní salado", "category": "snacks", "price": 1100, "stock": 35, "description": "Maní tostado con sal"},
    {"name": "Pastillas Mynthon", "category": "golosinas", "price": 700, "stock": 45, "description": "Caramelos de menta"},
    {"name": "Encendedor", "category": "varios", "price": 1000, "stock": 30, "description": "Encendedor descartable"},
]


def seed_products(db: Session) -> None:
    """Carga los productos iniciales solo si la tabla está vacía (no duplica al reiniciar)."""
    if db.scalar(select(Product.id).limit(1)) is not None:
        return
    for data in INITIAL_PRODUCTS:
        # ProductBase valida los datos con las mismas reglas que la API
        db.add(Product(**ProductBase(**data).model_dump()))
    db.commit()
