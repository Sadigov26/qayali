export function LoadingPanel({
  eyebrow = "QAYALI SPORT",
  title = "Yüklənir",
  text = "Məlumatlar hazırlanır.",
}) {
  return (
    <div className="loading-panel">
      <span>{eyebrow}</span>
      <div className="loading-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

export function LoadingOverlay({
  title = "İcra olunur",
  text = "Zəhmət olmasa gözləyin.",
}) {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-modal">
        <div className="loading-spinner" aria-hidden="true" />
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 4 }) {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, index) => (
        <article className="product-card product-skeleton" key={index}>
          <div className="product-visual" />
          <div className="product-info">
            <span />
            <h3 />
            <p />
            <div className="product-bottom">
              <strong />
              <i />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
