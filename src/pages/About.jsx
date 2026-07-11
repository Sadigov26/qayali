import {
  Gem,
  Truck,
  BadgeDollarSign,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Heading } from "../components/UI";
const values = [
  [Gem, "Keyfiyyət", "Uzunmüddətli istifadəyə hesablanmış seçilmiş məhsullar."],
  [Truck, "Çevik xidmət", "Bakı və Sumqayıt üzrə rahat sifariş və çatdırılma."],
  [
    BadgeDollarSign,
    "Düzgün qiymət",
    "Büdcənizə və məqsədinizə uyğun alternativlər.",
  ],
  [ShieldCheck, "Etibar", "Dürüst məsləhət və davamlı dəstək."],
];
export default function About() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="BİZİM HEKAYƏ"
        title="QAYALI KİMİ"
        text="Adımız xarakterimizi ifadə edir: möhkəm, sarsılmaz və etibarlı."
      />
      <section className="section container about-intro">
        <div>
          <span className="eyebrow">MİSSİYAMIZ</span>
          <h2>
            HƏR KƏSİN İÇİNDƏKİ
            <br />
            <em>GÜCÜ OYATMAQ.</em>
          </h2>
        </div>
        <div>
          <p>
            Qayalı Sport idmana başlamaq istəyənlərdən peşəkar məşq edənlərə
            qədər hər kəs üçün doğru avadanlıq və geyim seçimini asanlaşdırır.
          </p>
          <p>
            Biz məhsul satmaqla kifayətlənmirik — daha güclü həyat tərzinin bir
            hissəsi oluruq.
          </p>
        </div>
      </section>
      <section className="section panel">
        <div className="container">
          <Heading eyebrow="ÜSTÜNLÜKLƏR" title="NİYƏ QAYALI?" />
          <div className="values-grid">
            {values.map(([Icon, t, x], i) => (
              <article key={t}>
                <span>0{i + 1}</span>
                <Icon />
                <h3>{t}</h3>
                <p>{x}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-image about-store-full store-grid-bg">
        <div className="container">
          <span>MAĞAZAMIZ</span>
          <h2>
            GÜCÜN
            <br />
            ÜNVANI.
          </h2>
          <p>
            Sumqayıt şəhər 9-cu mkr “ƏN UCUZ”Marketin yanı Koroğlu küçəsi 4/21
          </p>
        </div>
      </section>
      <section className="cta-band">
        <div className="container">
          <span className="eyebrow">BİRLİKDƏ DAHA GÜCLÜ</span>
          <h2>
            DOĞRU SEÇİM ÜÇÜN
            <br />
            BİZİMLƏ DANIŞ.
          </h2>
          <Link className="button light" to="/elaqe">
            Əlaqə saxla <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
