import { LogOut, Package, PlusCircle, Settings, ShieldCheck } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken } from "../api/adminApi";
import "../styles/Admin.css";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: ShieldCheck, end: true },
  { to: "/admin/products", label: "Məhsullar", icon: Package },
  { to: "/admin/products/new", label: "Yeni post", icon: PlusCircle },
  { to: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink to="/" className="admin-brand">
          <span>Q</span>
          <div>
            <strong>Qayalı Sport</strong>
            <small>Admin panel</small>
          </div>
        </NavLink>

        <nav className="admin-nav">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout} type="button">
          <LogOut size={18} />
          Çıxış
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
