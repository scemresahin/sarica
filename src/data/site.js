// Görseller Figma dosyasındaki orijinallerdir (public/images)
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`

export const images = {
  homeHero: img('home-hero'),
  homeAbout: img('home-about'),
  safety: img('safety'),
  servicesHero: img('services-hero'),
  aboutHero: img('about-hero'),
  aboutApproach: img('about-approach'),
  aboutPractice: img('about-practice'),
  aboutEfficiency: img('about-efficiency'),
  contactHero: img('contact-hero'),
  calcHero: img('about-practice'),
}

export const nav = [
  { to: '/kurumsal', label: 'Kurumsal' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/#referanslar', label: 'Referanslar' },
  { to: '/iletisim', label: 'İletişim' },
  { to: '/hesaplamalar', label: 'Hesaplamalar' },
]

export const contact = {
  phone: '+90 262 500 10 01',
  phoneHref: 'tel:+902625001001',
  email: 'info@saricamuhendislik.com',
  address: 'Gaziler Mh. Issıkgöl Cd. Gökçe Vizyon Plaza No: 138/67 Kat:4 Gebze-Kocaeli, TR',
  addressShort: 'Gaziler Mh. Issıkgöl Cd. Gökçe Vizyon Plaza No: 138/67 Kat:4 Gebze-Kocaeli',
  hours: 'Pazartesi – Cuma, 09:00 – 18:00',
  whatsapp: 'https://wa.me/902625001001',
  mapEmbed:
    'https://maps.google.com/maps?q=Iss%C4%B1kg%C3%B6l%20Cd.%20No%3A138%2C%20Gaziler%2C%20Gebze%2C%20Kocaeli&hl=tr&z=16&output=embed',
}

export const services = [
  {
    title: 'Elektrik Proje, Danışmanlık ve Uygulama',
    text: 'Alçak ve yüksek gerilim sistemlerinde projelendirmeden saha kurulumuna kadar uçtan uca mühendislik çözümleri sunuyoruz.',
    image: img('service-1'),
  },
  {
    title: 'Endüstriyel Elektrik Taahhüt Hizmetleri',
    text: 'Fabrika, ticari yapı ve sanayi tesislerinin elektrik altyapılarını uluslararası standartlarda güvenle hayata geçiriyoruz.',
    image: img('service-2'),
  },
  {
    title: 'Yıldırımdan Korunma ve Topraklama Sistemleri',
    text: 'Tesis güvenliğini en üst düzeye çıkarmak için paratoner kurulumu, topraklama ölçümü ve koruyucu bakım hizmetleri sağlıyoruz.',
    image: img('service-3'),
  },
  {
    title: 'Trafo Merkezi ve Enerji Dağıtım Çözümleri',
    text: 'Orta gerilim trafo merkezlerinin kurulumu, hücresel dağıtım ve enerji sürekliliğini garanti eden altyapı projeleri yürütüyoruz.',
    image: img('service-4'),
  },
  {
    title: 'Periyodik Teknik Ölçüm, Test ve Denetim',
    text: 'İç tesisat denetimi, termal kamera taraması ve yasal mevzuata uygun teknik kontrol raporlamaları sunuyoruz.',
    image: img('service-5'),
  },
  {
    title: 'Teknik Müşavirlik ve Proje Yönetimi',
    text: 'Yatırımlarınızın her aşamasında teknik şartname hazırlığı, maliyet analizi ve bağımsız saha denetim desteği sağlıyoruz.',
    image: img('service-6'),
  },
]

export const stats = [
  { value: '15+', label: 'Yıl Deneyim' },
  { value: '250+', label: 'Tamamlanan Proje' },
  { value: '%100', label: 'İş Güvenliği Standardı' },
  { value: '7/24', label: 'Teknik Destek' },
]
