from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import Product
from schemas import Category, ProductOut

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(
    category: Category | None = None,
    db: Session = Depends(get_db),
):
    # Sin category devuelve todos. Una categoría inválida la rechaza Pydantic con 422.
    stmt = select(Product).order_by(Product.id)
    if category is not None:
        stmt = stmt.where(Product.category == category)
    return db.scalars(stmt).all()
