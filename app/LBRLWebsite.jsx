'use client'

import React, { useState, useEffect } from 'react'

const BOOKING_URL = 'https://book.lbrltattoos.com'

const TribalLogo = ({ size = 200, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ opacity }}>
    <circle cx="100" cy="100" r="80" fill="none" stroke="#7dd4c4" strokeWidth="2" opacity="0.3"/>
    <text x="100" y="110" textAnchor="middle" fill="#7dd4c4" fontSize="32" fontWeight="300">LBRL</text>
  </svg>
)

export default function LBRLWebsite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeStyle, setActiveStyle] = useState('all')
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const colors = {
    bgDark: '#1a1f1c',
    bgPrimary: '#232a26',
    bgCard: '#2a322d',
    bgElevated: '#323b35',
    bgSage: '#3d4a42',
    borderSubtle: 'rgba(255,255,255,0.04)',
    borderDefault: 'rgba(255,255,255,0.08)',
    textPrimary: '#ffffff',
    textSecondary: '#a8b0ab',
    textMuted: '#6b756e',
    accentCyan: '#7dd4c4',
    accentOrange: '#e8a87c',
    accentTeal: '#5a8a8a',
  }

  const stats = [
    { value: '12+', label: 'Years Experience' },
    { value: '2x', label: 'Award Winner' },
    { value: '100%', label: 'Custom Designs' },
    { value: '5.0', label: 'Google Rating' },
  ]

  const styles = ['all', 'japanese', 'blackwork', 'ornamental', 'floral', 'portraits']
  
  const portfolioItems = [
    { id: 1, style: 'japanese', image: '/portfolio/japanese/copy_55E228E6-0551-46C5-AE1F-83BD632183F0.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 2, style: 'japanese', image: '/portfolio/japanese/copy_B1D30228-A3E9-444D-9479-E4A686F0BE23.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 3, style: 'japanese', image: '/portfolio/japanese/IMG_0461.png', title: 'Japanese', desc: 'Custom work' },
    { id: 4, style: 'japanese', image: '/portfolio/japanese/IMG_0465.png', title: 'Japanese', desc: 'Custom work' },
    { id: 5, style: 'japanese', image: '/portfolio/japanese/IMG_0480.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 6, style: 'japanese', image: '/portfolio/japanese/IMG_0534.png', title: 'Japanese', desc: 'Custom work' },
    { id: 7, style: 'japanese', image: '/portfolio/japanese/IMG_0536.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 8, style: 'japanese', image: '/portfolio/japanese/IMG_0597.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 9, style: 'japanese', image: '/portfolio/japanese/IMG_0781.png', title: 'Japanese', desc: 'Custom work' },
    { id: 10, style: 'japanese', image: '/portfolio/japanese/IMG_0785.png', title: 'Japanese', desc: 'Custom work' },
    { id: 11, style: 'japanese', image: '/portfolio/japanese/IMG_0787.png', title: 'Japanese', desc: 'Custom work' },
    { id: 12, style: 'japanese', image: '/portfolio/japanese/IMG_0794.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 13, style: 'japanese', image: '/portfolio/japanese/IMG_1028.png', title: 'Japanese', desc: 'Custom work' },
    { id: 14, style: 'japanese', image: '/portfolio/japanese/IMG_4404.png', title: 'Japanese', desc: 'Custom work' },
    { id: 15, style: 'japanese', image: '/portfolio/japanese/IMG_4405.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 16, style: 'japanese', image: '/portfolio/japanese/IMG_4407.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 17, style: 'japanese', image: '/portfolio/japanese/IMG_4410.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 18, style: 'japanese', image: '/portfolio/japanese/IMG_4411.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 19, style: 'japanese', image: '/portfolio/japanese/IMG_4412.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 20, style: 'japanese', image: '/portfolio/japanese/IMG_4416.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 21, style: 'japanese', image: '/portfolio/japanese/IMG_4460.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 22, style: 'japanese', image: '/portfolio/japanese/IMG_4461.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 23, style: 'japanese', image: '/portfolio/japanese/IMG_4463.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 24, style: 'japanese', image: '/portfolio/japanese/IMG_4465.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 25, style: 'japanese', image: '/portfolio/japanese/IMG_4467.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 26, style: 'japanese', image: '/portfolio/japanese/IMG_4468.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 27, style: 'japanese', image: '/portfolio/japanese/IMG_4472.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 28, style: 'japanese', image: '/portfolio/japanese/IMG_4736.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 29, style: 'japanese', image: '/portfolio/japanese/IMG_9302.png', title: 'Japanese', desc: 'Custom work' },
    { id: 30, style: 'japanese', image: '/portfolio/japanese/IMG_9303.png', title: 'Japanese', desc: 'Custom work' },
    { id: 31, style: 'japanese', image: '/portfolio/japanese/IMG_9304.png', title: 'Japanese', desc: 'Custom work' },
    { id: 32, style: 'japanese', image: '/portfolio/japanese/IMG_9305.png', title: 'Japanese', desc: 'Custom work' },
    { id: 33, style: 'japanese', image: '/portfolio/japanese/IMG_9311.png', title: 'Japanese', desc: 'Custom work' },
    { id: 34, style: 'japanese', image: '/portfolio/japanese/IMG_9312.png', title: 'Japanese', desc: 'Custom work' },
    { id: 35, style: 'japanese', image: '/portfolio/japanese/IMG_9314.png', title: 'Japanese', desc: 'Custom work' },
    { id: 36, style: 'japanese', image: '/portfolio/japanese/IMG_9315.png', title: 'Japanese', desc: 'Custom work' },
    { id: 37, style: 'japanese', image: '/portfolio/japanese/IMG_9320.png', title: 'Japanese', desc: 'Custom work' },
    { id: 38, style: 'japanese', image: '/portfolio/japanese/IMG_9321.png', title: 'Japanese', desc: 'Custom work' },
    { id: 39, style: 'japanese', image: '/portfolio/japanese/IMG_9322.png', title: 'Japanese', desc: 'Custom work' },
    { id: 40, style: 'japanese', image: '/portfolio/japanese/IMG_9371.png', title: 'Japanese', desc: 'Custom work' },
    { id: 41, style: 'japanese', image: '/portfolio/japanese/IMG_9395.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 42, style: 'japanese', image: '/portfolio/japanese/IMG_9397.png', title: 'Japanese', desc: 'Custom work' },
    { id: 43, style: 'japanese', image: '/portfolio/japanese/IMG_9398.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 44, style: 'japanese', image: '/portfolio/japanese/IMG_9410.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 45, style: 'japanese', image: '/portfolio/japanese/IMG_9411.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 46, style: 'japanese', image: '/portfolio/japanese/IMG_9413.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 47, style: 'japanese', image: '/portfolio/japanese/IMG_9415.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 48, style: 'japanese', image: '/portfolio/japanese/IMG_9417.png', title: 'Japanese', desc: 'Custom work' },
    { id: 49, style: 'japanese', image: '/portfolio/japanese/IMG_9419.png', title: 'Japanese', desc: 'Custom work' },
    { id: 50, style: 'japanese', image: '/portfolio/japanese/IMG_9445.png', title: 'Japanese', desc: 'Custom work' },
    { id: 51, style: 'japanese', image: '/portfolio/japanese/IMG_9844.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 52, style: 'japanese', image: '/portfolio/japanese/IMG_9852.webp', title: 'Japanese', desc: 'Custom work' },
    { id: 53, style: 'japanese', image: '/portfolio/japanese/IMG_9855.jpeg', title: 'Japanese', desc: 'Custom work' },
    { id: 54, style: 'japanese', image: '/portfolio/japanese/IMG_9871.png', title: 'Japanese', desc: 'Custom work' },
  ]

  const filteredPortfolio = activeStyle === 'all' ? portfolioItems : portfolioItems.filter(item => item.style === activeStyle)

  const reviews = [
    { name: 'Sarah M.', text: 'Daniel understood my vision perfectly. The way my sleeve flows with my arm is incredible.', rating: 5 },
    { name: 'Marcus T.', text: 'Best custom work in Vancouver. Worth every penny. The private studio experience was amazing.', rating: 5 },
    { name: 'Jessica L.', text: 'From consultation to final session, everything was seamless. My back piece is a masterpiece.', rating: 5 },
  ]

  const faqs = [
    { q: 'Am I Eligible for a Tattoo?', a: 'You must be at least 18 years old and present a valid ID. This is non-negotiable.' },
    { q: 'What Are the Costs Involved?', a: 'Half-day session (4 hours): $1,000. Full-day session (8 hours): $2,000. Small tattoos priced individually.' },
    { q: "What's Required to Secure an Appointment?", a: 'A $300 deposit is required to book. This guarantees priority dates and goes toward your final session.' },
    { q: 'What if I Need to Cancel or Reschedule?', a: "Cancellations with less than 72 hours notice = deposit lost. 15+ min late with no message = no-show." },
    { q: 'How Should I Prepare for My Session?', a: 'Get rest, eat well, stay hydrated, bring snacks. Come with a positive attitude!' },
    { q: 'How Do I Book a Consultation?', a: 'Fill out our booking form or DM @dani_lbrl on Instagram. Virtual consultations available.' },
  ]

  const processSteps = [
    { num: '01', title: 'Consultation', desc: 'Share your vision. We discuss placement, style, and how the design flows with your body.' },
    { num: '02', title: 'Design', desc: 'I create your custom artwork from scratch, considering every angle of your anatomy.' },
    { num: '03', title: 'Session', desc: 'In my private studio, we bring your vision to life with precision and care.' },
    { num: '04', title: 'Aftercare', desc: 'Detailed guidance ensures your tattoo heals perfectly and ages beautifully.' }
  ]

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.bgDark, color: colors.textPrimary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '12px 24px' : '20px 24px',
        background: scrolled ? 'rgba(26, 31, 28, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.borderSubtle}` : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <TribalLogo size={44} opacity={0.95} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '6px' }}>LBRL</div>
              <div style={{ fontSize: '8px', letterSpacing: '2px', color: colors.textMuted, textTransform: 'uppercase' }}>Tattoo Studio</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {['Portfolio', 'About', 'Process', 'FAQs', 'Contact'].map((item) => (
              <a key={item} onClick={() => scrollToSection(item.toLowerCase())} style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>{item}</a>
            ))}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: colors.bgDark, padding: '14px 28px', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '4px', textDecoration: 'none' }}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', background: `linear-gradient(180deg, rgba(26, 31, 28, 0.85) 0%, rgba(35, 42, 38, 0.95) 100%), url('/IMG_4330.WEBP') center/cover no-repeat` }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', marginBottom: '32px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: colors.textSecondary, textTransform: 'uppercase' }}>📍 Vancouver, Washington</span>
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 300, lineHeight: 1, margin: '0 0 8px 0', letterSpacing: '-2px' }}>Art That</h1>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 300, lineHeight: 1, margin: 0, fontStyle: 'italic', letterSpacing: '-2px', color: colors.textSecondary }}>Becomes You</h1>
          <p style={{ maxWidth: '500px', margin: '40px auto', fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary }}>Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy tailor-made, never templated.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '48px' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: colors.bgDark, padding: '18px 36px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '4px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>Book Consultation →</a>
          </div>
        </div>
      </section>

      {/* INSTAGRAM BAR */}
      <a href="https://instagram.com/dani_lbrl" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px', background: colors.bgDark, borderTop: `1px solid ${colors.borderSubtle}`, borderBottom: `1px solid ${colors.borderSubtle}`, textDecoration: 'none' }}>
        <span style={{ color: colors.textSecondary, fontSize: '13px', letterSpacing: '1px' }}>📸 @dani_lbrl</span>
      </a>

      {/* STATS */}
      <section style={{ padding: '60px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 300, marginBottom: '6px' }}>{stat.value}</div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.textMuted }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', borderRadius: '16px', background: `linear-gradient(145deg, rgba(42, 50, 45, 0.85) 0%, rgba(50, 59, 53, 0.9) 100%), url('/about-bg.webp') center/cover no-repeat`, border: `1px solid ${colors.borderSubtle}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: `linear-gradient(135deg, ${colors.accentCyan} 0%, ${colors.accentTeal} 100%)`, padding: '8px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, color: '#fff' }}>🏆 AWARD WINNER</div>
            <TribalLogo size={140} opacity={0.9} />
            <div style={{ fontSize: '24px', fontWeight: 500, marginTop: '24px' }}>Daniel Liberal</div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: colors.accentCyan, textTransform: 'uppercase', marginTop: '8px' }}>Lead Artist & Owner</div>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px' }}>From Puerto Rico 2013 est. to Vancouver, WA 2016-Present</div>
          </div>
          <div>
            <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.borderSubtle}`, borderRadius: '4px', marginBottom: '20px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: colors.textMuted, textTransform: 'uppercase' }}>The Philosophy</span>
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 28px 0', lineHeight: 1.2 }}>Body Harmony</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(125, 212, 196, 0.08)', border: '1px solid rgba(125, 212, 196, 0.15)', borderRadius: '6px', width: 'fit-content' }}>
                <span>🏆</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.accentCyan }}>3rd Place — Asian Category</div>
                  <div style={{ fontSize: '9px', color: colors.textMuted }}>Portland Tattoo Expo 2024</div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(232, 168, 124, 0.08)', border: '1px solid rgba(232, 168, 124, 0.15)', borderRadius: '6px', width: 'fit-content' }}>
                <span>🏆</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.accentOrange }}>3rd Place — Hands, Neck, Face</div>
                  <div style={{ fontSize: '9px', color: colors.textMuted }}>United Ink No Limits NYC 2016</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary, marginBottom: '20px' }}>Tattooing, for me, starts with understanding how the body carries a design. Every custom piece is designed to flow with your anatomy, considering how the skin moves, stretches, and ages over time.</p>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary }}>With 12+ years mastering this craft and awards from New York to Portland, I bring your vision to life through one-on-one collaboration. No flash. No templates. Just meaningful art.</p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>Portfolio</h2>
          </div>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', background: colors.bgCard, borderRadius: '6px', width: 'fit-content', margin: '0 auto 50px' }}>
            {styles.map((style) => (
              <button key={style} onClick={() => setActiveStyle(style)} style={{ background: activeStyle === style ? 'rgba(255,255,255,0.06)' : 'transparent', border: 'none', color: activeStyle === style ? colors.textPrimary : colors.textMuted, padding: '10px 18px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px', cursor: 'pointer' }}>{style}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {filteredPortfolio.map((item) => (
              <div key={item.id} onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)} style={{ aspectRatio: '1', backgroundImage: item.image ? `url(${item.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: colors.bgCard, borderRadius: '12px', border: `1px solid ${colors.borderSubtle}`, cursor: 'pointer', transition: 'all 0.3s', transform: hoveredItem === item.id ? 'translateY(-6px)' : 'translateY(0)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {!item.image && <TribalLogo size={60} opacity={0.1} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26, 31, 28, 0.95) 0%, transparent 60%)', opacity: hoveredItem === item.id ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: colors.accentCyan, marginTop: '4px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: '100px 24px', background: colors.bgDark }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>The Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {processSteps.map((step, i) => (
              <div key={i} style={{ padding: '32px 24px', background: `linear-gradient(145deg, ${colors.bgCard} 0%, ${colors.bgPrimary} 100%)`, borderRadius: '12px', border: `1px solid ${colors.borderSubtle}` }}>
                <div style={{ fontSize: '32px', fontWeight: 200, color: colors.textMuted, marginBottom: '16px' }}>{step.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '0 0 12px 0' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: colors.textMuted, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>Reviews</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {reviews.map((review, i) => (
              <div key={i} style={{ padding: '32px', background: `linear-gradient(145deg, ${colors.bgCard} 0%, ${colors.bgElevated} 100%)`, borderRadius: '12px', border: `1px solid ${colors.borderSubtle}` }}>
                <div style={{ marginBottom: '16px', color: colors.accentOrange, fontSize: '14px' }}>{'★'.repeat(review.rating)}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: colors.textSecondary, fontStyle: 'italic', margin: '0 0 20px 0' }}>"{review.text}"</p>
                <div style={{ fontSize: '12px', fontWeight: 500 }}>— {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faqs" style={{ padding: '100px 24px', background: colors.bgDark }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '24px', background: `linear-gradient(145deg, ${colors.bgCard} 0%, ${colors.bgPrimary} 100%)`, borderRadius: '10px', border: `1px solid ${colors.borderSubtle}` }}>
                <h4 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 12px 0' }}>{faq.q}</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: colors.textMuted, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 8px 0' }}>Book Your</h2>
          <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 28px 0', color: colors.accentCyan }}>Consultation</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: colors.textMuted, marginBottom: '40px' }}>Fill out the booking form and I'll get back to you within 1-3 business days.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ background: colors.accentTeal, color: '#fff', padding: '18px 48px', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '8px', textDecoration: 'none' }}>Book Consultation →</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: colors.textMuted, fontSize: '14px' }}>
            <span>📍 9013 NE Hwy 99, Vancouver, WA</span>
            <span>📞 (360) 901-0636</span>
            <span>🕐 By Appointment Only</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 24px 30px', borderTop: `1px solid ${colors.borderSubtle}`, background: colors.bgDark }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <TribalLogo size={36} opacity={0.9} />
            <div>
              <span style={{ fontSize: '18px', letterSpacing: '6px', fontWeight: 600 }}>LBRL</span>
              <div style={{ fontSize: '9px', color: colors.textMuted, marginTop: '2px' }}>Multi-Award Winning Custom Tattoos</div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: colors.textMuted }}>© 2026 Daniel Liberal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
