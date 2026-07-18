import { ImageUp, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { LoadingOverlay } from "../../components/LoadingStates";
import { defaultCategories } from "../../data/categories";

const emptyProduct = {
  title: "",
  description: "",
  price: "",
  category: "Ümumi",
};

export default function ProductForm({
  initialProduct,
  submitLabel = "Yadda saxla",
  loading = false,
  loadingTitle = "Saxlanılır",
  loadingText = "Məlumatlar hazırlanır.",
  onSubmit,
}) {
  const initialValues = useMemo(
    () => ({
      ...emptyProduct,
      title: initialProduct?.title || "",
      description: initialProduct?.description || "",
      price: initialProduct?.price ?? "",
      category: initialProduct?.category || "Ümumi",
    }),
    [initialProduct],
  );

  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState(null);

  function updateField(event) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function submit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    formData.append("price", values.price);
    formData.append("category", values.category.trim() || "Ümumi");

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  }

  return (
    <>
      {loading && <LoadingOverlay title={loadingTitle} text={loadingText} />}

      <form className="admin-form" onSubmit={submit} aria-busy={loading}>
        <label>
          Başlıq
          <input
            name="title"
            value={values.title}
            onChange={updateField}
            placeholder="Məs: Yeni model idman ayaqqabısı"
            required
            disabled={loading}
          />
          <small>
            Uzun başlıqlar saytda kartlarda qısa, məhsul səhifəsində tam görünür.
          </small>
        </label>

        <label>
          Açıqlama
          <textarea
            name="description"
            value={values.description}
            onChange={updateField}
            placeholder="Məhsul və ya post haqqında ətraflı məlumat"
            rows={7}
            disabled={loading}
          />
        </label>

        <label>
          Kateqoriya
          <input
            list="product-category-options"
            name="category"
            value={values.category}
            onChange={updateField}
            placeholder="Məs: Fitness"
            disabled={loading}
          />
          <datalist id="product-category-options">
            {defaultCategories.map((category) => (
              <option value={category} key={category} />
            ))}
          </datalist>
          <small>
            Yeni kateqoriya yaratmaq üçün sadəcə yeni ad yazmaq kifayətdir.
          </small>
        </label>

        <label>
          Qiymət
          <input
            name="price"
            value={values.price}
            onChange={updateField}
            min="0"
            step="0.01"
            type="number"
            placeholder="Məs: 49.90"
            disabled={loading}
          />
        </label>

        <label>
          Şəkil
          <span className="admin-file-box">
            <ImageUp size={18} />
            {image ? image.name : "Şəkil seç"}
          </span>
          <input
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
            required={!initialProduct}
            type="file"
            disabled={loading}
          />
          <small>Maksimum 3MB. JPG, PNG və WEBP faylları qəbul olunur.</small>
        </label>

        {initialProduct?.imageUrl && !image && (
          <img
            className="admin-preview"
            src={initialProduct.imageUrl}
            alt={initialProduct.title}
          />
        )}

        <button className="admin-primary" type="submit" disabled={loading}>
          <Save size={18} />
          {loading ? "Gözləyin..." : submitLabel}
        </button>
      </form>
    </>
  );
}
