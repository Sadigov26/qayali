import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import brandLogo from "../about/channels4_profile.png";
import { social } from "../data/media";
import { whatsappNumber } from "../data/products";
import "./Logo.css";

const navigationLinks = [
  { to: "/", label: "Ana səhifə", end: true },
  { to: "/kataloq", label: "Kataloq" },
  { to: "/media", label: "Media" },
  { to: "/haqqimizda", label: "Haqqımızda" },
  { to: "/catdirilma", label: "Çatdırılma" },
  { to: "/elaqe", label: "Əlaqə" },
];

function Logo() {
  return (
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
}

function SocialLinks() {
  return (
    <div className="socials">
      <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <FaInstagram />
      </a>
      <a href={social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
        <FaTiktok />
      </a>
      <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
        <FaYoutube />
      </a>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, theme, setTheme }) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header>
      <Logo />

      <nav className={menuOpen ? "open" : ""}>
        {navigationLinks.map(({ to, label, end }) => (
          <NavLink
            end={end}
            key={to}
            onClick={() => setMenuOpen(false)}
            to={to}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        className="theme-toggle"
        onClick={() => setTheme(nextTheme)}
        aria-label={theme === "dark" ? "Gündüz rejiminə keç" : "Gecə rejiminə keç"}
        type="button"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>

      <NavLink className="button small header-cta" to="/elaqe">
        Sifariş et <ArrowUpRight />
      </NavLink>

      <button
        className="menu"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Menyunu aç"
        type="button"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Logo />
          <p>
            Qaya kimi sərt. Dəmir kimi güclü.
            <br />
            İdman geyimləri və fitness avadanlığı.
          </p>
          <SocialLinks />
        </div>

        <div>
          <h4>SÜRƏTLİ KEÇİD</h4>
          {navigationLinks.slice(1).map(({ to, label }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </div>

        <div>
          <h4>MAĞAZA</h4>
          <p className="address">
            <MapPin />
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
  );
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("qayali-theme") || "dark",
  );
  const location = useLocation();
  const whatsappMessage = encodeURIComponent(
    "Salam, Qayalı Sport saytından müraciət edirəm.",
  );

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
          Sumqayıt şəhər 9-cu mkr “ƏN UCUZ” Marketin yanı Koroğlu küçəsi 4/21
        </span>
        <span>
          PULSUZ MƏSLƏHƏT · <b>+994 70 722 39 39</b>
        </span>
      </div>

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <main>
        <Outlet />
      </main>

      <Footer />

      <a
        className="whatsapp global-whatsapp"
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp-da yaz"
      >
        <MessageCircle />
        <span>WhatsApp-da yaz</span>
      </a>
    </div>
  );
}
