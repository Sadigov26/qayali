import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, MapPin, ArrowUpRight, Moon, Sun, MessageCircle } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { social } from "../data/media";
import { whatsappNumber } from "../data/products";
import brandLogo from "../about/channels4_profile.png";
import "./Logo.css";

const links = [
  ["/", "Ana səhifə"],
  ["/kataloq", "Kataloq"],
  ["/media", "Media"],
  ["/haqqimizda", "Haqqımızda"],
  ["/catdirilma", "Çatdırılma"],
  ["/elaqe", "Əlaqə"],
];
const Logo = () => (
  <NavLink to="/" className="logo" aria-label="Qayalı Sport ana səhifə">
    <span>
      <img src={brandLogo} alt="Qayalı Sport loqosu" />
    </span>
    <span className="logo-copy">
      <strong>QAYALI</strong>
      <b>SPORT</b>
    </span>
  </NavLink>
);

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("qayali-theme") || "dark",
  );
  const location = useLocation();
  const whatsappMessage = encodeURIComponent("Salam, Qayalı Sport saytından müraciət edirəm.");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("qayali-theme", theme);
  }, [theme]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="site-shell">
      <div className="topbar">
        <span>
          Sumqayıt şəhər 9-cu mkr “ƏN UCUZ”Marketin yanı Koroğlu küçəsi 4/21
        </span>
        <span>
          PULSUZ MƏSLƏHƏT · <b>+994 70 722 39 39</b>
        </span>
      </div>
      <header>
        <Logo />
        <nav className={open ? "open" : ""}>
          {links.map(([to, label]) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={to}
              to={to}
              end={to === "/"}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={
            theme === "dark" ? "Gündüz rejiminə keç" : "Gecə rejiminə keç"
          }
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <NavLink className="button small header-cta" to="/elaqe">
          Sifariş et <ArrowUpRight />
        </NavLink>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Menyunu aç"
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              Qaya kimi sərt. Dəmir kimi güclü.
              <br />
              İdman geyimləri və fitness avadanlığı.
            </p>
            <div className="socials">
              <a href={social.instagram} target="_blank" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={social.tiktok} target="_blank" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href={social.youtube} target="_blank" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div>
            <h4>SÜRƏTLİ KEÇİD</h4>
            {links.slice(1).map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </div>
          <div>
            <h4>MAĞAZA</h4>
            <p className="address">
              <MapPin />{" "}
              <span>
                Sumqayıt şəhəri, 9-cu mkr
                <br />
                “ƏN UCUZ” Marketin yanı
                <br />
                Koroğlu küçəsi 4/21
              </span>
            </p>
            <p>Hər gün · 10:00–20:00</p>
            <a className="text-link" href="tel:+994707223939">
              +994 70 722 39 39
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Qayalı Sport. Bütün hüquqlar qorunur.
          <span>SPORT İDMAN GEYİMLƏRİ</span>
        </div>
      </footer>
      <a className="whatsapp global-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" aria-label="WhatsApp-da yaz"><MessageCircle/><span>WhatsApp-da yaz</span></a>
    </div>
  );
}
