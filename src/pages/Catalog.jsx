import { useMemo, useState } from "react";
import { ProductSkeletonGrid } from "../components/LoadingStates";
import { EmptyProducts, Heading, PageHero, ProductCard } from "../components/UI";
import { uniqueCategories } from "../data/categories";
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

function ProductGrid({ products, emptyText, loading = false }) {
  if (loading) {
    return <ProductSkeletonGrid count={4} />;
  }

  if (products.length === 0) {
    return <EmptyProducts text={emptyText} />;
  }

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <ProductCard p={product} index={index} key={product.id} />
      ))}
    </div>
  );
}

function matchesSearch(product, search) {
  const query = search.trim().toLocaleLowerCase("az-AZ");

  if (!query) {
    return true;
  }

  return [product.name, product.title, product.detail, product.description, product.category]
    .filter(Boolean)
    .some((value) => String(value).toLocaleLowerCase("az-AZ").includes(query));
}

export default function Catalog() {
  const { birmarketProducts, products, loading } = useLiveContent();
  const [birmarketCategory, setBirmarketCategory] = useState("all");
  const [storeCategory, setStoreCategory] = useState("all");
  const [storeSearch, setStoreSearch] = useState("");
  const birmarketCategories = useMemo(
    () => ["all", ...uniqueCategories(birmarketProducts)],
    [birmarketProducts],
  );
  const storeCategories = useMemo(
    () => ["all", ...uniqueCategories(products)],
    [products],
  );
  const filteredBirmarketProducts = useMemo(
    () =>
      birmarketCategory === "all"
        ? birmarketProducts
        : birmarketProducts.filter(
            (product) => product.category === birmarketCategory,
          ),
    [birmarketCategory, birmarketProducts],
  );
  const filteredStoreProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatches =
          storeCategory === "all" || product.category === storeCategory;

        return categoryMatches && matchesSearch(product, storeSearch);
      }),
    [products, storeCategory, storeSearch],
  );

  return (
    <>
      <PageHero
        index="01"
        eyebrow="MƏHSULLAR"
        title="KATALOQ"
        text="Qayalı Sport məhsulları, Birmarket vitrini və mağazanın yeni paylaşımları."
      />

      <section className="section container">
        <div className="catalog-source">
          <span>{filteredBirmarketProducts.length} BİRMARKET MƏHSULU</span>
          <a
            className="text-link"
            href="https://birmarket.az/merchant/9215-qayali-sport"
            target="_blank"
            rel="noreferrer"
          >
            Birmarket vitrininə keç
          </a>
        </div>
        <CategoryFilter
          categories={birmarketCategories}
          value={birmarketCategory}
          onChange={setBirmarketCategory}
        />
        <ProductGrid
          products={filteredBirmarketProducts}
          emptyText="Birmarket məhsulları tezliklə burada görünəcək."
        />
      </section>

      <section className="section panel">
        <div className="container">
          <Heading
            eyebrow="YENİ PAYLAŞIMLAR"
            title="MAĞAZADAN SEÇİMLƏR"
            text="Yeni gələn məhsullar və mağaza paylaşımları burada göstərilir."
          />
          <CategoryFilter
            categories={storeCategories}
            value={storeCategory}
            onChange={setStoreCategory}
          />
          <label className="catalog-search">
            <span>Axtarış</span>
            <input
              value={storeSearch}
              onChange={(event) => setStoreSearch(event.target.value)}
              placeholder="Məhsul adı, kateqoriya və ya açar söz yazın"
              type="search"
            />
          </label>
          <ProductGrid
            products={filteredStoreProducts}
            loading={loading}
            emptyText={
              storeSearch
                ? "Axtarışa uyğun məhsul tapılmadı."
                : "Yeni mağaza paylaşımları tezliklə burada görünəcək."
            }
          />
        </div>
      </section>
    </>
  );
}
