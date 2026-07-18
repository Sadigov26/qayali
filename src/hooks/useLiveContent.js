import { useEffect, useMemo, useState } from "react";
import { products as fallbackProducts } from "../data/products";

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

function normalizeBackendProduct(product, index) {
  return {
    id: product._id || product.id || index + 1,
    displayIndex: String(index + 1).padStart(2, "0"),
    name: product.title || product.name,
    detail: product.description || product.detail || "Qayalı Sport məhsulu",
    price: formatPrice(product.price),
    image: product.imageUrl || product.image,
    source: product.source,
    createdAt: product.createdAt,
  };
}

function normalizeFallbackProduct(product, index) {
  return {
    ...product,
    displayIndex: String(index + 1).padStart(2, "0"),
  };
}

export function useLiveContent() {
  const fallback = useMemo(
    () => fallbackProducts.map(normalizeFallbackProduct),
    [],
  );
  const [products, setProducts] = useState(fallback);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAdminProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products?page=1&limit=50`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Admin məhsulları yüklənmədi");
        }

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];

        if (items.length > 0) {
          setProducts(items.map(normalizeBackendProduct));
          setLive(true);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setLive(false);
        }
      }
    }

    loadAdminProducts();

    return () => controller.abort();
  }, []);

  return {
    products,
    posts: products,
    comments: [],
    live,
  };
}
