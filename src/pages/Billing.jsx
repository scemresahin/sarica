import { useState } from 'react'
import Icon from '../components/Icon'
import { Eyebrow } from '../components/Blocks'
import { contact, images } from '../data/site'

const COMPANY = 'SARICA PROJE MÜHENDİSLİK LTD. ŞTİ.'

const taxInfo = [
  { label: 'İlyasbey Vergi Dairesi', value: '747 116 3396' },
  { label: 'Mersis No', value: '0747 1163 3960 0001' },
  { label: 'Ticaret Sicil No', value: '38582' },
]

const CURRENCIES = {
  try: { symbol: '₺', label: 'Türk Lirası' },
  usd: { symbol: '$', label: 'Dolar' },
  eur: { symbol: '€', label: 'Euro' },
}

const banks = [
  {
    id: 'garanti',
    branch: 'Gebze Yeni Çarşı Şubesi',
    accounts: [{ currency: 'try', iban: 'TR70 0006 2000 7750 0006 2935 05' }],
  },
  {
    id: 'isbank',
    branch: 'Gebze Oto Sanayi Sitesi Şubesi',
    accounts: [
      { currency: 'try', iban: 'TR79 0006 4000 0012 4320 1106 24' },
      { currency: 'usd', iban: 'TR70 0006 4000 0022 4320 0412 32' },
      { currency: 'eur', iban: 'TR10 0006 4000 0022 4320 0414 39' },
    ],
  },
  {
    id: 'vakifbank',
    branch: 'İbrahimağa Caddesi Şubesi',
    accounts: [{ currency: 'try', iban: 'TR64 0001 5001 5800 7319 5179 10' }],
  },
]

// Figma'daki banka logolarının yerine geçen yazı tabanlı logolar
function BankLogo({ id }) {
  if (id === 'garanti')
    return (
      <span className="bank-logo bank-logo--garanti">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <g fill="currentColor">
            <circle cx="8.3" cy="8.3" r="4.6" />
            <circle cx="15.7" cy="8.3" r="4.6" />
            <circle cx="8.3" cy="15.7" r="4.6" />
            <circle cx="15.7" cy="15.7" r="4.6" />
            <circle cx="12" cy="12" r="2.4" fill="#fff" />
          </g>
        </svg>
        Garanti
      </span>
    )
  if (id === 'isbank')
    return (
      <span className="bank-logo bank-logo--isbank">
        TÜRKİYE <b>İŞ</b> BANKASI
      </span>
    )
  return (
    <span className="bank-logo bank-logo--vakifbank">
      <svg viewBox="0 0 24 16" width="22" height="15" aria-hidden="true">
        <path d="M5 0h19l-5 16H0z" fill="currentColor" />
        <path d="M7 4h11M5.5 8h11M4 12h11" stroke="#fff" strokeWidth="1.6" />
      </svg>
      VakıfBank
    </span>
  )
}

function IbanRow({ currency, iban }) {
  const [copied, setCopied] = useState(false)
  const c = CURRENCIES[currency]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Panoya erişim yoksa IBAN zaten seçilebilir metin olarak duruyor
    }
  }

  return (
    <li className="iban-row">
      <span className="iban-row__symbol" aria-hidden="true">
        {c.symbol}
      </span>
      <span className="iban-row__label">{c.label}</span>
      <span className="iban-row__iban">{iban}</span>
      <button type="button" className="iban-row__copy" onClick={copy} aria-label={`${c.label} IBAN'ını kopyala`}>
        <Icon name={copied ? 'check' : 'copy'} size={14} />
        <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
      </button>
    </li>
  )
}

export default function Billing() {
  return (
    <>
      <section className="billing-hero" style={{ '--hero-img': `url(${images.homeHero})` }}>
        <div className="container">
          <h1 className="eyebrow eyebrow--center billing-hero__title">FATURA &amp; BANKA BİLGİLERİ</h1>
        </div>
      </section>

      <section className="billing">
        <div className="container billing__inner">
          <article className="billing-card">
            <Eyebrow>FATURA BİLGİLERİ</Eyebrow>
            <h2 className="billing-card__title">{COMPANY}</h2>
            <p className="billing-card__address">{contact.address}</p>
            <dl className="tax-info">
              {taxInfo.map((t) => (
                <div key={t.label}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="billing-card">
            <Eyebrow>BANKA BİLGİLERİ</Eyebrow>
            <h2 className="billing-card__title">{COMPANY}</h2>
            <div className="banks">
              {banks.map((b) => (
                <div key={b.id} className="bank">
                  <BankLogo id={b.id} />
                  <h3 className="bank__branch">{b.branch}</h3>
                  <ul className="bank__accounts">
                    {b.accounts.map((a) => (
                      <IbanRow key={a.iban} {...a} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
