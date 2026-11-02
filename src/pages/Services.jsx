import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { CtaBanner, Eyebrow, PageHero } from '../components/Blocks'
import { images, services } from '../data/site'

export default function Services() {
  return (
    <>
      <PageHero
        image={images.servicesHero}
        eyebrow="HİZMETLERİMİZ"
        title="Mühendislik Hizmetlerimiz"
        text="Projenizin ilk adımından anahtar teslim kurulumuna kadar sürdürülebilir ve yüksek standartlı çözümler üretiyoruz."
      />
      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <Eyebrow>TÜM HİZMETLERİMİZ</Eyebrow>
            <h2 className="h2">Kapsamlı Mühendislik Çözümleri</h2>
            <p className="lead">
              Her biri saha tecrübesi ve mühendislik standartlarıyla şekillenen altı temel hizmet alanında, projenizin her aşamasında
              yanınızdayız.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <article key={s.title} className="service-card">
                <div className="service-card__img">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="service-card__body">
                  <span className="service-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to="/iletisim" className="service-card__link">
                    İncele <Icon name="arrowRight" size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title={
          <>
            Elektrik Projeniz İçin
            <br />
            Doğru Adımı Şimdi Atın
          </>
        }
        text="Analizden anahtar teslim uygulamaya, uzman mühendislik ekibimiz yanınızda."
      />
    </>
  )
}
