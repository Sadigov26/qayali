import { Edit3, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function formatPrice(price) {
  if (price === undefined || price === null || price === "") {
    return "Qiymət qeyd olunmayıb";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return `${numericPrice.toFixed(2)} ₼`;
}

export default function ProductTable({ products, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="admin-empty">
        <strong>Hələ məhsul yoxdur</strong>
        <p>İlk məhsulu əlavə etdikdən sonra burada görünəcək.</p>
      </div>
    );
  }

  return (
    <div className="admin-products-grid">
      {products.map((product) => (
        <article className="admin-product-card" key={product._id}>
          <Link className="admin-product-media" to={`/post/${product._id}`}>
            <img src={product.imageUrl} alt={product.title} loading="lazy" />
          </Link>

          <div className="admin-product-body">
            <span>{product.category || "Ümumi"}</span>
            <h3 title={product.title}>{product.title}</h3>
            <p title={product.description}>{product.description}</p>

            <div className="admin-product-meta">
              <strong>{formatPrice(product.price)}</strong>
              <div>
                <small>
                  {new Date(product.createdAt).toLocaleDateString("az-AZ", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </small>
                <small>{product.views || 0} baxış</small>
              </div>
            </div>

            <div className="admin-actions">
              <Link to={`/post/${product._id}`} title="Saytda bax">
                <Eye size={17} />
              </Link>
              <Link to={`/admin/products/${product._id}/edit`} title="Redaktə et">
                <Edit3 size={17} />
              </Link>
              <button
                onClick={() => onDelete(product)}
                title="Sil"
                type="button"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
