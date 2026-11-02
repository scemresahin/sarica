import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { CheckList, CtaBanner, Eyebrow, FeatureCard, MapCard } from '../components/Blocks'
import { contact, images, services, stats } from '../data/site'

const features = [
  { icon: 'power', title: 'Güç', text: 'Zorlu projelerde kesintisiz mühendislik gücü.' },
  { icon: 'gauge', title: 'Hız', text: 'Hızlı analiz, hızlı ve zamanında uygulama.' },
  { icon: 'shield', title: 'Güven', text: 'Şeffaf iletişim, sağlam mühendislik.' },
  { icon: 'award', title: 'Kalite', text: 'Her projede yüksek standart, titiz işçilik.' },
]

const references = [
  { name: 'POSTMAN', className: 'ref--postman' },
  { name: 'amazon', className: 'ref--amazon' },
  { name: 'GitHub', className: 'ref--github' },
  { name: 'productboard', className: 'ref--productboard' },
  { name: 'Amplitude', className: 'ref--amplitude' },
  { name: 'GitLab', className: 'ref--gitlab' },
  { name: 'Razorpay', className: 'ref--razorpay' },
]

function Hero() {
  return (
    <section className="home-hero" style={{ '--hero-img': `url(${images.homeHero})` }}>
      <div className="container home-hero__inner">
        <Eyebrow>ELEKTRİK · TAAHHÜT · MÜŞAVİRLİK</Eyebrow>
        <h1 className="home-hero__title">
          Güçlü Sistemler.
          <br />
          Kesintisiz Gelecek.
        </h1>
        <p className="home-hero__text">Elektrik altyapılarında güvenlik, verimlilik ve sürdürülebilirlik odaklı mühendislik.</p>
        <div className="home-hero__buttons">
          <Link to="/iletisim" className="btn btn--primary">
            Teklif Al
          </Link>
          <Link to="/hizmetler" className="btn btn--ghost">
            Hizmetlerimiz
          </Link>
        </div>
        <dl className="home-hero__stats">
          {[stats[0], stats[1], stats[3]].map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="split split--about">
          <div>
            <Eyebrow>KURUMSAL</Eyebrow>
            <h2 className="h2">
              15 Yıldır Sahada,
              <br />
              Mühendislikte Güven
            </h2>
            <p className="lead">
              Sarıca Mühendislik, elektrik projelendirme, taahhüt ve mühendislik müşavirliği alanlarında faaliyet gösteren; sanayi
              tesislerinden ticari yapılara kadar geniş bir yelpazede anahtar teslim çözümler sunan bir mühendislik firmasıdır.
            </p>
            <CheckList items={['Uzman mühendis ve saha ekibi', 'Zamanında ve eksiksiz teslimat', 'Ulusal/uluslararası standartlara uygunluk']} />
          </div>
          <div className="about-media">
            <img src={images.homeAbout} alt="Elektrik panosunda çalışan mühendis" className="framed-img" />
            <div className="about-media__badge">
              <div>
                <strong>15+</strong>
                <span>Yıllık Deneyim</span>
              </div>
              <div>
                <strong>250+</strong>
                <span>Tamamlanan Proje</span>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section">
      <div className="container split split--services">
        <div>
          <Eyebrow>HİZMETLERİMİZ</Eyebrow>
          <h2 className="h2">
            Güvenli Enerji.
            <br />
            <span className="muted">Yenilikçi Mühendislik.</span>
          </h2>
          <p className="lead">Projenin ilk adımından anahtar teslim kurulumuna kadar sürdürülebilir ve yüksek standartlı çözümler üretiyoruz.</p>
          <Link to="/iletisim" className="quote-card">
            <span className="quote-card__icon">
              <Icon name="file" size={16} />
            </span>
            <span className="quote-card__text">
              <small>Projenize özel çözümler için</small>
              <strong>Teklif Alın</strong>
            </span>
            <Icon name="arrowUpRight" size={18} className="quote-card__arrow" />
          </Link>
        </div>
        <div className="accordion">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <div key={s.title} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
                <button className="accordion__head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{s.title}</span>
                  <span className="accordion__toggle">
                    <Icon name={isOpen ? 'minus' : 'plus'} size={12} stroke={2} />
                  </span>
                </button>
                <div className="accordion__body">
                  <p>{s.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section className="safety">
      <div className="safety__bg" style={{ '--hero-img': `url(${images.safety})` }}>
        <div className="container safety__inner">
          <div className="safety__content">
            <Eyebrow icon="shield">İŞ SAĞLIĞI VE GÜVENLİK</Eyebrow>
            <h2 className="h2 h2--light">İş Sağlığı ve Güvenliği Politikası</h2>
            <p>
              <strong>Sarıca Mühendislik</strong>, saha ve üretim faaliyetlerinin tamamında iş sağlığının ve iş güvenliğinin azami düzeyde
              korunmasını, risklerin önceden belirlenmesine ve iş kazalarının minimum seviyede tutulmasına öncelik vermeyi şirket prensibi
              olarak kabul eder.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <dl className="stats-card">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function References() {
  return (
    <section className="references" id="referanslar">
      <div className="container">
        <Eyebrow className="eyebrow--center">REFERANSLAR</Eyebrow>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {[...references, ...references].map((r, i) => (
            <span key={i} className={`ref ${r.className}`} aria-hidden={i >= references.length}>
              {r.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactBlock() {
  const items = [
    { icon: 'pin', label: 'Adres', value: contact.address },
    { icon: 'phone', label: 'Telefon', value: contact.phone, href: contact.phoneHref },
    { icon: 'mail', label: 'E-posta', value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'clock', label: 'Çalışma Saatleri', value: contact.hours },
  ]
  return (
    <section className="section section--muted">
      <div className="container split split--contact">
        <div>
          <Eyebrow>İLETİŞİM</Eyebrow>
          <h2 className="h2">Bize Ulaşın</h2>
          <p className="lead">Projeniz için teklif almak ya da sorularınızı iletmek için bize yazın.</p>
          <ul className="contact-list">
            {items.map((it) => (
              <li key={it.label}>
                <Icon name={it.icon} size={16} />
                <div>
                  <strong>{it.label}</strong>
                  {it.href ? <a href={it.href}>{it.value}</a> : <span>{it.value}</span>}
                </div>
              </li>
            ))}
          </ul>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn--whatsapp">
            <Icon name="whatsapp" size={16} />
            WhatsApp'tan Yazın
          </a>
        </div>
        <MapCard src={contact.mapEmbed} label="Sarıca Mühendislik" address={contact.addressShort} />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
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
      <ServicesAccordion />
      <Safety />
      <References />
      <ContactBlock />
    </>
  )
}
