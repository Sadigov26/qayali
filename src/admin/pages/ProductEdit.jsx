import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminRequest, updateProduct } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductForm from "../components/ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest(`/api/products/${id}`)
      .then(setProduct)
      .catch((loadError) => setError(loadError.message));
  }, [id]);

  async function submit(formData) {
    setError("");

    try {
      await updateProduct(id, formData);
      navigate("/admin/products");
    } catch (updateError) {
      setError(updateError.message);
    }
  }

  return (
    <>
      <AdminHeader
        eyebrow="Məhsullar"
        title="Postu redaktə et"
        text="Yeni şəkil seçilərsə köhnə şəkil Cloudinary-dən silinəcək."
      />
      {error && <p className="admin-error">{error}</p>}
      {product && (
        <ProductForm
          initialProduct={product}
          onSubmit={submit}
          submitLabel="Yenilə"
        />
      )}
    </>
  );
}
