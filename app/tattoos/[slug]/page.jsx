import { notFound } from 'next/navigation'
import { tattooServices, getTattooService } from '../../../lib/tattooServices'

const baseUrl = 'https://www.lbrltattoos.com'
const cyan = '#7dd4c4', muted = '#a8b0ab', bg = '#1a1f1c'
const border = '1px solid rgba(255,255,255,0.12)'

export const dynamicParams = false
export function generateStaticParams() {
  return tattooServices.map(({ slug }) => ({ slug }))
}
export function generateMetadata({ params }) {
  const service = getTattooService(params.slug)
  if (!service) return { title: 'Tattoo Styles | LBRL Studio', robots: { index: false } }
  const url = baseUrl + '/tattoos/' + service.slug
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { title: service.title, description: service.description, url, type: 'website', siteName: 'LBRL Tattoo Studio' },
  }
}

export default function TattooServicePage({ params }) {
  const service = getTattooService(params.slug)
  if (!service) notFound()
  return (
    <main style={{ background: bg, color: '#fff', minHeight: '100vh', padding: '28px 20px 80px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', borderBottom: border, paddingBottom: 24 }}>
          <a href="/" style={{ color: '#fff', fontSize: 24, letterSpacing: 5, textDecoration: 'none', fontWeight: 300 }}>LBRL</a>
          <a href="https://ta2.do/Dani_lbrl" target="_blank" rel="noopener noreferrer" style={{ color: bg, background: cyan, padding: '12px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>Book Consultation</a>
        </header>
        <nav aria-label="Breadcrumb" style={{ color: muted, paddingTop: 28, fontSize: 13 }}>
          <a href="/" style={{ color: cyan }}>Home</a><span aria-hidden="true"> / </span>{service.short}
        </nav>
        <article>
          <p style={{ color: cyan, letterSpacing: 2, textTransform: 'uppercase', fontSize: 12, marginTop: 46 }}>Custom Tattoo Studio · Vancouver, Washington</p>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.12, fontWeight: 300, margin: '18px 0 24px' }}>{service.short} in Vancouver, WA</h1>
          <p style={{ color: muted, fontSize: 18, lineHeight: 1.8, maxWidth: 810 }}>{service.lead}</p>
          <section style={{ marginTop: 42, maxWidth: 830 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300 }}>How I Approach This Work</h2>
            <p style={{ color: muted, lineHeight: 1.85, marginTop: 14 }}>{service.approach}</p>
            <h2 style={{ fontSize: 28, fontWeight: 300, marginTop: 40 }}>Planning the Composition</h2>
            {service.details.map(([heading, description]) => (
              <div key={heading} style={{ borderBottom: border, padding: '18px 0' }}>
                <h3 style={{ fontSize: 17, fontWeight: 500 }}>{heading}</h3>
                <p style={{ color: muted, lineHeight: 1.75, marginTop: 8 }}>{description}</p>
              </div>
            ))}
          </section>
          <h2 style={{ fontWeight: 300, fontSize: 28, margin: '56px 0 25px' }}>Tattoo Portfolio</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 18 }}>
            {service.images.map(([path, alt]) => (
              <figure key={path} style={{ margin: 0, borderRadius: 12, overflow: 'hidden', border, background: '#232a26' }}>
                <img src={'/portfolio/' + path} alt={alt + ' by Daniel Liberal in Vancouver, WA'} loading="lazy" decoding="async" width="480" height="600" style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover' }} />
                <figcaption style={{ color: muted, padding: 14, fontSize: 13, lineHeight: 1.6 }}>{alt}</figcaption>
              </figure>
            ))}
          </div>
          <section style={{ marginTop: 50, maxWidth: 840 }}>
            <h2 style={{ fontSize: 27, fontWeight: 300 }}>{service.faq[0]}</h2>
            <p style={{ color: muted, lineHeight: 1.8, marginTop: 15 }}>{service.faq[1]}</p>
            <h2 style={{ fontSize: 27, fontWeight: 300, marginTop: 45 }}>Start Your Custom Tattoo</h2>
            <p style={{ color: muted, lineHeight: 1.8, marginTop: 14 }}>I work by appointment at my private studio in Vancouver, Washington. We can discuss your idea, placement and overall composition before booking a tattoo session.</p>
            <a href="https://ta2.do/Dani_lbrl" target="_blank" rel="noopener noreferrer" style={{ background: cyan, color: bg, borderRadius: 8, display: 'inline-block', padding: '16px 25px', marginTop: 22, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Start Your Consultation</a>
          </section>
        </article>
        <nav aria-label="Other tattoo services" style={{ borderTop: border, marginTop: 65, paddingTop: 30 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300 }}>Explore More Tattoo Styles</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22 }}>
            {tattooServices.filter(s => s.slug !== service.slug).map(s => (
              <a key={s.slug} href={'/tattoos/' + s.slug} style={{ color: cyan, background: '#232a26', textDecoration: 'none', padding: '12px 15px', borderRadius: 8, fontSize: 13 }}>{s.short}</a>
            ))}
          </div>
        </nav>
        <footer style={{ color: muted, fontSize: 12, marginTop: 54 }}>LBRL Tattoo Studio · Vancouver, WA · By appointment</footer>
      </div>
    </main>
  )
}
