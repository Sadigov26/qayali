import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductForm from "../components/ProductForm";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(formData) {
    setError("");
    setSaving(true);

    try {
      await createProduct(formData);
      navigate("/admin/products");
    } catch {
      setError("Post paylaşılmadı. Şəkli və məlumatları yoxlayıb yenidən cəhd edin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader
        eyebrow="Məhsullar"
        title="Yeni post əlavə et"
        text="Şəkil, başlıq və məhsul məlumatlarını əlavə edin."
        action={
          <Link className="admin-secondary admin-header-action" to="/admin/products">
            <ArrowLeft size={18} />
            Geri qayıt
          </Link>
        }
      />
      {error && <p className="admin-error">{error}</p>}
      <ProductForm
        loading={saving}
        loadingTitle="Post əlavə edilir"
        loadingText="Şəkil və məlumatlar saxlanılır."
        onSubmit={submit}
        submitLabel="Əlavə et"
      />
    </>
  );
}
