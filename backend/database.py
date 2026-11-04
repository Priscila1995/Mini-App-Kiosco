from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Base SQLite en un archivo local (ignorado por git: *.db)
DATABASE_URL = "sqlite:///./kiosco.db"

# check_same_thread=False: FastAPI atiende cada request en un hilo distinto
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    """Dependencia de FastAPI: abre una sesión por request y la cierra al terminar."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
