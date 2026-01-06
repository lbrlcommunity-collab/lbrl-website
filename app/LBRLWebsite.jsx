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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [sliderIndex, setSliderIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setCurrentImage((prev) => (prev + 1) % filteredPortfolio.length)
      if (e.key === 'ArrowLeft') setCurrentImage((prev) => (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  useEffect(() => {
    setSliderIndex(0)
  }, [activeStyle])

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

  const styleFilters = [
    { value: 'all', label: 'All' },
    { value: 'japanese', label: 'Neo Japanese' },
    { value: 'blackwork', label: 'Blackwork' },
    { value: 'ornamental', label: 'Ornamental' },
    { value: 'floral', label: 'Floral' },
  ]
  
  const portfolioItems = [
    { id: 1, style: 'japanese', image: '/portfolio/japanese/IMG_0461.png' },
    { id: 2, style: 'japanese', image: '/portfolio/japanese/IMG_0465.png' },
    { id: 3, style: 'japanese', image: '/portfolio/japanese/IMG_0480.webp' },
    { id: 4, style: 'japanese', image: '/portfolio/japanese/IMG_0534.png' },
    { id: 5, style: 'japanese', image: '/portfolio/japanese/IMG_0536.jpeg' },
    { id: 6, style: 'japanese', image: '/portfolio/japanese/IMG_0597.jpeg' },
    { id: 7, style: 'japanese', image: '/portfolio/japanese/IMG_0781.png' },
    { id: 8, style: 'japanese', image: '/portfolio/japanese/IMG_0785.png' },
    { id: 9, style: 'japanese', image: '/portfolio/japanese/IMG_0787.png' },
    { id: 10, style: 'japanese', image: '/portfolio/japanese/IMG_0794.jpeg' },
    { id: 11, style: 'japanese', image: '/portfolio/japanese/IMG_1028.png' },
    { id: 12, style: 'japanese', image: '/portfolio/japanese/IMG_4404.png' },
    { id: 13, style: 'japanese', image: '/portfolio/japanese/IMG_4405.webp' },
    { id: 14, style: 'japanese', image: '/portfolio/japanese/IMG_4407.webp' },
    { id: 15, style: 'japanese', image: '/portfolio/japanese/IMG_4410.webp' },
    { id: 16, style: 'japanese', image: '/portfolio/japanese/IMG_4411.webp' },
    { id: 17, style: 'japanese', image: '/portfolio/japanese/IMG_4412.jpeg' },
    { id: 18, style: 'japanese', image: '/portfolio/japanese/IMG_4416.jpeg' },
    { id: 19, style: 'japanese', image: '/portfolio/japanese/IMG_4460.webp' },
    { id: 20, style: 'japanese', image: '/portfolio/japanese/IMG_4461.webp' },
    { id: 21, style: 'japanese', image: '/portfolio/japanese/IMG_4463.webp' },
    { id: 22, style: 'japanese', image: '/portfolio/japanese/IMG_4465.webp' },
    { id: 23, style: 'japanese', image: '/portfolio/japanese/IMG_4467.webp' },
    { id: 24, style: 'japanese', image: '/portfolio/japanese/IMG_4468.webp' },
    { id: 25, style: 'japanese', image: '/portfolio/japanese/IMG_4472.webp' },
    { id: 26, style: 'japanese', image: '/portfolio/japanese/IMG_4736.webp' },
    { id: 27, style: 'japanese', image: '/portfolio/japanese/IMG_9302.png' },
    { id: 28, style: 'japanese', image: '/portfolio/japanese/IMG_9303.png' },
    { id: 29, style: 'japanese', image: '/portfolio/japanese/IMG_9304.png' },
    { id: 30, style: 'japanese', image: '/portfolio/japanese/IMG_9305.png' },
    { id: 31, style: 'japanese', image: '/portfolio/japanese/IMG_9311.png' },
    { id: 32, style: 'japanese', image: '/portfolio/japanese/IMG_9312.png' },
    { id: 33, style: 'japanese', image: '/portfolio/japanese/IMG_9314.png' },
    { id: 34, style: 'japanese', image: '/portfolio/japanese/IMG_9315.png' },
    { id: 35, style: 'japanese', image: '/portfolio/japanese/IMG_9320.png' },
    { id: 36, style: 'japanese', image: '/portfolio/japanese/IMG_9321.png' },
    { id: 37, style: 'japanese', image: '/portfolio/japanese/IMG_9322.png' },
    { id: 38, style: 'japanese', image: '/portfolio/japanese/IMG_9371.png' },
    { id: 39, style: 'japanese', image: '/portfolio/japanese/IMG_9395.jpeg' },
    { id: 40, style: 'japanese', image: '/portfolio/japanese/IMG_9397.png' },
    { id: 41, style: 'japanese', image: '/portfolio/japanese/IMG_9398.webp' },
    { id: 42, style: 'japanese', image: '/portfolio/japanese/IMG_9410.jpeg' },
    { id: 43, style: 'japanese', image: '/portfolio/japanese/IMG_9411.webp' },
    { id: 44, style: 'japanese', image: '/portfolio/japanese/IMG_9413.webp' },
    { id: 45, style: 'japanese', image: '/portfolio/japanese/IMG_9415.webp' },
    { id: 46, style: 'japanese', image: '/portfolio/japanese/IMG_9417.png' },
    { id: 47, style: 'japanese', image: '/portfolio/japanese/IMG_9419.png' },
    { id: 48, style: 'japanese', image: '/portfolio/japanese/IMG_9445.png' },
    { id: 49, style: 'japanese', image: '/portfolio/japanese/IMG_9844.jpeg' },
    { id: 50, style: 'japanese', image: '/portfolio/japanese/IMG_9852.webp' },
    { id: 51, style: 'japanese', image: '/portfolio/japanese/IMG_9855.jpeg' },
    { id: 52, style: 'japanese', image: '/portfolio/japanese/IMG_9871.png' },
    { id: 53, style: 'japanese', image: '/portfolio/japanese/copy_55E228E6-0551-46C5-AE1F-83BD632183F0.jpeg' },
    { id: 54, style: 'japanese', image: '/portfolio/japanese/copy_B1D30228-A3E9-444D-9479-E4A686F0BE23.jpeg' },
    { id: 55, style: 'blackwork', image: '/portfolio/blackwork/IMG_0445.png' },
    { id: 56, style: 'blackwork', image: '/portfolio/blackwork/IMG_0446.png' },
    { id: 57, style: 'blackwork', image: '/portfolio/blackwork/IMG_0447.png' },
    { id: 58, style: 'blackwork', image: '/portfolio/blackwork/IMG_0460.png' },
    { id: 59, style: 'blackwork', image: '/portfolio/blackwork/IMG_4428.webp' },
    { id: 60, style: 'blackwork', image: '/portfolio/blackwork/IMG_4429.webp' },
    { id: 61, style: 'blackwork', image: '/portfolio/blackwork/IMG_4430.webp' },
    { id: 62, style: 'blackwork', image: '/portfolio/blackwork/IMG_4433.webp' },
    { id: 63, style: 'blackwork', image: '/portfolio/blackwork/IMG_4435.webp' },
    { id: 64, style: 'blackwork', image: '/portfolio/blackwork/IMG_4438.webp' },
    { id: 65, style: 'blackwork', image: '/portfolio/blackwork/IMG_4440.webp' },
    { id: 66, style: 'blackwork', image: '/portfolio/blackwork/IMG_4442.webp' },
    { id: 67, style: 'blackwork', image: '/portfolio/blackwork/IMG_4443.webp' },
    { id: 68, style: 'blackwork', image: '/portfolio/blackwork/IMG_9386.webp' },
    { id: 69, style: 'blackwork', image: '/portfolio/blackwork/IMG_9388.jpeg' },
    { id: 70, style: 'blackwork', image: '/portfolio/blackwork/IMG_9399.jpeg' },
    { id: 71, style: 'blackwork', image: '/portfolio/blackwork/IMG_9400.webp' },
    { id: 72, style: 'blackwork', image: '/portfolio/blackwork/IMG_9404.png' },
    { id: 73, style: 'floral', image: '/portfolio/floral/IMG_0122.jpeg' },
    { id: 74, style: 'floral', image: '/portfolio/floral/IMG_0131.webp' },
    { id: 75, style: 'floral', image: '/portfolio/floral/IMG_0133.jpeg' },
    { id: 76, style: 'floral', image: '/portfolio/floral/IMG_0137.jpeg' },
    { id: 77, style: 'floral', image: '/portfolio/floral/IMG_0140.jpeg' },
    { id: 78, style: 'floral', image: '/portfolio/floral/IMG_0141.jpeg' },
    { id: 79, style: 'floral', image: '/portfolio/floral/IMG_0143.jpeg' },
    { id: 80, style: 'floral', image: '/portfolio/floral/IMG_1222.jpeg' },
    { id: 81, style: 'floral', image: '/portfolio/floral/IMG_1223.jpeg' },
    { id: 82, style: 'floral', image: '/portfolio/floral/IMG_1225.jpeg' },
    { id: 83, style: 'floral', image: '/portfolio/floral/IMG_9361.webp' },
    { id: 84, style: 'floral', image: '/portfolio/floral/IMG_9363.jpeg' },
    { id: 85, style: 'floral', image: '/portfolio/floral/IMG_9414.webp' },
    { id: 86, style: 'floral', image: '/portfolio/floral/IMG_9442.webp' },
    { id: 87, style: 'floral', image: '/portfolio/floral/IMG_9446.png' },
    { id: 88, style: 'floral', image: '/portfolio/floral/IMG_9447.webp' },
    { id: 89, style: 'floral', image: '/portfolio/floral/IMG_9449.jpeg' },
    { id: 90, style: 'floral', image: '/portfolio/floral/IMG_9450.jpeg' },
    { id: 91, style: 'floral', image: '/portfolio/floral/copy_96A57A24-3F29-493B-AAC3-947800F209B5.jpeg' },
    { id: 92, style: 'ornamental', image: '/portfolio/ornamental/8525FC48-6C80-4BFF-A495-97B5C094566A.jpeg' },
    { id: 93, style: 'ornamental', image: '/portfolio/ornamental/IMG_0462.png' },
    { id: 94, style: 'ornamental', image: '/portfolio/ornamental/IMG_0477.png' },
    { id: 95, style: 'ornamental', image: '/portfolio/ornamental/IMG_0479.webp' },
    { id: 96, style: 'ornamental', image: '/portfolio/ornamental/IMG_0723.png' },
    { id: 97, style: 'ornamental', image: '/portfolio/ornamental/IMG_0725.png' },
    { id: 98, style: 'ornamental', image: '/portfolio/ornamental/IMG_0726.png' },
    { id: 99, style: 'ornamental', image: '/portfolio/ornamental/IMG_0727.png' },
    { id: 100, style: 'ornamental', image: '/portfolio/ornamental/IMG_0730.png' },
    { id: 101, style: 'ornamental', image: '/portfolio/ornamental/IMG_0731.png' },
    { id: 102, style: 'ornamental', image: '/portfolio/ornamental/IMG_0733.png' },
    { id: 103, style: 'ornamental', image: '/portfolio/ornamental/IMG_0735.webp' },
    { id: 104, style: 'ornamental', image: '/portfolio/ornamental/IMG_1230.jpeg' },
    { id: 105, style: 'ornamental', image: '/portfolio/ornamental/IMG_1232.png' },
    { id: 106, style: 'ornamental', image: '/portfolio/ornamental/IMG_1775.jpeg' },
    { id: 107, style: 'ornamental', image: '/portfolio/ornamental/IMG_2580.png' },
    { id: 108, style: 'ornamental', image: '/portfolio/ornamental/IMG_2584.webp' },
    { id: 109, style: 'ornamental', image: '/portfolio/ornamental/IMG_2610.jpeg' },
    { id: 110, style: 'ornamental', image: '/portfolio/ornamental/IMG_2616.webp' },
    { id: 111, style: 'ornamental', image: '/portfolio/ornamental/IMG_2618.jpeg' },
    { id: 112, style: 'ornamental', image: '/portfolio/ornamental/IMG_9366.png' },
    { id: 113, style: 'ornamental', image: '/portfolio/ornamental/IMG_9367.jpeg' },
    { id: 114, style: 'ornamental', image: '/portfolio/ornamental/IMG_9382.jpeg' },
    { id: 115, style: 'ornamental', image: '/portfolio/ornamental/IMG_9389.png' },
    { id: 116, style: 'ornamental', image: '/portfolio/ornamental/IMG_9390.webp' },
    { id: 117, style: 'ornamental', image: '/portfolio/ornamental/IMG_9393.jpeg' },
    { id: 118, style: 'ornamental', image: '/portfolio/ornamental/IMG_9402.jpeg' },
    { id: 119, style: 'ornamental', image: '/portfolio/ornamental/IMG_9420.png' },
    { id: 120, style: 'ornamental', image: '/portfolio/ornamental/IMG_9422.png' },
    { id: 121, style: 'ornamental', image: '/portfolio/ornamental/IMG_9423.jpeg' },
    { id: 122, style: 'ornamental', image: '/portfolio/ornamental/IMG_9424.jpeg' },
    { id: 123, style: 'ornamental', image: '/portfolio/ornamental/IMG_9425.webp' },
    { id: 124, style: 'ornamental', image: '/portfolio/ornamental/IMG_9754.jpeg' },
    { id: 125, style: 'ornamental', image: '/portfolio/ornamental/IMG_9755.jpeg' },
    { id: 126, style: 'ornamental', image: '/portfolio/ornamental/IMG_9756.png' },
    { id: 127, style: 'ornamental', image: '/portfolio/ornamental/IMG_9758.webp' },
    { id: 128, style: 'ornamental', image: '/portfolio/ornamental/copy_1163F1C8-7EE2-413A-A501-C5528FB4AF96.jpeg' },
    { id: 129, style: 'ornamental', image: '/portfolio/ornamental/copy_C3A8F39E-18E5-4B1D-A265-230CFF6D7279.jpeg' },
    { id: 130, style: 'ornamental', image: '/portfolio/ornamental/copy_C8541463-D180-4668-80FF-644BD54F9894.jpeg' },
    { id: 131, style: 'ornamental', image: '/portfolio/ornamental/copy_E0336537-08E0-457E-BB7C-1FB14BE36BB3.jpeg' },
  ]

  const filteredPortfolio = activeStyle === 'all' ? portfolioItems : portfolioItems.filter(item => item.style === activeStyle)
  const itemsPerView = 4
  const maxSliderIndex = Math.max(0, filteredPortfolio.length - itemsPerView)

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % filteredPortfolio.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length)

  const slideNext = () => setSliderIndex((prev) => Math.min(prev + itemsPerView, maxSliderIndex))
  const slidePrev = () => setSliderIndex((prev) => Math.max(prev - itemsPerView, 0))

  const reviews = [
    { name: 'Sarah M.', text: 'Daniel understood my vision perfectly. The way my sleeve flows with my arm is incredible.', rating: 5 },
    { name: 'Marcus T.', text: 'Best custom work in Vancouver. Worth every penny. The private studio experience was amazing.', rating: 5 },
    { name: 'Jessica L.', text: 'From consultation to final session, everything was seamless. My back piece is a masterpiece.', rating: 5 },
  ]

  const faqs = [
    { q: 'Am I Eligible for a Tattoo?', a: 'You must be at least 18 years old and present a valid ID. This is non-negotiable.' },
    { q: 'What Are the Costs Involved?', a: 'Half-day session (4 hours): $1,000. Full-day session (8 hours): $2,000. Small tattoos priced individually.' },
    { q: "What's Required to Secure an Appointment?", a: 'A $300 deposit is required to book. This guarantees priority dates and goes toward your final session.' },
    { q: 'What if I Need to Cancel or Reschedule?', a: 'Cancellations with less than 72 hours notice = deposit lost. 15+ min late with no message = no-show.' },
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
      
      {lightboxOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeLightbox}>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer' }}>&#8592;</button>
          <img src={filteredPortfolio[currentImage]?.image} alt="" style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer' }}>&#8594;</button>
          <button onClick={closeLightbox} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer' }}>&#10005;</button>
          <div style={{ position: 'absolute', bottom: '20px', color: '#6b756e', fontSize: '14px' }}>{currentImage + 1} / {filteredPortfolio.length}</div>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? '12px 24px' : '20px 24px', background: scrolled ? 'rgba(26, 31, 28, 0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'all 0.3s ease' }}>
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

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', background: 'linear-gradient(180deg, rgba(26, 31, 28, 0.85) 0%, rgba(35, 42, 38, 0.95) 100%), url(/IMG_4330.WEBP) center/cover no-repeat' }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', marginBottom: '32px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: colors.textSecondary, textTransform: 'uppercase' }}>Vancouver, Washington</span>
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 300, lineHeight: 1, margin: '0 0 8px 0', letterSpacing: '-2px' }}>Art That</h1>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 300, lineHeight: 1, margin: 0, fontStyle: 'italic', letterSpacing: '-2px', color: colors.textSecondary }}>Becomes You</h1>
          <p style={{ maxWidth: '500px', margin: '40px auto', fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary }}>Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy tailor-made, never templated.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '48px' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: colors.bgDark, padding: '18px 36px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '4px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>Book Consultation</a>
          </div>
        </div>
      </section>

      <a href="https://instagram.com/dani_lbrl" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px', background: colors.bgDark, borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}>
        <span style={{ color: colors.textSecondary, fontSize: '13px', letterSpacing: '1px' }}>@dani_lbrl</span>
      </a>

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

      <section id="about" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', borderRadius: '16px', background: 'linear-gradient(145deg, rgba(42, 50, 45, 0.85) 0%, rgba(50, 59, 53, 0.9) 100%), url(/about-bg.webp) center/cover no-repeat', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'linear-gradient(135deg, #7dd4c4 0%, #5a8a8a 100%)', padding: '8px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, color: '#fff' }}>AWARD WINNER</div>
            <TribalLogo size={140} opacity={0.9} />
            <div style={{ fontSize: '24px', fontWeight: 500, marginTop: '24px' }}>Daniel Liberal</div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: colors.accentCyan, textTransform: 'uppercase', marginTop: '8px' }}>Lead Artist and Owner</div>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px' }}>From Puerto Rico 2013 est. to Vancouver, WA 2016-Present</div>
          </div>
          <div>
            <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '20px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: colors.textMuted, textTransform: 'uppercase' }}>The Philosophy</span>
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 28px 0', lineHeight: 1.2 }}>Body Harmony</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(125, 212, 196, 0.08)', border: '1px solid rgba(125, 212, 196, 0.15)', borderRadius: '6px', width: 'fit-content' }}>
                <span>🏆</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.accentCyan }}>3rd Place - Asian Category</div>
                  <div style={{ fontSize: '9px', color: colors.textMuted }}>Portland Tattoo Expo 2024</div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(232, 168, 124, 0.08)', border: '1px solid rgba(232, 168, 124, 0.15)', borderRadius: '6px', width: 'fit-content' }}>
                <span>🏆</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.accentOrange }}>3rd Place - Hands, Neck, Face</div>
                  <div style={{ fontSize: '9px', color: colors.textMuted }}>United Ink No Limits NYC 2016</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary, marginBottom: '20px' }}>Tattooing, for me, starts with understanding how the body carries a design. Every custom piece is designed to flow with your anatomy, considering how the skin moves, stretches, and ages over time.</p>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: colors.textSecondary }}>With 12+ years mastering this craft and awards from New York to Portland, I bring your vision to life through one-on-one collaboration. No flash. No templates. Just meaningful art.</p>
          </div>
        </div>
      </section>

      <section id="portfolio" style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>Portfolio</h2>
          </div>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', background: colors.bgCard, borderRadius: '6px', width: 'fit-content', margin: '0 auto 50px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {styleFilters.map((style) => (
              <button key={style.value} onClick={() => setActiveStyle(style.value)} style={{ background: activeStyle === style.value ? 'rgba(255,255,255,0.06)' : 'transparent', border: 'none', color: activeStyle === style.value ? colors.textPrimary : colors.textMuted, padding: '10px 18px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>{style.label}</button>
            ))}
          </div>
          
          <div style={{ position: 'relative', padding: '0 70px' }}>
            <button onClick={slidePrev} disabled={sliderIndex === 0} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', background: sliderIndex === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)', border: 'none', color: sliderIndex === 0 ? colors.textMuted : '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: sliderIndex === 0 ? 'default' : 'pointer', transition: 'all 0.3s', zIndex: 10 }}>&#8592;</button>
            
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', transition: 'transform 0.5s ease', transform: 'translateX(-' + (sliderIndex * (100 / itemsPerView + 1.2)) + '%)' }}>
                {filteredPortfolio.map((item, index) => (
                  <div key={item.id} onClick={() => openLightbox(index)} style={{ flex: '0 0 calc(25% - 12px)', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={slideNext} disabled={sliderIndex >= maxSliderIndex} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: sliderIndex >= maxSliderIndex ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)', border: 'none', color: sliderIndex >= maxSliderIndex ? colors.textMuted : '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: sliderIndex >= maxSliderIndex ? 'default' : 'pointer', transition: 'all 0.3s', zIndex: 10 }}>&#8594;</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
            {Array.from({ length: Math.ceil(filteredPortfolio.length / itemsPerView) }).map((_, i) => (
              <button key={i} onClick={() => setSliderIndex(i * itemsPerView)} style={{ width: sliderIndex >= i * itemsPerView && sliderIndex < (i + 1) * itemsPerView ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none', background: sliderIndex >= i * itemsPerView && sliderIndex < (i + 1) * itemsPerView ? colors.accentCyan : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px', color: colors.textMuted, fontSize: '12px' }}>
            {sliderIndex + 1}-{Math.min(sliderIndex + itemsPerView, filteredPortfolio.length)} of {filteredPortfolio.length}
          </div>
        </div>
      </section>

      <section id="process" style={{ padding: '100px 24px', background: colors.bgDark }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>The Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {processSteps.map((step, i) => (
              <div key={i} style={{ padding: '32px 24px', background: 'linear-gradient(145deg, #2a322d 0%, #232a26 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '32px', fontWeight: 200, color: colors.textMuted, marginBottom: '16px' }}>{step.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '0 0 12px 0' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: colors.textMuted, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>Reviews</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {reviews.map((review, i) => (
              <div key={i} style={{ padding: '32px', background: 'linear-gradient(145deg, #2a322d 0%, #323b35 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ marginBottom: '16px', color: colors.accentOrange, fontSize: '14px' }}>★★★★★</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: colors.textSecondary, fontStyle: 'italic', margin: '0 0 20px 0' }}>{review.text}</p>
                <div style={{ fontSize: '12px', fontWeight: 500 }}>- {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" style={{ padding: '100px 24px', background: colors.bgDark }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 300, margin: 0 }}>FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '24px', background: 'linear-gradient(145deg, #2a322d 0%, #232a26 100%)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 12px 0' }}>{faq.q}</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: colors.textMuted, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '100px 24px', background: colors.bgPrimary }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 8px 0' }}>Book Your</h2>
          <h2 style={{ fontSize: '42px', fontWeight: 300, margin: '0 0 28px 0', color: colors.accentCyan }}>Consultation</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: colors.textMuted, marginBottom: '40px' }}>Fill out the booking form and I will get back to you within 1-3 business days.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ background: colors.accentTeal, color: '#fff', padding: '18px 48px', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '8px', textDecoration: 'none' }}>Book Consultation</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: colors.textMuted, fontSize: '14px' }}>
            <span>9013 NE Hwy 99, Vancouver, WA</span>
            <span>(360) 901-0636</span>
            <span>By Appointment Only</span>
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px 24px 30px', borderTop: '1px solid rgba(255,255,255,0.04)', background: colors.bgDark }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <TribalLogo size={36} opacity={0.9} />
            <div>
              <span style={{ fontSize: '18px', letterSpacing: '6px', fontWeight: 600 }}>LBRL</span>
              <div style={{ fontSize: '9px', color: colors.textMuted, marginTop: '2px' }}>Multi-Award Winning Custom Tattoos</div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: colors.textMuted }}>2026 Daniel Liberal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
