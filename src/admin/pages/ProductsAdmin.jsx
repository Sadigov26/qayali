import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductTable from "../components/ProductTable";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadProducts(page = 1) {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts(page);
      setProducts((current) =>
        page === 1 ? data.items : [...current, ...data.items],
      );
      setPageInfo({ page: data.page, totalPages: data.totalPages });
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(product) {
    const confirmed = window.confirm(`${product.title} silinsin?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(product._id);
      setProducts((current) =>
        current.filter((item) => item._id !== product._id),
      );
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await getProducts(1);

        if (!ignore) {
          setProducts(data.items);
          setPageInfo({ page: data.page, totalPages: data.totalPages });
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialProducts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <AdminHeader
        eyebrow="MongoDB + Cloudinary"
        title="Məhsul və postlar"
        text="Bütün şəkilli postları buradan əlavə et, redaktə et və sil."
        action={
          <Link className="admin-primary" to="/admin/products/new">
            <Plus size={18} />
            Yeni post
          </Link>
        }
      />

      {error && <p className="admin-error">{error}</p>}

      <ProductTable products={products} onDelete={removeProduct} />

      {pageInfo.page < pageInfo.totalPages && (
        <button
          className="admin-secondary"
          disabled={loading}
          onClick={() => loadProducts(pageInfo.page + 1)}
          type="button"
        >
          {loading ? "Yüklənir..." : "Daha çox göstər"}
        </button>
      )}
    </>
  );
}
