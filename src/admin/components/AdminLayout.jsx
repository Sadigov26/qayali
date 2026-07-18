import { Package, PlusCircle, Settings, ShieldCheck } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Admin.css";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: ShieldCheck, end: true },
  { to: "/admin/products", label: "Məhsullar", icon: Package },
  { to: "/admin/products/new", label: "Yeni post", icon: PlusCircle },
  { to: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink to="/" className="admin-brand">
          <span>Q</span>
          <div>
            <strong>Qayalı Sport</strong>
            <small>İdarəetmə paneli</small>
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
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
