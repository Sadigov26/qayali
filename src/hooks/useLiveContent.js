import { useEffect, useMemo, useState } from "react";
import { products as birmarketFallbackProducts } from "../data/products";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_ADMIN_API_URL || "";

function formatPrice(price) {
  if (price == null || price === "") {
    return "";
  }

  if (typeof price === "number") {
    return `${price.toFixed(2)} ₼`;
  }

  return price;
}

function withDisplayIndex(product, index) {
  return {
    ...product,
    displayIndex: String(index + 1).padStart(2, "0"),
  };
}

function normalizeAdminProduct(product, index) {
  return {
    id: product._id || product.id || index + 1,
    displayIndex: String(index + 1).padStart(2, "0"),
    name: product.title || product.name,
    detail: product.description || product.detail || "Qayalı Sport məhsulu",
    price: formatPrice(product.price),
    image: product.imageUrl || product.image,
    category: product.category || "Ümumi",
    views: product.views || 0,
    source: product.source,
    createdAt: product.createdAt,
  };
}

export function useLiveContent() {
  const birmarketProducts = useMemo(
    () => birmarketFallbackProducts.map(withDisplayIndex),
    [],
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAdminProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/api/products?page=1&limit=50`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Məhsullar yüklənmədi");
        }

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];
        setProducts(items.map(normalizeAdminProduct));
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setProducts([]);
          setError(loadError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAdminProducts();

    return () => controller.abort();
  }, []);

  return {
    birmarketProducts,
    products,
    posts: products,
    comments: [],
    live: products.length > 0,
    loading,
    error,
  };
}
