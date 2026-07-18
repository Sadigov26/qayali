import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Dumbbell,
  Play,
  Quote,
  ShieldCheck,
  Truck,
} from "lucide-react";
import storeImage from "../about/bizkimik.jpg";
import { Heading, ProductCard, VideoCard } from "../components/UI";
import { mediaVideos } from "../data/media";
import { useLiveContent } from "../hooks/useLiveContent";

function HeroSection() {
  return (
    <section className="home-hero grid-bg">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Qayalı Sport | Sport idman geyimləri</span>
          <h1>
            QAYA KİMİ <em>SƏRT.</em>
            <br />
            DƏMİR KİMİ <span>GÜCLÜ.</span>
          </h1>
          <p>
            Hədəfin nə qədər böyükdürsə, avadanlığın da bir o qədər etibarlı
            olmalıdır. Qayalı Sport ilə gücünü yenidən kəşf et.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/kataloq">
              Kataloqa bax <ArrowRight />
            </Link>
            <Link className="button ghost" to="/elaqe">
              Bizimlə əlaqə
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>10+</strong>
              <span>İllik təcrübə</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Güc və keyfiyyət</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>Şəhərə xidmət</span>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <VideoCard video={mediaVideos[0]} hero />
          <a
            className="hero-channel-overlay"
            href="https://www.youtube.com/@qayalisport"
            target="_blank"
            rel="noreferrer"
          >
            <strong>Qayalı Sport</strong>
            <span>YouTube-da izlə</span>
          </a>
          <div className="float-card top">
            <ShieldCheck />
            <span>
              <b>Keyfiyyət</b>Seçilmiş məhsullar
            </span>
          </div>
          <div className="float-card bottom">
            <Play />
            <span>
              <b>Brend filmi</b>YouTube-da izlə
            </span>
          </div>
          <span className="vertical-word">QAYALI · SPORT · 2026</span>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div>
        <Truck />
        <span>
          <b>SÜRƏTLİ ÇATDIRILMA</b>Bakı, Sumqayıt və digər bölgələr
        </span>
      </div>
      <div>
        <CreditCard />
        <span>
          <b>RAHAT ÖDƏNİŞ</b>Nağd, kart və taksit imkanları
        </span>
      </div>
      <div>
        <ShieldCheck />
        <span>
          <b>ETİBARLI KEYFİYYƏT</b>Seçilmiş məhsullar
        </span>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="story-section">
      <div className="container story-grid">
        <div
          className="story-visual real-store"
          style={{
            backgroundImage: `linear-gradient(135deg,rgba(255,239,5,.2),rgba(5,6,8,.42)), url(${storeImage})`,
          }}
        >
          <div>
            <Dumbbell />
          </div>
          <span>EST. SUMQAYIT</span>
        </div>

        <div className="story-copy">
          <span className="eyebrow">BİZ KİMİK?</span>
          <h2>
            SARSILMAZ RUH,
            <br />
            <em>MÖHKƏM SEÇİM.</em>
          </h2>
          <p>
            Qayalı adı təsadüfi deyil. Biz hər məşqdə, hər təkrarda və hər
            hədəfdə dayanıqlılığa inanırıq.
          </p>
          <Quote />
          <blockquote>
            “Güc sadəcə qaldırdığın çəki deyil, davam etmək qərarıdır.”
          </blockquote>
          <Link className="button ghost" to="/haqqimizda">
            Hekayəmizi oxu <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductsSection({ products }) {
  return (
    <section className="section container">
      <Heading
        eyebrow="SEÇİLMİŞ MƏHSULLAR"
        title="GÜCÜNÜ SEÇ"
        text="Admin paneldən əlavə olunan ən yeni məhsul və paylaşımlar."
        action={
          <Link className="text-link" to="/kataloq">
            Hamısına bax <ArrowRight />
          </Link>
        }
      />
      <div className="products-grid">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard p={product} index={index} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function MediaSection({ products }) {
  return (
    <section className="section container">
      <Heading
        eyebrow="QAYALI MEDİA"
        title="HƏRƏKƏTDƏ QAL"
        text="YouTube videosu və admin paneldən idarə olunan son məhsul paylaşımları."
      />
      <div className="home-media-stack">
        <VideoCard video={mediaVideos[0]} />
        <div className="products-grid home-posts-grid">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard p={product} index={index} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { products } = useLiveContent();

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ProductsSection products={products} />
      <StorySection />
      <MediaSection products={products} />

      <section className="cta-band">
        <div className="container">
          <span className="eyebrow">NÖVBƏTİ ADDIM</span>
          <h2>
            GÜCÜNÜ GÖSTƏRMƏYƏ
            <br />
            HAZIRSAN?
          </h2>
          <Link className="button light" to="/elaqe">
            Sifarişə başla <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
