import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOverlay, ProductSkeletonGrid } from "../../components/LoadingStates";
import SEO from "../../components/SEO";
import { defaultCategories } from "../../data/categories";
import { deleteProduct, getProducts, getProductStats } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductTable from "../components/ProductTable";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });
  const [categoryStats, setCategoryStats] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [deletingTitle, setDeletingTitle] = useState("");

  const categoryOptions = useMemo(() => {
    const dynamicCategories = categoryStats.map((item) => item.category);
    return [...new Set(["all", ...defaultCategories, ...dynamicCategories])];
  }, [categoryStats]);

  async function loadProducts(page = 1, nextFilters = {}) {
    const selectedCategory = nextFilters.category ?? category;
    const selectedSort = nextFilters.sort ?? sort;

    setLoading(true);
    setError("");

    try {
      const data = await getProducts(page, 20, {
        category: selectedCategory,
        sort: selectedSort,
      });

      setProducts((current) =>
        page === 1 ? data.items : [...current, ...data.items],
      );
      setPageInfo({ page: data.page, totalPages: data.totalPages });
    } catch {
      setError("Məlumatlar yüklənmədi.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }

  async function loadStats() {
    try {
      const data = await getProductStats();
      setCategoryStats(data.categoryStats || []);
    } catch {
      setCategoryStats([]);
    }
  }

  async function removeProduct(product) {
    const confirmed = window.confirm(`${product.title} silinsin?`);

    if (!confirmed) {
      return;
    }

    setDeletingTitle(product.title);
    setError("");

    try {
      await deleteProduct(product._id);
      setProducts((current) =>
        current.filter((item) => item._id !== product._id),
      );
      await loadStats();
    } catch {
      setError("Post silinmədi. Yenidən cəhd edin.");
    } finally {
      setDeletingTitle("");
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      setLoading(true);
      setError("");

      try {
        const [productData, statsData] = await Promise.all([
          getProducts(1, 20, { category, sort }),
          getProductStats(),
        ]);

        if (!ignore) {
          setProducts(productData.items);
          setPageInfo({
            page: productData.page,
            totalPages: productData.totalPages,
          });
          setCategoryStats(statsData.categoryStats || []);
        }
      } catch {
        if (!ignore) {
          setError("Məlumatlar yüklənmədi.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setInitialLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, [category, sort]);

  function changeCategory(event) {
    setInitialLoading(true);
    setCategory(event.target.value);
  }

  function changeSort(event) {
    setInitialLoading(true);
    setSort(event.target.value);
  }

  return (
    <>
      <SEO
        title="Admin məhsullar"
        description="Qayalı Sport məhsul və post idarəetməsi."
      />
      {deletingTitle && (
        <LoadingOverlay
          title="Post silinir"
          text={`${deletingTitle} silinir, zəhmət olmasa gözləyin.`}
        />
      )}

      <AdminHeader
        eyebrow="Məhsullar"
        title="Məhsul və postlar"
        text="Şəkilli postları buradan əlavə et, kateqoriyalaşdır, redaktə et və sil."
        action={
          <Link className="admin-primary" to="/admin/products/new">
            <Plus size={18} />
            Yeni post
          </Link>
        }
      />

      <div className="admin-toolbar">
        <label>
          Kateqoriya
          <select value={category} onChange={changeCategory}>
            {categoryOptions.map((option) => (
              <option value={option} key={option}>
                {option === "all" ? "Hamısı" : option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sıralama
          <select value={sort} onChange={changeSort}>
            <option value="newest">Ən yeni</option>
            <option value="oldest">Ən köhnə</option>
            <option value="views">Ən çox baxılan</option>
          </select>
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {initialLoading ? (
        <ProductSkeletonGrid count={4} />
      ) : (
        <ProductTable products={products} onDelete={removeProduct} />
      )}

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
