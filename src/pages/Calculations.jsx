import { useState } from 'react'
import Icon from '../components/Icon'
import { CtaBanner, PageHero } from '../components/Blocks'
import { images } from '../data/site'

const fmt = (n, d = 1) => n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d })

const FUSES = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600]

const CABLES = {
  pvc: { label: 'PVC İzoleli - NYY / YVV', factor: 1 },
  xlpe: { label: 'XLPE İzoleli - N2XH / XLPE', factor: 1.23 },
}
const CABLE_ROWS = [
  [1.5, 17.5], [2.5, 24], [4, 32], [6, 41], [10, 57], [16, 76], [25, 96], [35, 119],
  [50, 144], [70, 184], [95, 223], [120, 259], [150, 299], [185, 341], [240, 403],
]

const BUSBAR_ROWS = [
  ['15x3', 230, 180], ['20x5', 340, 265], ['25x5', 425, 330], ['30x5', 505, 395], ['40x5', 650, 505],
  ['40x10', 955, 745], ['50x5', 790, 615], ['50x10', 1145, 890], ['60x10', 1320, 1025], ['80x10', 1655, 1290],
  ['100x10', 1985, 1545], ['120x10', 2305, 1795], ['160x10', 2940, 2290],
]

const AWG_ROWS = [
  ['4/0 (0000)', 107.2], ['3/0 (000)', 85], ['2/0 (00)', 67.4], ['1/0 (0)', 53.5], ['1', 42.4], ['2', 33.6],
  ['3', 26.7], ['4', 21.2], ['6', 13.3], ['8', 8.37], ['10', 5.26], ['12', 3.31], ['14', 2.08], ['16', 1.31],
  ['18', 0.823], ['20', 0.519],
]

const sections = [
  { id: 'akim-sigorta', label: 'Akım - Sigorta Hesabı' },
  { id: 'kablo-akim', label: 'Kablo Akım Taşıma' },
  { id: 'bara-akim', label: 'Bara Akım Taşıma' },
  { id: 'gerilim-dusumu', label: 'Gerilim Düşümü Hesabı' },
  { id: 'awg', label: 'AWG - mm² Dönüşümü' },
]

function CalcCard({ id, icon, title, text, children }) {
  return (
    <article className="calc-card" id={id}>
      <header className="calc-card__head">
        <span className="calc-card__icon">
          <Icon name={icon} size={18} />
        </span>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </header>
      <div className="calc-card__body">{children}</div>
    </article>
  )
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="field-group">
      <span className="field-label">{label}</span>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            className={value === o.value ? 'is-active' : ''}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <span className="select">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>
              {o.label ?? o}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={16} />
      </span>
    </label>
  )
}

