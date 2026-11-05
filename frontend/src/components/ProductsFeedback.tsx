interface ProductsFeedbackProps {
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}

// Mensaje visible de carga o de error (con botón para reintentar)
export default function ProductsFeedback({ loading, error, onRetry }: ProductsFeedbackProps) {
  if (loading) {
    return (
      <p className="catalog-empty" role="status">
        Cargando productos...
      </p>
    );
  }

  if (error) {
    return (
      <div className="catalog-error" role="alert">
        <p>No se pudieron cargar los productos. Intentá de nuevo.</p>
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    );
  }

  return null;
}
