import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductForm from "../components/ProductForm";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(formData) {
    setError("");

    try {
      await createProduct(formData);
      navigate("/admin/products");
    } catch (createError) {
      setError(createError.message);
    }
  }

  return (
    <>
      <AdminHeader
        eyebrow="Məhsullar"
        title="Yeni post əlavə et"
        text="Şəkil Cloudinary-yə yüklənəcək, məlumat MongoDB-də saxlanacaq."
      />
      {error && <p className="admin-error">{error}</p>}
      <ProductForm onSubmit={submit} submitLabel="Əlavə et" />
    </>
  );
}
