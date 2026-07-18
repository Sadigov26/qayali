import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import { loginAdmin, setAdminToken } from "../api/adminApi";
import "../styles/Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(form);
      setAdminToken(data.token);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <SEO
        title="Admin giriş"
        description="Qayalı Sport idarəetmə panelinə giriş."
      />
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-icon">
          <ShieldCheck />
        </div>
        <span>Qayalı Sport</span>
        <h1>Giriş</h1>

        <label>
          İstifadəçi adı
          <input
            autoComplete="username"
            placeholder="İstifadəçi adını yazın"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                username: event.target.value,
              }))
            }
            required
            value={form.username}
          />
        </label>

        <label>
          Şifrə
          <input
            autoComplete="current-password"
            placeholder="Şifrənizi yazın"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            required
            type="password"
            value={form.password}
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button className="admin-primary" disabled={loading} type="submit">
          {loading ? "Yoxlanılır..." : "Daxil ol"}
        </button>
      </form>
    </main>
  );
}
