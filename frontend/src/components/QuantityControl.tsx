interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function QuantityControl({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="qty">
      <button
        type="button"
        className="btn btn-icon"
        aria-label="Restar"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span>{value}</span>
      <button
        type="button"
        className="btn btn-icon"
        aria-label="Sumar"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
