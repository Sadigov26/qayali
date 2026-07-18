import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { ProductSkeletonGrid } from "../components/LoadingStates";
import SEO from "../components/SEO";
import {
  EmptyProducts,
  Heading,
  PageHero,
  ProductCard,
  VideoCard,
} from "../components/UI";
import { uniqueCategories } from "../data/categories";
import { mediaVideos, social } from "../data/media";
import { useLiveContent } from "../hooks/useLiveContent";

function CategoryFilter({ categories, value, onChange }) {
  if (categories.length <= 1) {
    return null;
  }

  return (
    <div className="filter-bar category-filter">
      {categories.map((category) => (
        <button
          className={value === category ? "active" : ""}
          onClick={() => onChange(category)}
          type="button"
          key={category}
        >
          {category === "all" ? "Hamısı" : category}
        </button>
      ))}
    </div>
  );
}

function MediaProducts({ products, loading, categories, category, onCategoryChange }) {
  if (loading) {
    return <ProductSkeletonGrid count={4} />;
  }

  if (products.length === 0) {
    return (
      <EmptyProducts text="Yeni məhsul paylaşımları tezliklə burada görünəcək." />
    );
  }

  return (
    <>
      <CategoryFilter
        categories={categories}
        value={category}
        onChange={onCategoryChange}
      />
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard p={product} index={index} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default function Media() {
  const { products, loading } = useLiveContent();
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => ["all", ...uniqueCategories(products)], [products]);
  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [category, products],
  );

  return (
    <>
      <SEO
        title="Media"
        description="Qayalı Media — YouTube videosu, sosial kanallar və mağazadan yeni Qayalı Sport paylaşımları."
      />
      <PageHero
        index="02"
        eyebrow="BİZİ İZLƏYİN"
        title="QAYALI MEDİA"
        text="YouTube videosu və mağazamızdan yeni məhsul paylaşımları."
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
            <a
              className="text-link"
              href={social.youtube}
              target="_blank"
              rel="noreferrer"
            >
              YouTube kanalına keç <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="container">
          <Heading
            eyebrow="YENİ PAYLAŞIMLAR"
            title="YENİ MƏHSULLAR"
            text="YouTube videosunun altında yalnız mağazanın yeni məhsul paylaşımları görünür."
          />
          <MediaProducts
            products={filteredProducts}
            loading={loading}
            categories={categories}
            category={category}
            onCategoryChange={setCategory}
          />
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
