'use client'

import React, { useState, useEffect, useCallback } from 'react'

/**
 * WelcomeIntro — first-impression modal with the "How I Work" carousel.
 *
 * Place this file at:  components/WelcomeIntro.jsx
 *
 * Usage in your main page component (the LBRLWebsite component):
 *
 *   import WelcomeIntro from '@/components/WelcomeIntro'
 *
 *   // ...inside the return, near the top, alongside your other modals:
 *   <WelcomeIntro
 *     isLoading={isLoading}
 *     onBook={() => setTattoodoModalOpen(true)}
 *   />
 *
 * Props:
 *   isLoading  - pass your existing isLoading state so the modal waits
 *                for the sacred-geometry loader to finish before appearing.
 *   onBook     - called when the user taps "Book Consultation". Wire it to
 *                your existing setTattoodoModalOpen(true).
 */

const SLIDES = [
  {
    tag: 'How I Work',
    title: 'Quality Over Speed',
    body: "I've organized my schedule so every tattoo gets the time, focus, and quality it deserves. My goal isn't to rush more appointments — my goal is to do better work.",
    stripe: 'linear-gradient(90deg, #7dd4c4, #5a8a8a)',
  },
  {
    tag: 'Friday → Sunday',
    title: 'Tattoo Days',
    body: 'These are the days I keep focused on tattoo sessions, client experience, and giving each piece my full attention.',
    stripe: 'linear-gradient(90deg, #7dd4c4, #5a8a8a)',
  },
  {
    tag: 'Monday & Tuesday',
    title: 'Design + Admin Days',
    body: 'These days are for designs, revisions, consultations, emails, planning placements, and organizing each project before the tattoo day.',
    stripe: 'linear-gradient(90deg, #5a8a8a, #e8a87c)',
  },
  {
    tag: 'The Philosophy',
    title: 'Why This Matters',
    body: "Good tattoos don't only happen when the machine turns on. A lot of the work happens before the appointment. The better I organize my week, the better I can show up for every client.",
    stripe: 'linear-gradient(90deg, #e8a87c, #7dd4c4)',
  },
  {
    tag: 'Reaching Out',
    title: 'Booking Note',
    body: "If I don't reply instantly, I'm probably tattooing, designing, or catching up on client work. To start a project, send me your idea, placement, and a photo of the area.",
    stripe: 'linear-gradient(90deg, #7dd4c4, #e8a87c)',
  },
]

