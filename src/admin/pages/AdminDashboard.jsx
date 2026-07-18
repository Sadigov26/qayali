import { BarChart3, Eye, Layers3, Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingPanel } from "../../components/LoadingStates";
import { getProductStats } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";

const emptyStats = {
  totalProducts: 0,
  totalViews: 0,
  averageViews: 0,
  categoryStats: [],
  topViewed: [],
  latestProducts: [],
};

function statValue(value) {
  return new Intl.NumberFormat("az-AZ").format(value || 0);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const data = await getProductStats();

        if (!ignore) {
          setStats({ ...emptyStats, ...data });
          setError("");
        }
      } catch {
        if (!ignore) {
          setError("Statistika yüklənmədi.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      ignore = true;
    };
  }, []);

  const categoryCount = stats.categoryStats.length;

  return (
    <>
      <AdminHeader
        eyebrow="Qayalı Sport"
        title="İdarəetmə paneli"
        text="Paylaşımlar, kateqoriyalar və baxış statistikaları bir yerdə."
        action={
          <Link className="admin-primary" to="/admin/products/new">
            <Plus size={18} />
            Yeni post əlavə et
          </Link>
        }
      />

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <LoadingPanel
          title="Statistika yüklənir"
          text="Panel məlumatları hazırlanır."
        />
      ) : (
        <>
          <section className="admin-cards">
            <article>
              <span>
                <Layers3 /> 01
              </span>
              <h2>{statValue(stats.totalProducts)}</h2>
              <p>Aktiv məhsul və post</p>
            </article>
            <article>
              <span>
                <Eye /> 02
              </span>
              <h2>{statValue(stats.totalViews)}</h2>
              <p>Ümumi məhsul baxışı</p>
            </article>
            <article>
              <span>
                <BarChart3 /> 03
              </span>
              <h2>{statValue(stats.averageViews)}</h2>
              <p>Orta baxış sayı</p>
            </article>
            <article>
              <span>
                <TrendingUp /> 04
              </span>
              <h2>{statValue(categoryCount)}</h2>
              <p>Aktiv kateqoriya</p>
            </article>
          </section>

          <section className="admin-dashboard-grid">
            <article className="admin-panel-card">
              <div className="admin-panel-head">
                <span>Ən çox baxılanlar</span>
                <Link to="/admin/products">Hamısına bax</Link>
              </div>

              {stats.topViewed.length === 0 ? (
                <p className="admin-muted">Baxış statistikası hələ formalaşmayıb.</p>
              ) : (
                <div className="admin-rank-list">
                  {stats.topViewed.map((product, index) => (
                    <Link to={`/post/${product._id}`} key={product._id}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      <span>{product.title}</span>
                      <strong>{product.views || 0} baxış</strong>
                    </Link>
                  ))}
                </div>
              )}
            </article>

            <article className="admin-panel-card">
              <div className="admin-panel-head">
                <span>Kateqoriyalar</span>
              </div>

              {stats.categoryStats.length === 0 ? (
                <p className="admin-muted">Kateqoriya statistikası hələ yoxdur.</p>
              ) : (
                <div className="admin-category-bars">
                  {stats.categoryStats.map((item) => {
                    const percent = stats.totalProducts
                      ? Math.max((item.count / stats.totalProducts) * 100, 6)
                      : 0;

                    return (
                      <div key={item.category}>
                        <span>
                          {item.category}
                          <small>{item.count} post · {item.views || 0} baxış</small>
                        </span>
                        <i style={{ width: `${percent}%` }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          </section>
        </>
      )}
    </>
  );
}
