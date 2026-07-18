import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Heading, PageHero, ProductCard, VideoCard } from "../components/UI";
import { mediaVideos, social } from "../data/media";
import { useLiveContent } from "../hooks/useLiveContent";

export default function Media() {
  const { products, live } = useLiveContent();

  return (
    <>
      <PageHero
        index="02"
        eyebrow="BİZİ İZLƏYİN"
        title="QAYALI MEDİA"
        text="Son videolarımız və admin paneldən idarə olunan yeni məhsul paylaşımları."
      />

      <section className="section container">
        <Heading eyebrow="YOUTUBE" title="ƏN SON VİDEO" />
        <div className="featured-video">
          <VideoCard video={mediaVideos[0]} />
          <div>
            <span className="eyebrow">QAYALI SPORT</span>
            <h3>{mediaVideos[0].title}</h3>
            <p>
              Reklam videoları və mağaza görüntüləri rəsmi YouTube kanalımızdan
              göstərilir.
            </p>
            <a className="text-link" href={social.youtube} target="_blank" rel="noreferrer">
              YouTube kanalına keç <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="container">
          <Heading
            eyebrow="ADMIN PAYLAŞIMLARI"
            title="YENİ MƏHSULLAR"
            text={
              live
                ? "Bu bölmə birbaşa admin paneldən əlavə olunan postlardan gəlir."
                : "Backend boş olduqda nümunə məhsullar göstərilir."
            }
          />
          <div className="products-grid">
            {products.map((product, index) => (
              <ProductCard p={product} index={index} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container social-follow">
        <h2>BİZƏ QOŞUL.</h2>
        <div>
          <a href={social.instagram} target="_blank" rel="noreferrer">
            <FaInstagram /> Instagram <ArrowUpRight />
          </a>
          <a href={social.tiktok} target="_blank" rel="noreferrer">
            <FaTiktok /> TikTok <ArrowUpRight />
          </a>
          <a href={social.youtube} target="_blank" rel="noreferrer">
            <FaYoutube /> YouTube <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
