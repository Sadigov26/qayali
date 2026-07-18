import { Heading, PageHero, ProductCard } from "../components/UI";
import { useLiveContent } from "../hooks/useLiveContent";

export default function Catalog() {
  const { products, posts, live } = useLiveContent();

  return (
    <>
      <PageHero
        index="01"
        eyebrow="MƏHSULLAR"
        title="KATALOQ"
        text="Admin paneldən idarə olunan Qayalı Sport məhsulları və paylaşımları."
      />

      <section className="section container">
        <div className="catalog-source">
          <span>{products.length} MƏHSUL</span>
          <span>{live ? "MongoDB admin datası" : "Fallback məhsullar"}</span>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard
              p={product}
              index={index}
              key={product.source || product.id}
            />
          ))}
        </div>
      </section>

      <section className="section panel">
        <div className="container">
          <Heading
            eyebrow="ADMIN PANEL"
            title="SON PAYLAŞIMLAR"
            text="Instagram postları ləğv edildi; burada admin paneldən əlavə olunan məhsul/postlar göstərilir."
          />

          <div className="products-grid catalog-instagram">
            {posts.slice(0, 6).map((post, index) => (
              <ProductCard p={post} index={index} key={post.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
