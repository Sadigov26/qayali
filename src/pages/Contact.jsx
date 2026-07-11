import { MapPin, Phone, MessageCircle, Star, ExternalLink } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube, FaGoogle } from "react-icons/fa6";
import { Heading, PageHero } from "../components/UI";
import { social } from "../data/media";
import { whatsappNumber } from "../data/products";
import { googleReviews } from "../data/googleReviews";

export default function Contact() {
  const sendToWhatsApp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Salam, Qayalı Sport saytından müraciət edirəm.",
      `Ad: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Müraciət: ${data.get("message")}`,
    ].join("\n");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <>
      <PageHero
        index="05"
        eyebrow="ƏLAQƏ"
        title="GƏL DANIŞAQ"
        text="Formu doldurun, müraciətiniz hazır mətnlə birbaşa WhatsApp-a yönləndirilsin."
      />
      <section className="section container contact-grid">
        <div className="contact-info">
          <span className="eyebrow">BİRBAŞA ƏLAQƏ</span>
          <h2>
            GÜCÜNƏ UYĞUN
            <br />
            SEÇİMİ TAP.
          </h2>
          <p>
            Mesajınızı yazın, komandamız sizə ən uyğun məhsulu seçməkdə kömək
            etsin.
          </p>
          <div className="contact-cards">
            <a href="tel:+994707223939">
              <Phone />
              <span>
                <small>TELEFON / WHATSAPP</small>+994 70 722 39 39
              </span>
            </a>
            <a href={googleReviews.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin />
              <span>
                <small>ÜNVAN</small>Sumqayıt şəhəri, 9-cu mkr
                <br />
                “ƏN UCUZ” Marketin yanı
                <br />
                Koroğlu küçəsi 4/21
              </span>
            </a>
          </div>
          <div className="socials large">
            <a href={social.instagram} target="_blank" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={social.tiktok} target="_blank" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href={social.youtube} target="_blank" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={sendToWhatsApp}>
          <label>
            ADINIZ
            <input name="name" required placeholder="Ad və soyad" />
          </label>
          <label>
            TELEFON
            <input
              name="phone"
              required
              type="tel"
              placeholder="+994 50 000 00 00"
            />
          </label>
          <label>
            MESAJ
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Nə ilə maraqlanırsınız?"
            />
          </label>
          <button className="button" type="submit">
            <MessageCircle /> WhatsApp-a göndər
          </button>
          <small>
            Məlumatlar serverdə saxlanılmır. WhatsApp açıldıqda göndəriləcək
            mətni yoxlaya bilərsiniz.
          </small>
        </form>
      </section>
      <section className="section panel google-section">
        <div className="container">
          <Heading
            eyebrow="GOOGLE MAPS"
            title="MÜŞTƏRİLƏR NƏ DEYİR?"
            text={`${googleReviews.rating} reytinq · ${googleReviews.totalReviews} rəy`}
          />
          <div className="google-layout">
            <div className="google-map">
              <iframe
                title="Qayalı Sport xəritəsi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d49.6768183!3d40.5713327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403091300f82f297%3A0x3f5e9c5faa1eef9a!2sQayal%C4%B1%20Sport!5e0!3m2!1saz!2saz!4v1"
                loading="lazy"
                allowFullScreen
              />
              <a href={googleReviews.mapsUrl} target="_blank" rel="noreferrer">
                <FaGoogle /> Google Maps-da aç <ExternalLink />
              </a>
            </div>
            <div className="google-reviews">
              <div className="rating-summary">
                <strong>{googleReviews.rating}</strong>
                <div>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        fill={star <= 4 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span>{googleReviews.totalReviews} Google rəyi</span>
                </div>
              </div>
              <div className="review-list">
                {googleReviews.reviews.map((review) => (
                  <a
                    href={googleReviews.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="google-review"
                    key={review.author}
                  >
                    <div>
                      <span className="avatar">{review.author.charAt(0)}</span>
                      <div>
                        <strong>{review.author}</strong>
                        <small>
                          {review.localGuide ? "Local Guide · " : ""}
                          {review.time}
                        </small>
                      </div>
                    </div>
                    <p>“{review.text}”</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
