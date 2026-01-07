'use client'

import React, { useState, useEffect } from 'react'

const BOOKING_URL = 'https://www.lbrltattoos.com?popup=booking'
const RELEASE_URL = 'https://www.lbrltattoos.com/release-form'

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
    // NEO JAPANESE (54)
    { id: 1, style: 'japanese', image: '/portfolio/japanese/IMG_0461.png' },
    { id: 2, style: 'japanese', image: '/portfolio/japanese/IMG_0465.png' },
    { id: 3, style: 'japanese', image: '/portfolio/japanese/IMG_0480.webp' },
    { id: 4, style: 'japanese', image: '/portfolio/japanese/IMG_0481.webp' },
    { id: 5, style: 'japanese', image: '/portfolio/japanese/IMG_0482.webp' },
    { id: 6, style: 'japanese', image: '/portfolio/japanese/IMG_0483.webp' },
    { id: 7, style: 'japanese', image: '/portfolio/japanese/IMG_0484.webp' },
    { id: 8, style: 'japanese', image: '/portfolio/japanese/IMG_0486.webp' },
    { id: 9, style: 'japanese', image: '/portfolio/japanese/IMG_0488.webp' },
    { id: 10, style: 'japanese', image: '/portfolio/japanese/IMG_0489.webp' },
    { id: 11, style: 'japanese', image: '/portfolio/japanese/IMG_0490.webp' },
    { id: 12, style: 'japanese', image: '/portfolio/japanese/IMG_0491.webp' },
    { id: 13, style: 'japanese', image: '/portfolio/japanese/IMG_0492.webp' },
    { id: 14, style: 'japanese', image: '/portfolio/japanese/IMG_0493.webp' },
    { id: 15, style: 'japanese', image: '/portfolio/japanese/IMG_0494.webp' },
    { id: 16, style: 'japanese', image: '/portfolio/japanese/IMG_0495.webp' },
    { id: 17, style: 'japanese', image: '/portfolio/japanese/IMG_0496.webp' },
    { id: 18, style: 'japanese', image: '/portfolio/japanese/IMG_0497.webp' },
    { id: 19, style: 'japanese', image: '/portfolio/japanese/IMG_0498.webp' },
    { id: 20, style: 'japanese', image: '/portfolio/japanese/IMG_0499.webp' },
    { id: 21, style: 'japanese', image: '/portfolio/japanese/IMG_0500.webp' },
    { id: 22, style: 'japanese', image: '/portfolio/japanese/IMG_0501.webp' },
    { id: 23, style: 'japanese', image: '/portfolio/japanese/IMG_0502.webp' },
    { id: 24, style: 'japanese', image: '/portfolio/japanese/IMG_0503.webp' },
    { id: 25, style: 'japanese', image: '/portfolio/japanese/IMG_0504.webp' },
    { id: 26, style: 'japanese', image: '/portfolio/japanese/IMG_0505.webp' },
    { id: 27, style: 'japanese', image: '/portfolio/japanese/IMG_0506.webp' },
    { id: 28, style: 'japanese', image: '/portfolio/japanese/IMG_0507.webp' },
    { id: 29, style: 'japanese', image: '/portfolio/japanese/IMG_0508.webp' },
    { id: 30, style: 'japanese', image: '/portfolio/japanese/IMG_0509.webp' },
    { id: 31, style: 'japanese', image: '/portfolio/japanese/IMG_0510.webp' },
    { id: 32, style: 'japanese', image: '/portfolio/japanese/IMG_0511.webp' },
    { id: 33, style: 'japanese', image: '/portfolio/japanese/IMG_0512.webp' },
    { id: 34, style: 'japanese', image: '/portfolio/japanese/IMG_0513.webp' },
    { id: 35, style: 'japanese', image: '/portfolio/japanese/IMG_0514.webp' },
    { id: 36, style: 'japanese', image: '/portfolio/japanese/IMG_0515.webp' },
    { id: 37, style: 'japanese', image: '/portfolio/japanese/IMG_0516.webp' },
    { id: 38, style: 'japanese', image: '/portfolio/japanese/IMG_0517.webp' },
    { id: 39, style: 'japanese', image: '/portfolio/japanese/IMG_0518.webp' },
    { id: 40, style: 'japanese', image: '/portfolio/japanese/IMG_0519.webp' },
    { id: 41, style: 'japanese', image: '/portfolio/japanese/IMG_0520.webp' },
    { id: 42, style: 'japanese', image: '/portfolio/japanese/IMG_0521.webp' },
    { id: 43, style: 'japanese', image: '/portfolio/japanese/IMG_0522.webp' },
    { id: 44, style: 'japanese', image: '/portfolio/japanese/IMG_0523.webp' },
    { id: 45, style: 'japanese', image: '/portfolio/japanese/IMG_0524.webp' },
    { id: 46, style: 'japanese', image: '/portfolio/japanese/IMG_0525.webp' },
    { id: 47, style: 'japanese', image: '/portfolio/japanese/IMG_0526.webp' },
    { id: 48, style: 'japanese', image: '/portfolio/japanese/IMG_0527.webp' },
    { id: 49, style: 'japanese', image: '/portfolio/japanese/IMG_0528.webp' },
    { id: 50, style: 'japanese', image: '/portfolio/japanese/IMG_0529.webp' },
    { id: 51, style: 'japanese', image: '/portfolio/japanese/IMG_0530.webp' },
    { id: 52, style: 'japanese', image: '/portfolio/japanese/IMG_0531.webp' },
    { id: 53, style: 'japanese', image: '/portfolio/japanese/IMG_0532.webp' },
    { id: 54, style: 'japanese', image: '/portfolio/japanese/IMG_0533.webp' },
    // BLACKWORK (18)
    { id: 55, style: 'blackwork', image: '/portfolio/blackwork/IMG_9375.jpeg' },
    { id: 56, style: 'blackwork', image: '/portfolio/blackwork/IMG_9376.jpeg' },
    { id: 57, style: 'blackwork', image: '/portfolio/blackwork/IMG_9377.jpeg' },
    { id: 58, style: 'blackwork', image: '/portfolio/blackwork/IMG_9378.jpeg' },
    { id: 59, style: 'blackwork', image: '/portfolio/blackwork/IMG_9379.jpeg' },
    { id: 60, style: 'blackwork', image: '/portfolio/blackwork/IMG_9380.jpeg' },
    { id: 61, style: 'blackwork', image: '/portfolio/blackwork/IMG_9381.jpeg' },
    { id: 62, style: 'blackwork', image: '/portfolio/blackwork/IMG_9382.jpeg' },
    { id: 63, style: 'blackwork', image: '/portfolio/blackwork/IMG_9383.jpeg' },
    { id: 64, style: 'blackwork', image: '/portfolio/blackwork/IMG_9384.jpeg' },
    { id: 65, style: 'blackwork', image: '/portfolio/blackwork/IMG_9385.jpeg' },
    { id: 66, style: 'blackwork', image: '/portfolio/blackwork/IMG_9386.jpeg' },
    { id: 67, style: 'blackwork', image: '/portfolio/blackwork/IMG_9387.jpeg' },
    { id: 68, style: 'blackwork', image: '/portfolio/blackwork/IMG_9388.jpeg' },
    { id: 69, style: 'blackwork', image: '/portfolio/blackwork/IMG_9389.jpeg' },
    { id: 70, style: 'blackwork', image: '/portfolio/blackwork/IMG_9390.jpeg' },
    { id: 71, style: 'blackwork', image: '/portfolio/blackwork/IMG_9391.jpeg' },
    { id: 72, style: 'blackwork', image: '/portfolio/blackwork/IMG_9392.jpeg' },
    { id: 73, style: 'blackwork', image: '/portfolio/blackwork/IMG_9402.jpeg' },
    // FLORAL (19)
    { id: 74, style: 'floral', image: '/portfolio/floral/IMG_9393.jpeg' },
    { id: 75, style: 'floral', image: '/portfolio/floral/IMG_9394.jpeg' },
    { id: 76, style: 'floral', image: '/portfolio/floral/IMG_9395.jpeg' },
    { id: 77, style: 'floral', image: '/portfolio/floral/IMG_9396.jpeg' },
    { id: 78, style: 'floral', image: '/portfolio/floral/IMG_9397.jpeg' },
    { id: 79, style: 'floral', image: '/portfolio/floral/IMG_9398.jpeg' },
    { id: 80, style: 'floral', image: '/portfolio/floral/IMG_9399.jpeg' },
    { id: 81, style: 'floral', image: '/portfolio/floral/IMG_9400.jpeg' },
    { id: 82, style: 'floral', image: '/portfolio/floral/IMG_9401.jpeg' },
    { id: 83, style: 'floral', image: '/portfolio/floral/IMG_9403.jpeg' },
    { id: 84, style: 'floral', image: '/portfolio/floral/IMG_9404.jpeg' },
    { id: 85, style: 'floral', image: '/portfolio/floral/IMG_9405.jpeg' },
    { id: 86, style: 'floral', image: '/portfolio/floral/IMG_9406.jpeg' },
    { id: 87, style: 'floral', image: '/portfolio/floral/IMG_9407.jpeg' },
    { id: 88, style: 'floral', image: '/portfolio/floral/IMG_9408.jpeg' },
    { id: 89, style: 'floral', image: '/portfolio/floral/IMG_9409.jpeg' },
    { id: 90, style: 'floral', image: '/portfolio/floral/IMG_9410.jpeg' },
    { id: 91, style: 'floral', image: '/portfolio/floral/IMG_9411.jpeg' },
    { id: 92, style: 'floral', image: '/portfolio/floral/IMG_9412.jpeg' },
    // ORNAMENTAL (40)
    { id: 93, style: 'ornamental', image: '/portfolio/ornamental/IMG_9413.jpeg' },
    { id: 94, style: 'ornamental', image: '/portfolio/ornamental/IMG_9414.jpeg' },
    { id: 95, style: 'ornamental', image: '/portfolio/ornamental/IMG_9415.jpeg' },
    { id: 96, style: 'ornamental', image: '/portfolio/ornamental/IMG_9416.jpeg' },
    { id: 97, style: 'ornamental', image: '/portfolio/ornamental/IMG_9417.jpeg' },
    { id: 98, style: 'ornamental', image: '/portfolio/ornamental/IMG_9418.jpeg' },
    { id: 99, style: 'ornamental', image: '/portfolio/ornamental/IMG_9419.jpeg' },
    { id: 100, style: 'ornamental', image: '/portfolio/ornamental/IMG_9420.jpeg' },
    { id: 101, style: 'ornamental', image: '/portfolio/ornamental/IMG_9421.jpeg' },
    { id: 102, style: 'ornamental', image: '/portfolio/ornamental/IMG_9422.jpeg' },
    { id: 103, style: 'ornamental', image: '/portfolio/ornamental/IMG_9423.jpeg' },
    { id: 104, style: 'ornamental', image: '/portfolio/ornamental/IMG_9424.jpeg' },
    { id: 105, style: 'ornamental', image: '/portfolio/ornamental/IMG_9425.jpeg' },
    { id: 106, style: 'ornamental', image: '/portfolio/ornamental/IMG_9426.jpeg' },
    { id: 107, style: 'ornamental', image: '/portfolio/ornamental/IMG_9427.jpeg' },
    { id: 108, style: 'ornamental', image: '/portfolio/ornamental/IMG_9428.jpeg' },
    { id: 109, style: 'ornamental', image: '/portfolio/ornamental/IMG_9429.jpeg' },
    { id: 110, style: 'ornamental', image: '/portfolio/ornamental/IMG_9430.jpeg' },
    { id: 111, style: 'ornamental', image: '/portfolio/ornamental/IMG_9431.jpeg' },
    { id: 112, style: 'ornamental', image: '/portfolio/ornamental/IMG_9432.jpeg' },
    { id: 113, style: 'ornamental', image: '/portfolio/ornamental/IMG_9433.jpeg' },
    { id: 114, style: 'ornamental', image: '/portfolio/ornamental/IMG_9434.jpeg' },
    { id: 115, style: 'ornamental', image: '/portfolio/ornamental/IMG_9435.jpeg' },
    { id: 116, style: 'ornamental', image: '/portfolio/ornamental/IMG_9436.jpeg' },
    { id: 117, style: 'ornamental', image: '/portfolio/ornamental/IMG_9437.jpeg' },
    { id: 118, style: 'ornamental', image: '/portfolio/ornamental/IMG_9438.jpeg' },
    { id: 119, style: 'ornamental', image: '/portfolio/ornamental/IMG_9439.jpeg' },
    { id: 120, style: 'ornamental', image: '/portfolio/ornamental/IMG_9440.jpeg' },
    { id: 121, style: 'ornamental', image: '/portfolio/ornamental/IMG_9441.jpeg' },
    { id: 122, style: 'ornamental', image: '/portfolio/ornamental/IMG_9442.jpeg' },
    { id: 123, style: 'ornamental', image: '/portfolio/ornamental/IMG_9443.jpeg' },
    { id: 124, style: 'ornamental', image: '/portfolio/ornamental/IMG_9444.jpeg' },
    { id: 125, style: 'ornamental', image: '/portfolio/ornamental/IMG_9445.jpeg' },
    { id: 126, style: 'ornamental', image: '/portfolio/ornamental/IMG_9446.jpeg' },
    { id: 127, style: 'ornamental', image: '/portfolio/ornamental/IMG_9447.jpeg' },
    { id: 128, style: 'ornamental', image: '/portfolio/ornamental/IMG_9448.jpeg' },
    { id: 129, style: 'ornamental', image: '/portfolio/ornamental/IMG_9449.jpeg' },
    { id: 130, style: 'ornamental', image: '/portfolio/ornamental/IMG_9450.jpeg' },
    { id: 131, style: 'ornamental', image: '/portfolio/ornamental/IMG_9451.jpeg' },
    { id: 132, style: 'ornamental', image: '/portfolio/ornamental/IMG_9452.jpeg' },
  ]

  const filteredPortfolio = activeStyle === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.style === activeStyle)

  const visibleCount = 4
  const maxSliderIndex = Math.max(0, filteredPortfolio.length - visibleCount)

  const reviews = [
    { name: 'Sarah M.', text: 'Daniel understood my vision perfectly. The way my sleeve flows with my arm is incredible.', rating: 5 },
    { name: 'Marcus T.', text: 'Best custom work in Vancouver. Worth every penny. The private studio experience was amazing.', rating: 5 },
    { name: 'Jessica L.', text: 'From consultation to final session, everything was seamless. My back piece is a masterpiece.', rating: 5 },
  ]

  const processSteps = [
    { number: '01', title: 'Consultation', desc: 'We sit down and talk through your idea, placement, and vision. This is where the concept starts taking shape.' },
    { number: '02', title: 'Design', desc: 'I develop your custom design and we meet for a revision session to finalize everything before your tattoo appointment.' },
    { number: '03', title: 'Session', desc: 'Your session happens in my private studio. Bring a blanket, snacks, whatever helps you relax. The calmer you are, the smoother it goes.' },
    { number: '04', title: 'Aftercare', desc: 'You leave with clear aftercare instructions and I walk you through what to expect as your piece heals.' },
  ]

  const faqs = [
    { q: 'How do I book a consultation?', a: 'Fill out the booking form or DM me on Instagram @dani_lbrl. Consultations are free and can be done in person or virtually.' },
    { q: 'What is the deposit?', a: 'Deposits range from $50-$300 depending on project size. This secures your appointment and goes toward your final tattoo cost.' },
    { q: 'Do you do walk-ins?', a: 'No, LBRL is appointment-only. This ensures every client gets my full attention and a completely custom experience.' },
    { q: 'How should I prepare for my session?', a: 'Get a good night\'s sleep, eat a solid meal, stay hydrated, and wear comfortable clothing that allows access to the tattoo area.' },
  ]

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bgDark,
      color: colors.textPrimary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 24px' : '20px 24px',
        background: scrolled ? `${colors.bgDark}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.borderSubtle}` : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '20px', fontWeight: '300', letterSpacing: '4px', color: colors.textPrimary }}>LBRL</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Portfolio', 'About', 'Process', 'Pricing', 'FAQs', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: colors.textSecondary,
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseOver={(e) => e.target.style.color = colors.accentCyan}
              onMouseOut={(e) => e.target.style.color = colors.textSecondary}
            >
              {item}
            </a>
          ))}
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${colors.accentCyan}`,
              borderRadius: '6px',
              color: colors.accentCyan,
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.background = colors.accentCyan
              e.target.style.color = colors.bgDark
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = colors.accentCyan
            }}
          >
            Release Form
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              background: colors.textPrimary,
              borderRadius: '6px',
              color: colors.bgDark,
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 20px 80px',
        background: `linear-gradient(180deg, rgba(61,74,66,0.9) 0%, rgba(26,31,28,0.95) 100%), url('/IMG_4330.WEBP')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.06,
          pointerEvents: 'none',
        }}>
          <img src="/Tribal Logo.jpg" alt="" style={{ width: '500px', height: '500px', objectFit: 'contain' }} />
        </div>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: colors.bgCard,
          borderRadius: '20px',
          marginBottom: '32px',
        }}>
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>📍 Vancouver, WA</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>•</span>
          <span style={{ fontSize: '12px', color: colors.accentCyan }}>3rd Place 2024 Portland Tattoo Expo</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 72px)',
          fontWeight: '300',
          letterSpacing: '-1px',
          marginBottom: '24px',
          lineHeight: '1.1',
        }}>
          Art That<br />
          <span style={{ color: colors.accentCyan }}>Becomes You</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: colors.textSecondary,
          maxWidth: '600px',
          lineHeight: '1.7',
          marginBottom: '40px',
        }}>
          Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '16px 32px',
              background: colors.accentCyan,
              color: colors.bgDark,
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Start Your Journey
          </a>
          <a
            href="#portfolio"
            style={{
              padding: '16px 32px',
              background: 'transparent',
              border: `1px solid ${colors.borderDefault}`,
              color: colors.textPrimary,
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            View Portfolio
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        padding: '40px 20px',
        background: colors.bgPrimary,
        borderTop: `1px solid ${colors.borderSubtle}`,
        borderBottom: `1px solid ${colors.borderSubtle}`,
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          textAlign: 'center',
        }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '32px', fontWeight: '300', color: colors.accentCyan, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{
                fontSize: '12px',
                fontWeight: '500',
                color: colors.accentCyan,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Body Harmony</p>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: '300',
                marginBottom: '24px',
                lineHeight: '1.3',
              }}>
                Every Design Flows<br />With Your Anatomy
              </h2>
              <p style={{
                fontSize: '16px',
                color: colors.textSecondary,
                lineHeight: '1.8',
                marginBottom: '24px',
              }}>
                I don't just place art on skin — I create pieces that move with your body, considering every angle and contour. This is what sets custom work apart from flash. Your tattoo should feel like it was always meant to be there.
              </p>
              <p style={{
                fontSize: '14px',
                color: colors.textMuted,
                fontStyle: 'italic',
              }}>
                From Puerto Rico 2013 est. to Vancouver, WA 2016-Present
              </p>
            </div>
            <div style={{
              background: `linear-gradient(180deg, rgba(42,50,45,0.95) 0%, rgba(42,50,45,0.98) 100%), url('/about-bg.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              padding: '32px',
              border: `1px solid ${colors.borderDefault}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <img src="/Dani1.png" alt="Daniel Liberal" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Daniel Liberal</h3>
                  <p style={{ fontSize: '13px', color: colors.textMuted }}>Lead Artist & Owner</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${colors.borderSubtle}` }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Experience</span>
                  <span style={{ fontSize: '13px', color: colors.textPrimary }}>12+ Years</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${colors.borderSubtle}` }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Specialties</span>
                  <span style={{ fontSize: '13px', color: colors.textPrimary }}>Neo Japanese, Blackwork, Ornamental, Floral</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Recognition</span>
                  <span style={{ fontSize: '13px', color: colors.accentCyan }}>3rd Place PDX Expo 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              color: colors.accentCyan,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Portfolio</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '300',
              marginBottom: '32px',
            }}>Custom Tattoo Work</h2>
            
            {/* Style Filters */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {styleFilters.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setActiveStyle(style.value)}
                  style={{
                    padding: '10px 20px',
                    background: activeStyle === style.value ? colors.accentCyan : colors.bgCard,
                    color: activeStyle === style.value ? colors.bgDark : colors.textSecondary,
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Slider */}
          <div style={{ position: 'relative' }}>
            {/* Left Arrow */}
            <button
              onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))}
              disabled={sliderIndex === 0}
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.bgCard,
                border: `1px solid ${colors.borderDefault}`,
                color: sliderIndex === 0 ? colors.textMuted : colors.textPrimary,
                cursor: sliderIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                zIndex: 10,
                transition: 'all 0.3s ease',
              }}
            >
              ←
            </button>

            {/* Slider Container */}
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  transform: `translateX(-${sliderIndex * (280 + 16)}px)`,
                  transition: 'transform 0.4s ease',
                }}
              >
                {filteredPortfolio.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    style={{
                      minWidth: '280px',
                      height: '350px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`Portfolio ${item.id}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => setSliderIndex(Math.min(maxSliderIndex, sliderIndex + 1))}
              disabled={sliderIndex >= maxSliderIndex}
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.bgCard,
                border: `1px solid ${colors.borderDefault}`,
                color: sliderIndex >= maxSliderIndex ? colors.textMuted : colors.textPrimary,
                cursor: sliderIndex >= maxSliderIndex ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                zIndex: 10,
                transition: 'all 0.3s ease',
              }}
            >
              →
            </button>
          </div>

          {/* Image Count */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <span style={{ fontSize: '13px', color: colors.textMuted }}>
              {sliderIndex + 1}-{Math.min(sliderIndex + visibleCount, filteredPortfolio.length)} of {filteredPortfolio.length} pieces
            </span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              color: colors.accentCyan,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>The Process</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '300',
            }}>From Vision to Reality</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {processSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgCard,
                  borderRadius: '16px',
                  padding: '32px 24px',
                  border: `1px solid ${colors.borderDefault}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  fontSize: '32px',
                  fontWeight: '200',
                  color: colors.accentCyan,
                  marginBottom: '16px',
                }}>{step.number}</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '12px',
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '13px',
                  color: colors.textSecondary,
                  lineHeight: '1.6',
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              color: colors.accentCyan,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Pricing & Booking</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '300',
              color: colors.textPrimary,
              marginBottom: '20px',
            }}>Investment in Your Art</h2>
            <p style={{
              fontSize: '16px',
              color: colors.textSecondary,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}>
              Every project is different. Pricing depends on size, detail, and time. Here's a general breakdown.
            </p>
          </div>

          {/* Pricing Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            
            {/* Large Scale */}
            <div style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '32px',
              border: `1px solid ${colors.borderDefault}`,
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: colors.accentCyan,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Large-Scale Work</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '300',
                color: colors.textPrimary,
                marginBottom: '8px',
              }}>$260<span style={{ fontSize: '16px', color: colors.textMuted }}>/hour</span></div>
              <div style={{
                fontSize: '14px',
                color: colors.accentCyan,
                marginBottom: '20px',
              }}>$300 deposit to book</div>
              <p style={{
                fontSize: '14px',
                color: colors.textSecondary,
                lineHeight: '1.7',
              }}>
                Half sleeves, full sleeves, back pieces, leg pieces. Your deposit goes toward the final session and includes a revision appointment where I present up to three design directions. Large projects get priority scheduling.
              </p>
            </div>

            {/* Medium */}
            <div style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '32px',
              border: `1px solid ${colors.borderDefault}`,
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: colors.accentCyan,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Medium Work</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '300',
                color: colors.textPrimary,
                marginBottom: '8px',
              }}>$500–$750</div>
              <div style={{
                fontSize: '14px',
                color: colors.accentCyan,
                marginBottom: '20px',
              }}>$250 deposit to book</div>
              <p style={{
                fontSize: '14px',
                color: colors.textSecondary,
                lineHeight: '1.7',
              }}>
                Flat rate depending on detail. Design is prepared and reviewed the day of your session.
              </p>
            </div>

            {/* Small */}
            <div style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '32px',
              border: `1px solid ${colors.borderDefault}`,
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: colors.accentCyan,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Small Work</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '300',
                color: colors.textPrimary,
                marginBottom: '8px',
              }}>$150–$350</div>
              <div style={{
                fontSize: '14px',
                color: colors.accentCyan,
                marginBottom: '20px',
              }}>$50–$100 deposit</div>
              <p style={{
                fontSize: '14px',
                color: colors.textSecondary,
                lineHeight: '1.7',
              }}>
                Names, symbols, simple designs. $150 minimum. Design reviewed day of session.
              </p>
            </div>

          </div>

          {/* Deposits Info */}
          <div style={{
            background: colors.bgElevated,
            borderRadius: '12px',
            padding: '24px 32px',
            marginBottom: '30px',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: '12px',
            }}>Deposits & Cancellations</h3>
            <p style={{
              fontSize: '14px',
              color: colors.textSecondary,
              lineHeight: '1.7',
              margin: 0,
            }}>
              All deposits are non-refundable. Cancellations or reschedules with less than 72 hours notice forfeit the deposit. Arrivals more than 30 minutes late without notice count as a no-show.
            </p>
          </div>

          {/* Not Sure CTA */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '16px',
              color: colors.textSecondary,
              marginBottom: '20px',
            }}>
              Not sure where your project fits? I'll help you figure that out during the consultation.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: colors.accentCyan,
                color: colors.bgDark,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              Book Consultation
            </a>
          </div>

        </div>
      </section>

      {/* Reviews Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              color: colors.accentCyan,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Reviews</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '300',
            }}>What Clients Say</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgCard,
                  borderRadius: '16px',
                  padding: '32px',
                  border: `1px solid ${colors.borderDefault}`,
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} style={{ color: colors.accentOrange }}>★</span>
                  ))}
                </div>
                <p style={{
                  fontSize: '14px',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  marginBottom: '20px',
                }}>"{review.text}"</p>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: colors.textPrimary,
                }}>— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '60px', alignItems: 'start' }}>
            <div>
              <div style={{ marginBottom: '40px' }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: colors.accentCyan,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>FAQs</p>
                <h2 style={{
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: '300',
                }}>Common Questions</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: colors.bgCard,
                      borderRadius: '12px',
                      padding: '24px',
                      border: `1px solid ${colors.borderDefault}`,
                    }}
                  >
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      marginBottom: '12px',
                      color: colors.textPrimary,
                    }}>{faq.q}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: colors.textSecondary,
                      lineHeight: '1.6',
                      margin: 0,
                    }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              position: 'sticky',
              top: '100px',
            }}>
              <img 
                src="/Dani2.png" 
                alt="Daniel Liberal tattooing" 
                style={{ 
                  width: '100%', 
                  borderRadius: '16px',
                  objectFit: 'cover',
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '500',
            color: colors.accentCyan,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Contact</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '300',
            marginBottom: '24px',
          }}>Ready to Start?</h2>
          <p style={{
            fontSize: '16px',
            color: colors.textSecondary,
            lineHeight: '1.7',
            marginBottom: '32px',
          }}>
            Fill out the booking form to schedule your consultation. I'll review your idea and get back to you within 1-3 business days.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '16px 32px',
                background: colors.accentCyan,
                color: colors.bgDark,
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Book Consultation
            </a>
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: `1px solid ${colors.accentCyan}`,
                color: colors.accentCyan,
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Release Form
            </a>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
          }}>
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>
              📍 9013 NE Hwy 99, Vancouver, WA 98665
            </p>
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>
              ✉️ lbrltattoos@gmail.com
            </p>
            
            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
              <a
                href="https://instagram.com/dani_lbrl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span style={{ fontSize: '14px' }}>@dani_lbrl</span>
              </a>
              
              <a
                href="https://facebook.com/lbrltattoos"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span style={{ fontSize: '14px' }}>Facebook</span>
              </a>
              
              <a
                href="https://share.google/vhS3WwTU20FQj2La2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span style={{ fontSize: '14px' }}>Google</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        background: colors.bgPrimary,
        borderTop: `1px solid ${colors.borderSubtle}`,
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '3px' }}>LBRL</span>
        </div>
        <p style={{ fontSize: '12px', color: colors.textMuted }}>
          © 2026 Daniel Liberal. All rights reserved.
        </p>
        <p style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px' }}>
          Appointment Only • Vancouver, WA
        </p>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImage((prev) => (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length)
            }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              padding: '16px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            ←
          </button>

          <img
            src={filteredPortfolio[currentImage]?.image}
            alt="Portfolio"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImage((prev) => (prev + 1) % filteredPortfolio.length)
            }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              padding: '16px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            →
          </button>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            color: 'white',
            fontSize: '14px',
          }}>
            {currentImage + 1} / {filteredPortfolio.length}
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${colors.bgDark}; }
        ::-webkit-scrollbar-thumb { background: ${colors.bgElevated}; border-radius: 4px; }
        @media (max-width: 768px) {
          nav > div:last-child { display: none; }
        }
      `}</style>
    </div>
  )
}