function NumberInput({ label, value, onChange }) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <input className="input" type="number" inputMode="decimal" min="0" step="any" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function Result({ items }) {
  return (
    <div className="calc-result">
      {items.map((it) => (
        <div key={it.label}>
          <strong>{it.value}</strong>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  )
}

function DataTable({ head, rows, highlight }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className={String(r[0]) === String(highlight) ? 'is-highlight' : ''}>
              {r.map((c, i) => (
                <td key={i}>{typeof c === 'number' ? c.toLocaleString('tr-TR') : c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DEFAULT_VOLTAGE = { ac3: 400, ac1: 230, dc: 24 }

function currentFor({ type, power, voltage, pf, eff }) {
  const P = Number(power) * 1000
  const U = Number(voltage)
  if (!P || !U) return null
  if (type === 'ac3') return P / (Math.sqrt(3) * U * Number(pf) * Number(eff))
  if (type === 'ac1') return P / (U * Number(pf) * Number(eff))
  return P / (U * Number(eff))
}

function CurrentCalc() {
  const [v, setV] = useState({ type: 'ac3', power: '22', voltage: '400', pf: '0.85', eff: '0.90' })
  const [result, setResult] = useState(() => currentFor(v))
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val, ...(k === 'type' ? { voltage: String(DEFAULT_VOLTAGE[val]) } : {}) }))
  const fuse = result ? FUSES.find((f) => f >= result * 1.1) : null

  return (
    <CalcCard
      id="akim-sigorta"
      icon="lightbulb"
      title="Aktif Güce Göre Akım - Sigorta Hesabı"
      text="Aktif güç, gerilim, güç katsayısı ve verim değerlerine göre çekilecek akımı ve önerilen sigorta değerini hesaplayın."
    >
      <Segmented
        label="Akım Tipi"
        value={v.type}
        onChange={set('type')}
        options={[
          { value: 'ac3', label: 'AC 3-Faz' },
          { value: 'ac1', label: 'AC 1-Faz' },
          { value: 'dc', label: 'DC' },
        ]}
      />
      <div className="calc-grid">
        <NumberInput label="Aktif Güç (kW)" value={v.power} onChange={set('power')} />
        <NumberInput label="Gerilim (V)" value={v.voltage} onChange={set('voltage')} />
        {v.type !== 'dc' && (
          <Select
            label="Güç Katsayısı (cos φ)"
            value={v.pf}
            onChange={set('pf')}
            options={['0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00']}
          />
        )}
        <Select label="Verim (η)" value={v.eff} onChange={set('eff')} options={['0.80', '0.85', '0.90', '0.95', '1.00']} />
      </div>
      <button type="button" className="btn btn--primary btn--calc" onClick={() => setResult(currentFor(v))}>
        Hesapla
      </button>
      <Result
        items={[
          { value: result ? `${fmt(result)} A` : '—', label: 'Hesaplanan Akım (I)' },
          { value: fuse ? `${fuse} A (C Tipi)` : result ? '> 1600 A' : '—', label: 'Önerilen Sigorta Değeri' },
        ]}
      />
    </CalcCard>
  )
}

function CableCalc() {
  const [type, setType] = useState('pvc')
  const [section, setSection] = useState('25')
  const factor = CABLES[type].factor
  const rows = CABLE_ROWS.map(([s, a]) => [s, Math.round(a * factor * 10) / 10])

  return (
    <CalcCard
      id="kablo-akim"
      icon="cable"
      title="Kablo Akım Taşıma Kapasiteleri"
      text="Kablo tipi ve kesitine göre izin verilen sürekli akım taşıma kapasitesini referans tablodan görüntüleyin."
    >
      <div className="calc-grid">
        <Select label="Kablo Tipi" value={type} onChange={setType} options={Object.entries(CABLES).map(([k, c]) => ({ value: k, label: c.label }))} />
        <Select label="Kesit (mm²)" value={section} onChange={setSection} options={CABLE_ROWS.map(([s]) => String(s))} />
      </div>
      <DataTable head={['Kesit (mm²)', 'Akım Taşıma Kapasitesi (A)']} rows={rows} highlight={section} />
      <p className="calc-note">
        Değerler, bakır iletkenli {type === 'pvc' ? 'PVC' : 'XLPE'} izoleli kablolar için hava ortamında döşeme referans alınarak verilmiştir.
        Ortam sıcaklığı, döşeme yöntemi ve gruplama katsayılarına göre değişiklik gösterebilir. Projelerinizde ilgili standart ve
        yönetmelikler esas alınmalıdır.
      </p>
    </CalcCard>
  )
}

function BusbarCalc() {
  const [metal, setMetal] = useState('cu')
  const [size, setSize] = useState('50x10')

  return (
    <CalcCard
      id="bara-akim"
      icon="layers"
      title="Bara Akım Taşıma Kapasiteleri"
      text="Bakır veya alüminyum bara ölçüsüne göre izin verilen sürekli akım taşıma kapasitesini referans tablodan görüntüleyin."
    >
      <div className="calc-grid">
        <Select
          label="Bara Tipi"
          value={metal}
          onChange={setMetal}
          options={[
            { value: 'cu', label: 'Bakır' },
            { value: 'al', label: 'Alüminyum' },
          ]}
        />
        <Select label="Ölçü (mm)" value={size} onChange={setSize} options={BUSBAR_ROWS.map(([s]) => s)} />
      </div>
      <DataTable head={['Ölçü (mm)', 'Bakır (A)', 'Alüminyum (A)']} rows={BUSBAR_ROWS} highlight={size} />
      <p className="calc-note">
        Değerler tek bara düzeninde, 35°C ortam sıcaklığı ve 65°C bara sıcaklığı için yaygın üretici referans tablolarından alınmıştır.
        Gerçek kapasite montaj düzeni, havalandırma ve yüzey işlemine göre değişebilir. Projelerinizde ilgili standart ve yönetmelikler esas
        alınmalıdır.
      </p>
    </CalcCard>
  )
}

const DROP_LIMIT = 5

function dropFor({ voltage, metal, power, length, section }) {
  const U = Number(voltage)
  const k = metal === 'cu' ? 56 : 35
  const P = Number(power) * 1000
  // %e = 100·L·P / (k·S·U²) üç faz, tek fazda iki iletken olduğundan 200·L·P / (k·S·U²)
  const coef = U === 380 ? 100 : 200
  const percent = (coef * Number(length) * P) / (k * Number(section) * U * U)
  return { percent, volts: (percent * U) / 100 }
}

function VoltageDropCalc() {
  const [v, setV] = useState({ voltage: '380', metal: 'cu', power: '15', length: '45', section: '16' })
  const [result, setResult] = useState(() => dropFor(v))
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }))
  const ok = result.percent <= DROP_LIMIT

  return (
    <CalcCard
      id="gerilim-dusumu"
      icon="activity"
      title="AG Tesislerinde Gerilim Düşümü Hesabı"
      text="Hat uzunluğu, iletken kesiti ve yüke göre alçak gerilim tesislerindeki gerilim düşümünü hesaplayın."
    >
      <div className="calc-grid">
        <Segmented
          label="Gerilim"
          value={v.voltage}
          onChange={set('voltage')}
          options={[
            { value: '220', label: '220 V' },
            { value: '380', label: '380 V' },
          ]}
        />
        <Segmented
          label="İletken Tipi"
          value={v.metal}
          onChange={set('metal')}
          options={[
            { value: 'cu', label: 'Bakır' },
            { value: 'al', label: 'Alüminyum' },
          ]}
        />
        <Select label="Aktif Güç (kW)" value={v.power} onChange={set('power')} options={['1', '2', '3', '5', '7.5', '10', '15', '20', '25', '30', '40', '50', '75', '100']} />
        <Select label="Hat Uzunluğu (m)" value={v.length} onChange={set('length')} options={['10', '15', '20', '25', '30', '35', '40', '45', '50', '60', '75', '100', '150', '200']} />
        <Select label="İletken Kesiti (mm²)" value={v.section} onChange={set('section')} options={CABLE_ROWS.map(([s]) => String(s))} />
      </div>
      <button type="button" className="btn btn--primary btn--calc" onClick={() => setResult(dropFor(v))}>
        Hesapla
      </button>
      <Result
        items={[
          { value: `${fmt(result.volts)} V`, label: 'Gerilim Düşümü (ΔU)' },
          { value: `%${fmt(result.percent)}`, label: 'Yüzdesel Gerilim Düşümü' },
        ]}
      />
      <p className={`calc-status${ok ? '' : ' calc-status--warn'}`}>
        {ok
          ? `✓ Hesaplanan değer, Elektrik İç Tesisleri Yönetmeliği'nde öngörülen %${DROP_LIMIT} gerilim düşümü sınırının altındadır.`
          : `⚠ Hesaplanan değer, %${DROP_LIMIT} gerilim düşümü sınırını aşıyor. Daha büyük bir iletken kesiti seçmeyi değerlendirin.`}
      </p>
    </CalcCard>
  )
}

function AwgCalc() {
  const [awg, setAwg] = useState('10')
  return (
    <CalcCard id="awg" icon="ruler" title="AWG - mm² Dönüşüm Cetveli" text="Amerikan kablo ölçü standardı (AWG) ile metrik kesit (mm²) karşılıklarını görüntüleyin.">
      <Select label="AWG / Ölçü" value={awg} onChange={setAwg} options={AWG_ROWS.map(([a]) => a)} />
      <DataTable head={['AWG / Ölçü', 'Kesit (mm²)']} rows={AWG_ROWS} highlight={awg} />
      <p className="calc-note">Değerler, iletkenin kesit alanı yuvarlak iletkenler için matematiksel AWG-mm² karşılık tablosuna göre hesaplanmıştır.</p>
    </CalcCard>
  )
}

export default function Calculations() {
  return (
    <>
      <PageHero
        image={images.calcHero}
        eyebrow="HESAPLAMALAR"
        eyebrowIcon="calculator"
        title="Mühendislik Hesaplama Araçları"
        text="Projelerinizde ihtiyaç duyduğunuz temel elektrik hesaplamalarını ve referans tablolarını hızlı, güvenilir ve sahaya uygun şekilde kullanın."
      />
      <section className="section section--calc">
        <div className="container">
          <nav className="calc-tabs" aria-label="Hesaplama araçları">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="calc-list">
            <CurrentCalc />
            <CableCalc />
            <BusbarCalc />
            <VoltageDropCalc />
            <AwgCalc />
          </div>
        </div>
      </section>
      <CtaBanner
        title={
          <>
            Hesaplamalarınızı Doğrulamak mı
            <br />
            İstiyorsunuz?
          </>
        }
        text="Projenizin özel koşullarına göre profesyonel mühendislik desteği için ekibimizle iletişime geçin."
      />
    </>
  )
}
