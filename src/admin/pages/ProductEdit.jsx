import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingPanel } from "../../components/LoadingStates";
import { adminRequest, updateProduct } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import ProductForm from "../components/ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function loadProduct() {
      try {
        const data = await adminRequest(`/api/products/${id}?track=0`, {
          signal: controller.signal,
        });

        if (!ignore) {
          setProduct(data);
          setError("");
        }
      } catch {
        if (!ignore) {
          setError("Post məlumatları yüklənmədi.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  async function submit(formData) {
    setError("");
    setSaving(true);

    try {
      await updateProduct(id, formData);
      navigate("/admin/products");
    } catch (updateError) {
      setError(
        updateError.message ||
          "Dəyişiklik saxlanmadı. Şəkli və məlumatları yoxlayıb yenidən cəhd edin.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader
        eyebrow="Məhsullar"
        title="Postu redaktə et"
        text="Başlıq, açıqlama, qiymət və şəkil məlumatlarını yeniləyin."
        action={
          <Link className="admin-secondary admin-header-action" to="/admin/products">
            <ArrowLeft size={18} />
            Geri qayıt
          </Link>
        }
      />
      {error && <p className="admin-error">{error}</p>}
      {loading && (
        <LoadingPanel
          title="Post yüklənir"
          text="Redaktə məlumatları hazırlanır."
        />
      )}
      {product && !loading && (
        <ProductForm
          initialProduct={product}
          loading={saving}
          loadingTitle="Post yenilənir"
          loadingText="Dəyişikliklər saxlanılır."
          onSubmit={submit}
          submitLabel="Yenilə"
        />
      )}
    </>
  );
}
