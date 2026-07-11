import { ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { orderLink } from "../data/products";

export const Heading = ({ eyebrow, title, text, action }) => <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;

export const PageHero = ({ index, eyebrow, title, text }) => <section className="page-hero grid-bg"><div className="container"><span className="big-index">{index}</span><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;

export const ProductCard = ({ p }) => <article className="product-card"><a className="product-visual" href={p.source} target="_blank" rel="noreferrer"><span className="weight-stamp">{p.weight}</span><img src={p.image} alt={`${p.name}, ${p.weight}`} loading="lazy"/><span className="product-index">0{p.id}</span></a><div className="product-info"><span>FİTNESS AVADANLIĞI</span><h3>{p.name}</h3><p>{p.detail}</p><div className="product-bottom"><strong>{p.price}</strong><a href={orderLink(p.name)} target="_blank" rel="noreferrer" aria-label={`${p.name} sifariş et`}><ArrowUpRight/></a></div><a className="source-link" href={p.source} target="_blank" rel="noreferrer">Məhsula Birmarket-də bax</a></div></article>;

export const VideoCard = ({ video, hero = false }) => {
  const source = video.playlistId ? `https://www.youtube.com/embed/videoseries?list=${video.playlistId}&${hero ? "autoplay=1&mute=1&loop=1&controls=0&disablekb=1&" : "controls=1&"}playsinline=1&rel=0` : `https://www.youtube.com/embed/${video.youtubeId}?controls=1&rel=0`;
  return <div className={hero ? "hero-video" : "video-card"}><iframe src={source} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div>;
};

export const InstagramCard = ({ post, index }) => <article className="instagram-embed-card"><a className="instagram-media" href={post.url} target="_blank" rel="noreferrer">{post.image ? <img src={post.image} alt={post.label} loading="lazy"/> : <div className="instagram-fallback"><FaInstagram/><strong>QAYALI SPORT</strong><small>Paylaşımı Instagram-da izlə</small></div>}</a><a className="instagram-meta" href={post.url} target="_blank" rel="noreferrer"><span><FaInstagram/> {post.label}</span><small>{post.date}</small><b>{String(index + 1).padStart(2, "0")}</b></a></article>;
