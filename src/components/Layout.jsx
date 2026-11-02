import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { nav } from '../data/site'

export function Logo({ dark = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`logo${dark ? ' logo--dark' : ''}`} aria-label="Sarıca Mühendislik ana sayfa">
      <span className="logo__mark">
        <Icon name="bolt" size={20} stroke={0} fill="currentColor" />
      </span>
      <span className="logo__text">
        <strong>SARICA</strong>
        <small>MÜHENDİSLİK</small>
      </span>
    </Link>
  )
}

// Figma'daki sarı CTA ve koyu footer'da bulunan ince dalgalı çizgi deseni
export function WaveLines({ className = '', count = 22 }) {
  const lines = Array.from({ length: count }, (_, i) => {
    const o = i * 9
    return `M-50 ${150 + o} C 250 ${40 + o}, 450 ${260 + o}, 720 ${120 + o} S 1150 ${10 + o}, 1500 ${170 + o}`
  })
  return (
    <svg className={`waves ${className}`} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  )
}

const YEAR = new Date().getFullYear()

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`header${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <nav className="header__nav" aria-label="Ana menü" onClick={() => setOpen(false)}>
          {nav.map((item) =>
            item.to.includes('#') ? (
              <Link key={item.to} to={item.to} className="header__link">
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to} to={item.to} className="header__link" end>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <Logo onClick={() => setOpen(false)} />
        <div className="header__actions" onClick={() => setOpen(false)}>
          <Link to="/iletisim" className="btn btn--ghost btn--sm">
            İletişime Geç
          </Link>
          <Link to="/iletisim" className="btn btn--dark btn--sm">
            Teklif Al
          </Link>
        </div>
        <button className="header__toggle" onClick={() => setOpen((v) => !v)} aria-label="Menüyü aç/kapat" aria-expanded={open}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <WaveLines className="footer__waves" />
      <div className="container footer__top">
        <div>
          <Logo />
          <p className="footer__tagline">ELEKTRİK | TAAHHÜT | MÜŞAVİRLİK</p>
        </div>
        <div className="footer__right">
          <nav className="footer__nav" aria-label="Alt menü">
            {nav.slice(0, 4).map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer__social">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={12} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={12} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon name="facebook" size={12} />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {YEAR} Sarıca Mühendislik. Tüm hakları saklıdır.</span>
        <span className="footer__legal">
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Koşulları</a>
        </span>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
