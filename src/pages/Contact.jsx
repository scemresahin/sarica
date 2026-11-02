import { useState } from 'react'
import Icon from '../components/Icon'
import { Eyebrow, MapCard, PageHero } from '../components/Blocks'
import { contact, images } from '../data/site'

const fields = [
  { name: 'name', label: 'Adınız', placeholder: 'Adınız Soyadınız', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'E-posta Adresiniz', placeholder: 'ornek@eposta.com', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Konu', placeholder: 'Mesajınızın konusu', type: 'text' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // Backend bağlanana kadar mesaj, kullanıcının e-posta istemcisinde hazırlanır.
    const body = `${form.message}\n\n${form.name} — ${form.email}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const cards = [
    { icon: 'phone', label: 'Telefon', value: contact.phone, href: contact.phoneHref },
    { icon: 'pin', label: 'Adres', value: contact.addressShort },
    { icon: 'mail', label: 'E-posta', value: contact.email, href: `mailto:${contact.email}` },
  ]

  return (
    <>
      <PageHero
        image={images.contactHero}
        align="center"
        eyebrow="İLETİŞİM"
        title="Bizimle İletişime Geçin"
        text="Projeniz için teklif almak ya da sorularınızı iletmek için bize yazın."
      />
      <div className="container">
        <div className="contact-cards">
          {cards.map((c) => (
            <div key={c.label} className="contact-cards__item">
              <Icon name={c.icon} size={18} />
              <strong>{c.label}</strong>
              {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
            </div>
          ))}
        </div>
      </div>
      <section className="section section--contact">
        <div className="container split split--contact">
          <form className="contact-form" onSubmit={submit}>
            <Eyebrow>MESAJ GÖNDERİN</Eyebrow>
            <h2 className="h2 h2--sm">Bize Yazın, Size Dönelim</h2>
            {fields.map((f) => (
              <label key={f.name} className="field">
                <span>{f.label}</span>
                <input
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  value={form[f.name]}
                  onChange={update}
                  required
                />
              </label>
            ))}
            <label className="field">
              <span>Mesajınız</span>
              <textarea
                name="message"
                rows={3}
                placeholder="Projeniz veya sorunuz hakkında bilgi verin..."
                value={form.message}
                onChange={update}
                required
              />
            </label>
            <button type="submit" className="btn btn--primary btn--block">
              Gönder
            </button>
            {sent && <p className="form-note">Teşekkürler! E-posta uygulamanızda mesajınız hazırlandı.</p>}
          </form>
          <MapCard src={contact.mapEmbed} label="Sarıca Mühendislik" address="Gaziler Mh. Issıkgöl Cd. Gökçe Vizyon Plaza, Gebze-Kocaeli" />
        </div>
      </section>
    </>
  )
}