const c = {
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

export default function WelcomeIntro({ isLoading = false, onBook, onOpenChange, reopenSignal = 0 }) {
  const [open, setOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const touchX = React.useRef(0)

  // Show the full booking/process guide on EVERY fresh page visit.
  // This is deliberately independent of the lightweight LBRL logo animation;
  // users can dismiss the guide without losing access to the website.
  useEffect(() => {
    if (isLoading) return
    const timeout = window.setTimeout(() => setOpen(true), 220)
    return () => window.clearTimeout(timeout)
  }, [isLoading])

  // Allow visitors to open the same guide again from the homepage or menu.
  useEffect(() => {
    if (isLoading || reopenSignal === 0) return
    setSlide(0)
    setOpen(true)
  }, [isLoading, reopenSignal])

  const close = useCallback(() => setOpen(false), [])

  const go = useCallback((i) => {
    setSlide(Math.max(0, Math.min(SLIDES.length - 1, i)))
  }, [])

  // Parent owns scroll locking for the entire overlay stack.
  useEffect(() => {
    if (typeof onOpenChange === 'function') onOpenChange(open)
  }, [open, onOpenChange])

  // Keyboard: ESC closes, arrows navigate
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setSlide((s) => Math.min(SLIDES.length - 1, s + 1))
      if (e.key === 'ArrowLeft') setSlide((s) => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const handleBook = () => {
    close()
    if (typeof onBook === 'function') onBook()
  }

  const cur = SLIDES[slide]

  // Unmount while dismissed: no full-screen backdrop or carousel in the DOM.
  if (!open) return null

  return (
    <div
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2500,
        background: 'rgba(10,13,11,0.85)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      <div
        role="dialog" aria-modal="true" aria-label="Before booking with me"
        style={{
          background: c.bgPrimary, borderRadius: '20px',
          border: `1px solid ${c.borderDefault}`,
          width: '100%', maxWidth: '560px', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 18px 55px rgba(0,0,0,0.38)',
          transform: 'translateY(0)',
          opacity: 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Subtle atmosphere without the cost of large CSS blur filters. */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 20% 0%, rgba(125,212,196,.07), transparent 55%)' }} />

        {/* header */}
        <div style={{ padding: '28px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/Tribal Logo.jpg" alt="LBRL" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontSize: '14px', fontWeight: 300, letterSpacing: '3px' }}>LBRL</span>
          </div>
          <button onClick={close} aria-label="Close" style={{ width: '36px', height: '36px', borderRadius: '50%', background: c.bgElevated, border: `1px solid ${c.borderDefault}`, color: c.textSecondary, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
        </div>

        {/* body */}
        <div style={{ padding: '24px 32px 0', position: 'relative', zIndex: 2, flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, color: c.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Welcome</p>
          <h2 style={{ fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 'clamp(26px, 5vw, 34px)', fontWeight: 300, letterSpacing: '0.4px', lineHeight: 1.14, marginBottom: '8px' }}>Before Booking With Me</h2>
          <p style={{ fontSize: '14px', color: c.textMuted, marginBottom: '28px' }}>A quick look at how I work</p>

          {/* carousel */}
          <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', background: c.bgCard, border: `1px solid ${c.borderDefault}`, minHeight: '280px', marginBottom: '20px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 3, background: cur.stripe, transition: 'background 0.4s ease' }} />
            <div
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                const d = touchX.current - e.changedTouches[0].clientX
                if (Math.abs(d) > 50) go(slide + (d > 0 ? 1 : -1))
              }}
              style={{ display: 'flex', transform: `translateX(-${slide * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
            >
              {SLIDES.map((s, i) => (
                <div key={i} style={{ minWidth: '100%', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: c.accentCyan, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>{s.tag}</p>
                  <h3 style={{ fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 'clamp(25px, 4.5vw, 32px)', fontWeight: 300, color: c.textPrimary, letterSpacing: '0.2px', lineHeight: 1.15, marginBottom: '16px' }}>{s.title}</h3>
                  <div style={{ width: '32px', height: '1px', background: `linear-gradient(90deg, ${c.accentCyan}, transparent)`, marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', color: c.textSecondary, lineHeight: 1.8 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* nav — outside the scroll area so controls stay visible on small screens */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, padding: '10px 28px 14px', borderTop: `1px solid ${c.borderSubtle}`, position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} style={{ width: slide === i ? '24px' : '7px', height: '7px', borderRadius: slide === i ? '4px' : '50%', background: slide === i ? c.accentCyan : c.bgElevated, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Previous" style={{ width: '36px', height: '36px', borderRadius: '50%', background: c.bgElevated, border: `1px solid ${c.borderDefault}`, color: c.textPrimary, cursor: slide === 0 ? 'not-allowed' : 'pointer', opacity: slide === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>←</button>
              <button onClick={() => go(slide + 1)} disabled={slide === SLIDES.length - 1} aria-label="Next" style={{ width: '36px', height: '36px', borderRadius: '50%', background: c.bgElevated, border: `1px solid ${c.borderDefault}`, color: c.textPrimary, cursor: slide === SLIDES.length - 1 ? 'not-allowed' : 'pointer', opacity: slide === SLIDES.length - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>→</button>
            </div>
        </div>

        {/* footer */}
        <div style={{ padding: '20px 32px 28px', borderTop: `1px solid ${c.borderSubtle}`, background: 'rgba(26,31,28,0.4)', position: 'relative', zIndex: 2, display: 'flex', gap: '12px' }}>
          <button onClick={close} style={{ padding: '14px 20px', background: 'transparent', color: c.textSecondary, border: `1px solid ${c.borderDefault}`, borderRadius: '8px', fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Skip</button>
          <button onClick={handleBook} style={{ flex: 1, padding: '14px 24px', background: c.accentCyan, color: c.bgDark, border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>Book Consultation</button>
        </div>
      </div>
    </div>
  )
}
