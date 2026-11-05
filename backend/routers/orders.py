import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import Order, Product
from schemas import OrderCreate, OrderItemOut, OrderOut

router = APIRouter(prefix="/api/orders", tags=["orders"])


def _order_to_out(order: Order) -> OrderOut:
    items = [OrderItemOut(**item) for item in json.loads(order.items_json)]
    return OrderOut(id=order.id, created_at=order.created_at, total=order.total, items=items)


@router.get("", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    orders = db.scalars(select(Order).order_by(Order.id.desc())).all()
    return [_order_to_out(order) for order in orders]


@router.post("", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    # Si el mismo producto viene dos veces, se suma la cantidad
    quantities: dict[int, int] = {}
    for item in payload.items:
        quantities[item.product_id] = quantities.get(item.product_id, 0) + item.quantity

    pending: list[tuple[Product, int]] = []
    for product_id, quantity in quantities.items():
        product = db.get(Product, product_id)
        if product is None:
            raise HTTPException(status_code=404, detail=f"Producto {product_id} no encontrado")
        if product.stock < quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {product.name}",
            )
        pending.append((product, quantity))

    lines: list[OrderItemOut] = []
    total = 0.0
    for product, quantity in pending:
        product.stock -= quantity
        line = OrderItemOut(
            product_id=product.id,
            product_name=product.name,
            quantity=quantity,
            unit_price=product.price,
        )
        lines.append(line)
        total += product.price * quantity

    order = Order(total=total, items_json=json.dumps([line.model_dump() for line in lines]))
    db.add(order)
    db.commit()
    db.refresh(order)
    return _order_to_out(order)
