import {
  ArrowLeft,
  Clock3,
  Copy,
  Eye,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingPanel, LoadingOverlay } from "../components/LoadingStates";
import SEO from "../components/SEO";
import { orderLink } from "../data/products";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_ADMIN_API_URL || "";

function formatPrice(price) {
  if (price == null || price === "") {
    return "";
  }

  return typeof price === "number" ? `${price.toFixed(2)} ₼` : price;
}

function formatDate(date) {
  if (!date) {
    return "Yeni paylaşım";
  }

  return new Intl.DateTimeFormat("az-AZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function normalizeProduct(product) {
  return {
    id: product._id || product.id,
    name: product.title || product.name,
    detail: product.description || product.detail || "",
    price: formatPrice(product.price),
    image: product.imageUrl || product.image,
    category: product.category || "Ümumi",
    views: product.views || 0,
    createdAt: product.createdAt,
  };
}

export default function PostDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappUrl = useMemo(
    () => (product ? orderLink(product.name, pageUrl) : "#"),
    [pageUrl, product],
  );

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function loadPost() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Post tapılmadı");
        }

        const data = await response.json();

        if (!ignore) {
          setProduct(normalizeProduct(data));
          setError("");
        }
      } catch (loadError) {
        if (!ignore && loadError.name !== "AbortError") {
          setError("Bu paylaşım tapılmadı və ya artıq aktiv deyil.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  async function sharePost() {
    if (!product) {
      return;
    }

    const shareData = {
      title: product.name,
      text: product.detail || product.name,
      url: pageUrl,
    };

    setSharing(true);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } finally {
      setSharing(false);
    }
  }

  if (loading) {
    return (
      <section className="section container">
        <SEO
          title="Paylaşım yüklənir"
          description="Qayalı Sport məhsul məlumatları yüklənir."
        />
        <LoadingPanel
          title="Paylaşım yüklənir"
          text="Məhsul məlumatları hazırlanır."
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="section container">
        <SEO
          title="Paylaşım tapılmadı"
          description="Axtardığınız Qayalı Sport paylaşımı tapılmadı."
        />
        <div className="post-empty">
          <h1>Paylaşım tapılmadı</h1>
          <p>{error}</p>
          <Link className="button" to="/kataloq">
            Kataloqa qayıt
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={product.name}
        description={
          product.detail
            ? product.detail.slice(0, 155)
            : "Qayalı Sport məhsulu haqqında ətraflı məlumat."
        }
        image={product.image}
        type="article"
      />
      {sharing && (
        <LoadingOverlay
          title="Paylaşılır"
          text="Post linki hazırlanır."
        />
      )}

      <section className="post-detail-hero grid-bg">
        <div className="container post-detail-grid">
          <div className="post-detail-media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="post-detail-copy">
            <Link className="post-back" to="/kataloq">
              <ArrowLeft /> Kataloqa qayıt
            </Link>
            
            <span className="eyebrow">QAYALI SPORT</span>
            <h1>{product.name}</h1>
            {product.price && <strong className="post-price">{product.price}</strong>}

            <div className="post-meta">
              <span>
                <Clock3 /> {formatDate(product.createdAt)}
              </span>
              <span>
                <Send /> Yeni məhsul paylaşımı
              </span>
              <span>
                <Eye /> {product.views || 0} baxış
              </span>
              <span>{product.category}</span>
            </div>

            <div className="post-actions">
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp-la sifariş et
              </a>
              <button className="button ghost" onClick={sharePost} type="button">
                {copied ? <Copy /> : <Share2 />}
                {copied ? "Link kopyalandı" : "Postu paylaş"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section container post-description">
        <span className="eyebrow">ƏTRAFLI MƏLUMAT</span>
        <h2>Məhsul haqqında</h2>
        <p>
          {product.detail ||
            "Bu məhsul haqqında əlavə məlumat üçün bizimlə əlaqə saxlayın."}
        </p>
      </section>
    </>
  );
}
