import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader
        eyebrow="Qayalı Sport"
        title="Admin dashboard"
        text="Məhsul/post paylaş, redaktə et, sil və admin təhlükəsizliyini idarə et."
        action={
          <Link className="admin-primary" to="/admin/products/new">
            Yeni post əlavə et
          </Link>
        }
      />

      <section className="admin-cards">
        <article>
          <span>01</span>
          <h2>Paylaşımlar</h2>
          <p>
            Şəkil, başlıq, açıqlama və qiymət Cloudinary + MongoDB üzərindən
            idarə olunur.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Saytda görünür</h2>
          <p>
            Əlavə etdiyin postlar Ana səhifə, Kataloq və Media bölmələrində
            avtomatik göstərilir.
          </p>
        </article>
        <article>
          <span>03</span>
          <h2>Təhlükəsizlik</h2>
          <p>Admin şifrəsini Ayarlar bölməsindən istədiyin vaxt dəyişə bilərsən.</p>
        </article>
      </section>
    </>
  );
}
