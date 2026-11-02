import { Link } from 'react-router-dom'
import Icon from './Icon'
import { WaveLines } from './Layout'

export function Eyebrow({ children, icon, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}

export function PageHero({ image, eyebrow, eyebrowIcon, title, text, align = 'left', size = 'md', children }) {
  return (
    <section className={`page-hero page-hero--${align} page-hero--${size}`} style={{ '--hero-img': `url(${image})` }}>
      <div className="container page-hero__inner">
        <div className="page-hero__content">
          {eyebrow && <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>}
          <h1 className="page-hero__title">{title}</h1>
          {text && <p className="page-hero__text">{text}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

export function CtaBanner({ title, text, button = 'İletişime Geçin', to = '/iletisim' }) {
  return (
    <section className="cta">
      <WaveLines className="cta__waves" />
      <div className="container cta__inner">
        <div>
          <h2 className="cta__title">{title}</h2>
          <p className="cta__text">{text}</p>
        </div>
        <Link to={to} className="btn btn--dark">
          {button}
        </Link>
      </div>
    </section>
  )
}

export function CheckList({ items }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <span className="checklist__icon">
            <Icon name="check" size={12} stroke={2.4} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function FeatureCard({ icon, title, text, index }) {
  return (
    <article className="feature-card">
      <div className="feature-card__top">
        <span className="feature-card__icon">
          <Icon name={icon} size={22} stroke={1.6} />
        </span>
        <span className="feature-card__num">{String(index).padStart(2, '0')}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export function MapCard({ label, address, src }) {
  return (
    <div className="map-card">
      <iframe title="Sarıca Mühendislik konum" src={src} loading="lazy" />
      {label && (
        <div className="map-card__label">
          <span className="map-card__dot" />
          <div>
            <strong>{label}</strong>
            <span>{address}</span>
          </div>
        </div>
      )}
    </div>
  )
}
