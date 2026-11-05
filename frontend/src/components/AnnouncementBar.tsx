import "./AnnouncementBar.css";

const MESSAGES = [
  "El mejor drugstore de Concepción",
  "Abierto las 24hs",
  "Delivery por solo $1000",
];

function MessageGroup({ hidden }: { hidden?: boolean }) {
  const items = [...MESSAGES, ...MESSAGES, ...MESSAGES];

  return (
    <div className="announce-group" aria-hidden={hidden || undefined}>
      {items.map((message, index) => (
        <span key={`${message}-${index}`} className="announce-item">
          {message}
          <span className="announce-sep" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="announce" role="region" aria-label="Avisos del kiosco">
      <div className="announce-track">
        <MessageGroup />
        <MessageGroup hidden />
      </div>
    </div>
  );
}
