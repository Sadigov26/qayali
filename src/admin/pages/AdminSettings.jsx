import { KeyRound } from "lucide-react";
import { useState } from "react";
import { changeAdminPassword } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function AdminSettings() {
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updatePasswordField(event) {
    setPasswordForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitPassword(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Yeni şifrə və təkrar şifrə eyni deyil");
      return;
    }

    setLoading(true);

    try {
      await changeAdminPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm(initialPasswordForm);
      setSuccess("Şifrə uğurla dəyişdirildi");
    } catch (changeError) {
      setError(changeError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AdminHeader
        eyebrow="Təhlükəsizlik"
        title="Ayarlar"
        text="Giriş şifrəsini yenilə və hesabı təhlükəsiz saxla."
      />

      <section className="admin-settings-grid">
        <form className="admin-form" onSubmit={submitPassword}>
          <div className="admin-form-title">
            <KeyRound />
            <div>
              <strong>Şifrəni dəyiş</strong>
              <small>Cari şifrə təsdiqləndikdən sonra yeni şifrə aktiv olacaq.</small>
            </div>
          </div>

          <label>
            Cari şifrə
            <input
              autoComplete="current-password"
              name="currentPassword"
              onChange={updatePasswordField}
              required
              type="password"
              value={passwordForm.currentPassword}
            />
          </label>

          <label>
            Yeni şifrə
            <input
              autoComplete="new-password"
              minLength={8}
              name="newPassword"
              onChange={updatePasswordField}
              required
              type="password"
              value={passwordForm.newPassword}
            />
          </label>

          <label>
            Yeni şifrə təkrar
            <input
              autoComplete="new-password"
              minLength={8}
              name="confirmPassword"
              onChange={updatePasswordField}
              required
              type="password"
              value={passwordForm.confirmPassword}
            />
          </label>

          {error && <p className="admin-error">{error}</p>}
          {success && <p className="admin-success">{success}</p>}

          <button className="admin-primary" disabled={loading} type="submit">
            {loading ? "Yenilənir..." : "Şifrəni yenilə"}
          </button>
        </form>

        <article className="admin-empty">
          <strong>Paylaşımlar saytda görünür</strong>
          <p>
            Əlavə etdiyin məhsul və postlar Ana səhifə, Kataloq və Media
            bölmələrində avtomatik göstərilir.
          </p>
        </article>
      </section>
    </>
  );
}
