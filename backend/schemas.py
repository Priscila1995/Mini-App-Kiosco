from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Category = Literal["bebidas", "snacks", "golosinas", "varios"]


class ProductBase(BaseModel):
    # strip: un nombre con solo espacios queda vacío y falla min_length
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1)
    category: Category
    price: float = Field(gt=0)
    stock: int = Field(ge=0)
    description: str | None = None


class ProductOut(ProductBase):
    # from_attributes: permite construirlo directo desde el modelo SQLAlchemy
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)

    id: int


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemOut(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    unit_price: float


class OrderOut(BaseModel):
    id: int
    created_at: datetime
    total: float
    items: list[OrderItemOut]
