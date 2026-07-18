import { Save } from "lucide-react";
import { useMemo, useState } from "react";

const emptyProduct = {
  title: "",
  description: "",
  price: "",
};

export default function ProductForm({
  initialProduct,
  submitLabel = "Yadda saxla",
  onSubmit,
}) {
  const initialValues = useMemo(
    () => ({
      ...emptyProduct,
      title: initialProduct?.title || "",
      description: initialProduct?.description || "",
      price: initialProduct?.price ?? "",
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

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <label>
        Başlıq
        <input
          name="title"
          value={values.title}
          onChange={updateField}
          placeholder="Məs: Yeni model idman ayaqqabısı"
          required
        />
      </label>

      <label>
        Açıqlama
        <textarea
          name="description"
          value={values.description}
          onChange={updateField}
          placeholder="Məhsul və ya post haqqında qısa məlumat"
          rows={5}
        />
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
        />
      </label>

      <label>
        Şəkil
        <input
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] || null)}
          required={!initialProduct}
          type="file"
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

      <button className="admin-primary" type="submit">
        <Save size={18} />
        {submitLabel}
      </button>
    </form>
  );
}
