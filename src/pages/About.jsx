import { CheckList, CtaBanner, Eyebrow, FeatureCard, PageHero } from '../components/Blocks'
import { images } from '../data/site'

const tags = [
  'Elektrik Taahhüt',
  'Yüksek/Alçak Gerilim Sistemleri',
  'Trafo Kurulumu',
  'Kompanzasyon Sistemleri',
  'Elektrik Projelendirme',
  'Dağıtım Sistemleri',
  'Uygulama Süreçleri',
]

const values = [
  { icon: 'file', title: 'Şeffaflık', text: 'Süreç boyunca açık ve anlaşılır iletişim kuruyoruz.' },
  { icon: 'calendar', title: 'Doğru Planlama', text: 'Her projeyi doğru analiz ve planlamayla başlatıyoruz.' },
  { icon: 'award', title: 'Kaliteli Uygulama', text: 'Sahada aynı özeni ve teknik titizliği gösteriyoruz.' },
  { icon: 'phone', title: 'Erişilebilirlik', text: 'Proje boyunca her zaman ulaşılabilir oluyoruz.' },
]

export default function About() {
  return (
    <>
      <PageHero
        image={images.aboutHero}
        align="right"
        eyebrow="KURUMSAL"
        title={
          <>
            Enerjiyi Doğru Planlıyor,
            <br />
            Güvenle Hayata Geçiriyoruz.
          </>
        }
        text="Sarıca Mühendislik olarak; elektrik enerjisinin üretim noktasından kullanım alanına kadar güvenli, verimli ve sürdürülebilir şekilde ulaşmasını sağlamak amacıyla elektrik mühendisliği ve taahhüt alanında kapsamlı çözümler sunuyoruz."
      />

      <section className="section">
        <div className="container intro">
          <p>
            Elektrik sistemlerinin yalnızca kurulmasından değil, doğru şekilde planlanmasından, projelendirilmesinden, uygulanmasından ve
            uzun yıllar güvenle çalışmasından sorumlu olduğumuzun bilinciyle hareket ediyoruz. Her projeyi kendi ihtiyaçları, kullanım amacı
            ve teknik gereksinimleri doğrultusunda değerlendiriyor; mühendislik yaklaşımımızı sahadaki uygulama deneyimimizle bir araya
            getiriyoruz.
          </p>
          <p>
            Konutlardan ticari yapılara, sanayi tesislerinden üretim tesislerine kadar farklı ölçeklerde projelerde; elektrik taahhüt, yüksek
            ve alçak gerilim sistemleri, trafo kurulumu, kompanzasyon sistemleri, elektrik projelendirme, dağıtım sistemleri ve uygulama
            süreçlerinde uçtan uca hizmet veriyoruz.
          </p>
          <ul className="tags">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--media">
          <img src={images.aboutApproach} alt="Pano üzerinde çalışan mühendis" className="framed-img framed-img--left" />
          <div>
            <Eyebrow>YAKLAŞIMIMIZ</Eyebrow>
            <h2 className="h2 h2--sm">Projenin Her Aşamasında Yanınızdayız</h2>
            <p className="lead">
              Başarılı bir elektrik altyapısının yalnızca kaliteli malzemelerle değil, doğru mühendislik ve doğru uygulamayla mümkün olduğuna
              inanıyoruz. Bu nedenle çalışmalarımıza proje ihtiyaçlarının doğru analiz edilmesiyle başlıyor; tasarım ve hesaplama
              aşamasından saha uygulamasına kadar tüm süreçleri bir bütün olarak ele alıyoruz.
            </p>
            <CheckList items={['İş Güvenliği', 'Enerji Verimliliği', 'Teknik Standartlara Uygunluk', 'Sürdürülebilirlik', 'Uzun Ömürlü Kullanım']} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--media split--reverse">
          <img src={images.aboutPractice} alt="Elektrik projesi ve ölçüm aletleri" className="framed-img" />
          <div>
            <Eyebrow>MÜHENDİSLİKTEN UYGULAMAYA</Eyebrow>
            <h2 className="h2 h2--sm">Mühendislikten Uygulamaya</h2>
            <p className="lead">
              Sarıca Mühendislik'in çalışma anlayışının temelinde, projelendirme ile saha uygulamasının birbirinden ayrı düşünülemeyeceği
              yaklaşımı bulunuyor. Masa başında hazırlanan bir projenin sahadaki gerçek koşullarla uyumlu olması gerektiğine inanıyoruz.
            </p>
            <p className="lead">
              Deneyimli ekip ve çözüm ortaklarımızla birlikte, projenin gerektirdiği tüm uygulama süreçlerini planlıyor; iş programına, teknik
              şartnamelere ve ilgili standartlara uygun şekilde ilerliyoruz. Amacımız yalnızca bir işi tamamlamak değil, uzun yıllar güvenle
              çalışabilecek bir elektrik altyapısı ortaya koymak.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--media">
          <img src={images.aboutEfficiency} alt="Endüstriyel tesis" className="framed-img framed-img--left" />
          <div>
            <Eyebrow>VERİMLİLİK VE SÜRDÜRÜLEBİLİRLİK</Eyebrow>
            <h2 className="h2 h2--sm">Verimli, Güvenli ve Sürdürülebilir Çözümler</h2>
            <p className="lead">
              Enerji maliyetlerinin ve enerji verimliliğinin her geçen gün daha önemli hale geldiği günümüzde, elektrik sistemlerinin doğru
              tasarlanması işletmeler için önemli bir avantaj sağlıyor.
            </p>
            <p className="lead">
              Bu doğrultuda, enerji kullanımının daha verimli hale getirilmesine yönelik mühendislik çözümleri geliştiriyor; özellikle
              kompanzasyon ve güç kalitesi gibi konularda tesisin ihtiyaçlarına uygun çözümler sunuyoruz. Doğru kapasite seçimi ve sağlıklı bir
              dağıtım altyapısının, hem işletme güvenliği hem de uzun vadeli maliyetlerin kontrolü açısından büyük önem taşıdığına inanıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <Eyebrow>DEĞERLERİMİZ</Eyebrow>
            <h2 className="h2 h2--sm">İşimizi Ciddiye Alıyoruz</h2>
            <p className="lead">
              Bizim için her proje, arkasında güvenlik, sorumluluk ve uzun vadeli kullanım bulunan bir mühendislik çalışmasıdır.
            </p>
          </div>
          <div className="feature-grid feature-grid--plain">
            {values.map((v, i) => (
              <FeatureCard key={v.title} {...v} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Geleceğin Enerjisini Bugünden Planlıyoruz"
        text="Güncel mühendislik yaklaşımını saha deneyimiyle birleştirerek, sürdürülebilir ve yarının ihtiyaçlarına hazır elektrik altyapıları oluşturuyoruz."
        button="Hizmetlerimizi İnceleyin"
        to="/hizmetler"
      />
    </>
  )
}
