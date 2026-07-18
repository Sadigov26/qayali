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

const descriptionCharacterLimit = 700;
const imageSizeLimit = 6 * 1024 * 1024;

function formatFileSize(size = 0) {
  if (!size) {
    return "";
  }

  if (size < 1024 * 1024) {
    return `${Math.max(size / 1024, 1).toFixed(0)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

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
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionCharacterCount = values.description.length;

  function updateField(event) {
    if (event.target.name === "description") {
      setDescriptionError("");
    }

    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function updateImage(event) {
    const selectedImage = event.target.files?.[0] || null;

    if (selectedImage && selectedImage.size > imageSizeLimit) {
      setImage(null);
      setImageError(
        `Şəkil maksimum 6MB ola bilər. Seçilən şəkil ${formatFileSize(
          selectedImage.size,
        )}-dır.`,
      );
      event.target.value = "";
      return;
    }

    setImage(selectedImage);
    setImageError("");
  }

  function submit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!initialProduct && !image) {
      setImageError("Post paylaşmaq üçün şəkil seçin.");
      return;
    }

    if (descriptionCharacterCount > descriptionCharacterLimit) {
      setDescriptionError(
        `Açıqlama maksimum ${descriptionCharacterLimit} karakter ola bilər.`,
      );
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
            maxLength={descriptionCharacterLimit}
            name="description"
            value={values.description}
            onChange={updateField}
            placeholder="Məhsul və ya post haqqında ətraflı məlumat"
            rows={7}
            disabled={loading}
          />
          <small
            className={
              descriptionCharacterCount > descriptionCharacterLimit
                ? "admin-field-error"
                : undefined
            }
          >
            {descriptionCharacterCount}/{descriptionCharacterLimit} karakter
          </small>
          {descriptionError && (
            <small className="admin-field-error">{descriptionError}</small>
          )}
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
          <div className="admin-image-actions">
            <span className="admin-file-box">
              <ImageUp size={18} />
              Şəkil seç və ya çək
              <input
                accept="image/*"
                onChange={updateImage}
                type="file"
                disabled={loading}
              />
            </span>
          </div>
          {image && (
            <div className="admin-selected-file">
              <span>Şəkil seçildi</span>
              <strong>{image.name || "Kamera şəkli"}</strong>
              {image.size > 0 && <small>{formatFileSize(image.size)}</small>}
            </div>
          )}
          {imageError && <small className="admin-field-error">{imageError}</small>}
          <small>
            Tələblər: maksimum 6MB, yalnız şəkil faylı. JPG, PNG və WEBP uyğundur.
            Telefonda qalereyadan seçə və ya kamera ilə çəkə bilərsiniz. Şəkil
            optimizasiya olunur.
          </small>
        </label>

        {initialProduct?.imageUrl && !image && (
          <img
            className="admin-preview"
            src={initialProduct.imageUrl}
            alt={initialProduct.title}
          />
        )}

        <button
          className="admin-primary"
          type="submit"
          disabled={loading || descriptionCharacterCount > descriptionCharacterLimit}
        >
          <Save size={18} />
          {loading ? "Gözləyin..." : submitLabel}
        </button>
      </form>
    </>
  );
}
