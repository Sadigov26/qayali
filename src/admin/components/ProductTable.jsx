import { Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Şəkil</th>
            <th>Başlıq</th>
            <th>Qiymət</th>
            <th>Tarix</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.imageUrl} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <small>{product.description}</small>
              </td>
              <td>{product.price ? `${product.price} ₼` : "—"}</td>
              <td>{new Date(product.createdAt).toLocaleDateString("az-AZ")}</td>
              <td className="admin-actions">
                <Link to={`/admin/products/${product._id}/edit`}>
                  <Edit3 size={17} />
                </Link>
                <button onClick={() => onDelete(product)} type="button">
                  <Trash2 size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
