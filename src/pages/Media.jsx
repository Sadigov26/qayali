import { ArrowUpRight, Quote } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { PageHero, VideoCard, Heading, InstagramCard } from "../components/UI";
import {
  mediaVideos,
  social,
} from "../data/media";
import { useLiveContent } from "../hooks/useLiveContent";

export default function Media() {
  const { posts: instagramPosts, comments: instagramComments, live } = useLiveContent();
  return (
    <>
      <PageHero
        index="02"
        eyebrow="BİZİ İZLƏYİN"
        title="QAYALI MEDİA"
        text="Son videolarımız, yeni məhsullar və Qayalı icmasının səsi."
      />
      <section className="section container">
        <Heading eyebrow="YOUTUBE" title="ƏN SON VİDEO" />
        <div className="featured-video">
          <VideoCard video={mediaVideos[0]} />
          <div>
            <span className="eyebrow">2026</span>
            <h3>{mediaVideos[0].title}</h3>
            <p>
              Kanalımıza yüklənən ən yeni video. Bütün reklam filmlərini YouTube
              kanalımızda izləyə bilərsiniz.
            </p>
            <a className="text-link" href={social.youtube} target="_blank">
              YouTube kanalına keç <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <section className="section panel">
        <div className="container">
          <Heading
            eyebrow="INSTAGRAM"
            title="SON 12 PAYLAŞIM"
            text={live ? "Canlı API məlumatı · avtomatik yenilənir." : "Son sinxronlaşdırılmış məlumatlar göstərilir."}
          />
          <div className="instagram-grid instagram-live-grid">
            {instagramPosts.map((post, index) => (
              <InstagramCard post={post} index={index} key={post.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <Heading
          eyebrow="İCMA RƏYLƏRİ"
          title="SİZİN SƏSİNİZ"
          text="Instagram paylaşımımızda yazılan real və müsbət şərhlər."
        />
        <div className="comments-marquee"><div className="comments-track">
          {[...instagramComments, ...instagramComments].map((comment, index) => (
            <a
              className="comment-card"
              href={comment.postUrl}
              target="_blank"
              rel="noreferrer"
              key={`${comment.username}-${index}`}
            >
              <Quote />
              <p>“{comment.text}”</p>
              <span>
                <FaInstagram /> @{comment.username}
              </span>
            </a>
          ))}
        </div></div>
      </section>
      <section className="section container social-follow">
        <h2>BİZƏ QOŞUL.</h2>
        <div>
          <a href={social.instagram} target="_blank">
            <FaInstagram /> Instagram <ArrowUpRight />
          </a>
          <a href={social.tiktok} target="_blank">
            <FaTiktok /> TikTok <ArrowUpRight />
          </a>
          <a href={social.youtube} target="_blank">
            <FaYoutube /> YouTube <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
