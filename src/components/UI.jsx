import { ArrowUpRight } from "lucide-react";
import { orderLink } from "../data/products";

export function Heading({ eyebrow, title, text, action }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ index, eyebrow, title, text }) {
  return (
    <section className="page-hero grid-bg">
      <div className="container">
        <span className="big-index">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function ProductCard({ p, index = 0 }) {
  const name = p.name || p.title;
  const detail = p.detail || p.description;
  const image = p.image || p.imageUrl;
  const price = typeof p.price === "number" ? `${p.price} ₼` : p.price;
  const source = p.source || orderLink(name);
  const displayIndex = p.displayIndex || String(index + 1).padStart(2, "0");

  return (
    <article className="product-card">
      <a className="product-visual" href={source} target="_blank" rel="noreferrer">
        {p.weight && <span className="weight-stamp">{p.weight}</span>}
        <img src={image} alt={name} loading="lazy" />
        <span className="product-index">{displayIndex}</span>
      </a>

      <div className="product-info">
        <span>FİTNESS AVADANLIĞI</span>
        <h3>{name}</h3>
        <p>{detail}</p>

        <div className="product-bottom">
          <strong>{price}</strong>
          <a
            href={orderLink(name)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} sifariş et`}
          >
            <ArrowUpRight />
          </a>
        </div>

        {p.source && (
          <a className="source-link" href={p.source} target="_blank" rel="noreferrer">
            Məhsula Birmarket-də bax
          </a>
        )}
      </div>
    </article>
  );
}

export function VideoCard({ video, hero = false }) {
  const playlistSource = `https://www.youtube.com/embed/videoseries?list=${
    video.playlistId
  }&${
    hero ? "autoplay=1&mute=1&loop=1&controls=0&disablekb=1&" : "controls=1&"
  }playsinline=1&rel=0`;
  const singleVideoSource = `https://www.youtube.com/embed/${video.youtubeId}?controls=1&rel=0`;
  const source = video.playlistId ? playlistSource : singleVideoSource;

  return (
    <div className={hero ? "hero-video" : "video-card"}>
      <iframe
        src={source}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
