'use client'

import React, { useState, useEffect } from 'react'

const BOOKING_URL = 'https://book.lbrltattoos.com/'
const RELEASE_URL = 'https://book.lbrltattoos.com/release-form'

export default function LBRLWebsite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeStyle, setActiveStyle] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [sliderIndex, setSliderIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [isLoading])

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
    // NEO JAPANESE
    { id: 4, style: 'japanese', image: '/portfolio/japanese/IMG_0465.png' },
    { id: 6, style: 'japanese', image: '/portfolio/japanese/IMG_0534.png' },
    { id: 7, style: 'japanese', image: '/portfolio/japanese/IMG_0536.jpeg' },
    { id: 8, style: 'japanese', image: '/portfolio/japanese/IMG_0597.jpeg' },
    { id: 9, style: 'japanese', image: '/portfolio/japanese/IMG_0781.png' },
    { id: 10, style: 'japanese', image: '/portfolio/japanese/IMG_0785.png' },
    { id: 12, style: 'japanese', image: '/portfolio/japanese/IMG_0794.jpeg' },
    { id: 13, style: 'japanese', image: '/portfolio/japanese/IMG_1028.png' },
    { id: 14, style: 'japanese', image: '/portfolio/japanese/IMG_4404.png' },
    { id: 16, style: 'japanese', image: '/portfolio/japanese/IMG_4407.webp' },
    { id: 17, style: 'japanese', image: '/portfolio/japanese/IMG_4410.webp' },
    { id: 18, style: 'japanese', image: '/portfolio/japanese/IMG_4411.webp' },
    { id: 19, style: 'japanese', image: '/portfolio/japanese/IMG_4412.jpeg' },
    { id: 20, style: 'japanese', image: '/portfolio/japanese/IMG_4416.jpeg' },
    { id: 21, style: 'japanese', image: '/portfolio/japanese/IMG_4460.webp' },
    { id: 23, style: 'japanese', image: '/portfolio/japanese/IMG_4463.webp' },
    { id: 25, style: 'japanese', image: '/portfolio/japanese/IMG_4467.webp' },
    { id: 26, style: 'japanese', image: '/portfolio/japanese/IMG_4468.webp' },
    { id: 28, style: 'japanese', image: '/portfolio/japanese/IMG_4736.webp' },
    { id: 29, style: 'japanese', image: '/portfolio/japanese/IMG_9302.png' },
    { id: 30, style: 'japanese', image: '/portfolio/japanese/IMG_9303.png' },
    { id: 31, style: 'japanese', image: '/portfolio/japanese/IMG_9304.png' },
    { id: 33, style: 'japanese', image: '/portfolio/japanese/IMG_9311.png' },
    { id: 34, style: 'japanese', image: '/portfolio/japanese/IMG_9312.png' },
    { id: 35, style: 'japanese', image: '/portfolio/japanese/IMG_9314.png' },
    { id: 36, style: 'japanese', image: '/portfolio/japanese/IMG_9315.png' },
    { id: 37, style: 'japanese', image: '/portfolio/japanese/IMG_9320.png' },
    { id: 38, style: 'japanese', image: '/portfolio/japanese/IMG_9321.png' },
    { id: 39, style: 'japanese', image: '/portfolio/japanese/IMG_9322.png' },
    { id: 40, style: 'japanese', image: '/portfolio/japanese/IMG_9371.png' },
    { id: 41, style: 'japanese', image: '/portfolio/japanese/IMG_9395.jpeg' },
    { id: 42, style: 'japanese', image: '/portfolio/japanese/IMG_9397.png' },
    { id: 43, style: 'japanese', image: '/portfolio/japanese/IMG_9398.webp' },
    { id: 45, style: 'japanese', image: '/portfolio/japanese/IMG_9411.webp' },
    { id: 46, style: 'japanese', image: '/portfolio/japanese/IMG_9413.webp' },
    { id: 47, style: 'japanese', image: '/portfolio/japanese/IMG_9415.webp' },
    { id: 48, style: 'japanese', image: '/portfolio/japanese/IMG_9417.png' },
    { id: 49, style: 'japanese', image: '/portfolio/japanese/IMG_9419.png' },
    { id: 50, style: 'japanese', image: '/portfolio/japanese/IMG_9445.png' },
    { id: 51, style: 'japanese', image: '/portfolio/japanese/IMG_9844.jpeg' },
    { id: 52, style: 'japanese', image: '/portfolio/japanese/IMG_9852.webp' },
    { id: 53, style: 'japanese', image: '/portfolio/japanese/IMG_9855.jpeg' },
    { id: 54, style: 'japanese', image: '/portfolio/japanese/IMG_9871.png' },
    // BLACKWORK (18)
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
    // FLORAL
    { id: 74, style: 'floral', image: '/portfolio/floral/IMG_0122.jpeg' },
    { id: 75, style: 'floral', image: '/portfolio/floral/IMG_0131.webp' },
    { id: 76, style: 'floral', image: '/portfolio/floral/IMG_0133.jpeg' },
    { id: 77, style: 'floral', image: '/portfolio/floral/IMG_0137.jpeg' },
    { id: 78, style: 'floral', image: '/portfolio/floral/IMG_0140.jpeg' },
    { id: 79, style: 'floral', image: '/portfolio/floral/IMG_0141.jpeg' },
    { id: 80, style: 'floral', image: '/portfolio/floral/IMG_0143.jpeg' },
    { id: 81, style: 'floral', image: '/portfolio/floral/IMG_1222.jpeg' },
    { id: 82, style: 'floral', image: '/portfolio/floral/IMG_1223.jpeg' },
    { id: 83, style: 'floral', image: '/portfolio/floral/IMG_1225.jpeg' },
    { id: 84, style: 'floral', image: '/portfolio/floral/IMG_9361.webp' },
    { id: 85, style: 'floral', image: '/portfolio/floral/IMG_9363.jpeg' },
    { id: 86, style: 'floral', image: '/portfolio/floral/IMG_9414.webp' },
    { id: 87, style: 'floral', image: '/portfolio/floral/IMG_9442.webp' },
    { id: 88, style: 'floral', image: '/portfolio/floral/IMG_9446.png' },
    { id: 89, style: 'floral', image: '/portfolio/floral/IMG_9447.webp' },
    { id: 90, style: 'floral', image: '/portfolio/floral/IMG_9449.jpeg' },
    { id: 91, style: 'floral', image: '/portfolio/floral/IMG_9450.jpeg' },
    // ORNAMENTAL
    { id: 98, style: 'ornamental', image: '/portfolio/ornamental/IMG_0477.png' },
    { id: 100, style: 'ornamental', image: '/portfolio/ornamental/IMG_0723.png' },
    { id: 101, style: 'ornamental', image: '/portfolio/ornamental/IMG_0725.png' },
    { id: 102, style: 'ornamental', image: '/portfolio/ornamental/IMG_0726.png' },
    { id: 103, style: 'ornamental', image: '/portfolio/ornamental/IMG_0727.png' },
    { id: 104, style: 'ornamental', image: '/portfolio/ornamental/IMG_0730.png' },
    { id: 105, style: 'ornamental', image: '/portfolio/ornamental/IMG_0731.png' },
    { id: 106, style: 'ornamental', image: '/portfolio/ornamental/IMG_0733.png' },
    { id: 107, style: 'ornamental', image: '/portfolio/ornamental/IMG_0735.webp' },
    { id: 108, style: 'ornamental', image: '/portfolio/ornamental/IMG_1230.jpeg' },
    { id: 109, style: 'ornamental', image: '/portfolio/ornamental/IMG_1232.png' },
    { id: 110, style: 'ornamental', image: '/portfolio/ornamental/IMG_1775.jpeg' },
    { id: 111, style: 'ornamental', image: '/portfolio/ornamental/IMG_2580.png' },
    { id: 112, style: 'ornamental', image: '/portfolio/ornamental/IMG_2584.webp' },
    { id: 113, style: 'ornamental', image: '/portfolio/ornamental/IMG_2610.jpeg' },
    { id: 114, style: 'ornamental', image: '/portfolio/ornamental/IMG_2616.webp' },
    { id: 115, style: 'ornamental', image: '/portfolio/ornamental/IMG_2618.jpeg' },
    { id: 116, style: 'ornamental', image: '/portfolio/ornamental/IMG_9366.png' },
    { id: 117, style: 'ornamental', image: '/portfolio/ornamental/IMG_9367.jpeg' },
    { id: 118, style: 'ornamental', image: '/portfolio/ornamental/IMG_9382.jpeg' },
    { id: 119, style: 'ornamental', image: '/portfolio/ornamental/IMG_9389.png' },
    { id: 120, style: 'ornamental', image: '/portfolio/ornamental/IMG_9390.webp' },
    { id: 121, style: 'ornamental', image: '/portfolio/ornamental/IMG_9393.jpeg' },
    { id: 123, style: 'ornamental', image: '/portfolio/ornamental/IMG_9420.png' },
    { id: 124, style: 'ornamental', image: '/portfolio/ornamental/IMG_9422.png' },
    { id: 125, style: 'ornamental', image: '/portfolio/ornamental/IMG_9423.jpeg' },
    { id: 126, style: 'ornamental', image: '/portfolio/ornamental/IMG_9424.jpeg' },
    { id: 127, style: 'ornamental', image: '/portfolio/ornamental/IMG_9425.webp' },
    { id: 128, style: 'ornamental', image: '/portfolio/ornamental/IMG_9754.jpeg' },
    { id: 129, style: 'ornamental', image: '/portfolio/ornamental/IMG_9755.jpeg' },
    { id: 130, style: 'ornamental', image: '/portfolio/ornamental/IMG_9756.png' },
    { id: 131, style: 'ornamental', image: '/portfolio/ornamental/IMG_9758.webp' },
  ]

  const filteredPortfolio = activeStyle === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.style === activeStyle)

  const visibleCount = 4
  const maxSliderIndex = Math.max(0, filteredPortfolio.length - visibleCount)

  const reviews = [
    { name: 'Ivan Martinez', text: 'Got my first tattoo done here, and I couldn\'t have asked for a better experience. Dani was amazing—super chill, easy to talk to, and made the whole process really comfortable from start to finish.', rating: 5 },
    { name: 'Andrew Ammerman', text: 'Dani designed two beautiful and unique sleeves for me. He was amazing through the process and tuned in to my pain tolerance while working around more sensitive spots. I recommend anyone to seek out Dani.', rating: 5 },
    { name: 'Logan Sherlock', text: 'Been going to Dani since I was 18, now almost two sleeves down. I have nothing but fantastic things to say. Always great at working with the client and giving them what they ask for. A true professional.', rating: 5 },
    { name: 'T Boyter', text: 'I\'ve had three sessions with Dani. Clean, professional, personable. Dani will work with you to create your one of a kind masterpiece. His tattoo skills are impressive—clean lines, incredible shading. 10/10', rating: 5 },
    { name: 'Sara Sargent', text: 'Dani is the only artist I will go to. Hands down the best experience, every time. If you\'re looking for someone to bring your feelings to life, this is your person. Creativity at its best.', rating: 5 },
    { name: 'Shainna Thompson', text: 'I came to Dani looking for his expertise in covering an existing tattoo. He listened to my ideas and had the most beautiful concept drawn up. If you want your body to become a walking piece of art, contact him!', rating: 5 },
    { name: 'Emily Heacock', text: 'Love my new tattoo! Dani is very professional and communicative. He makes you feel very welcome and comfortable through the process. Will definitely be going back for future tattoos!', rating: 5 },
    { name: 'Jessica Allen', text: 'I have gone to Dani for the past 3 years and gotten 3 different tattoos from him. He is very professional but also exceptionally talented and fast! You will not be disappointed!', rating: 5 },
  ]

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
    }, 5000) // Change every 5 seconds
    return () => clearInterval(interval)
  }, [reviews.length])

  const processSteps = [
    { number: '01', title: 'Consultation', desc: 'We sit down and talk through your idea, placement, and vision. This is where the concept starts taking shape.' },
    { number: '02', title: 'Design', desc: 'I develop your custom design and we meet for a revision session to finalize everything before your tattoo appointment.' },
    { number: '03', title: 'Session', desc: 'Your session happens in my private studio. Bring a blanket, snacks, whatever helps you relax. The calmer you are, the smoother it goes.' },
    { number: '04', title: 'Aftercare', desc: 'You leave with clear aftercare instructions and I walk you through what to expect as your piece heals.' },
  ]

  const faqs = [
    { q: 'Am I eligible for a tattoo?', a: 'You must be 18 years or older and present a valid ID. No exceptions.' },
    { q: 'What should I expect from a large-scale tattoo?', a: 'Large-scale projects like sleeves, back pieces, or full leg pieces require a real commitment of time and budget. These projects are completed over multiple sessions, and timelines vary depending on the design, your body, and how you sit. Rushing a tattoo usually affects the quality, so the focus is always on doing it right rather than doing it fast.' },
    { q: 'How does pricing work?', a: 'Large-scale projects are priced at $260 per hour with a $300 deposit. Medium projects are a flat rate from $500 to $750 with a $250 deposit. Small tattoos have a $150 shop minimum, typically ranging from $150 to $350, with deposits from $50 to $100. All deposits go toward the final session.' },
    { q: 'What\'s required to secure an appointment?', a: 'All appointments require a deposit, which secures your booking and covers design time. Deposits are applied toward the final session and are non-refundable.' },
    { q: 'What if I need to cancel or reschedule?', a: 'Cancellations or reschedules made with less than 72 hours notice will result in the loss of the deposit. A new deposit is required to book again.' },
    { q: 'Will I see the design before the tattoo?', a: 'For large-scale projects with a $300 deposit, a revision appointment is scheduled where you review up to three design directions. For medium and small tattoos, designs are reviewed on the day of the appointment. I don\'t send work-in-progress images beforehand, as reviewing in person leads to better results.' },
    { q: 'How should I prepare for my session?', a: 'Get a good night\'s rest, eat beforehand, stay hydrated, and bring snacks if you\'d like. You\'re welcome to bring a blanket or anything that helps you stay comfortable during the session.' },
    { q: 'What am I agreeing to when I book?', a: 'By booking an appointment, you acknowledge and agree to the pricing, deposit policy, and process outlined here. You\'re also agreeing to follow studio guidelines so the session runs smoothly.' },
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
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
    }}>

      {/* Loading Spinner */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.bgDark,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          overflow: 'hidden',
        }}>
          {/* Sacred Geometry / Fibonacci Background */}
          <svg style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.12,
          }} viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sacredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.accentCyan} />
                <stop offset="50%" stopColor={colors.accentTeal} />
                <stop offset="100%" stopColor={colors.accentCyan} />
              </linearGradient>
            </defs>
            {/* Golden Spiral approximation */}
            <path d="M250,250 Q250,180 320,180 Q390,180 390,250 Q390,350 290,350 Q170,350 170,230 Q170,90 310,90" 
              stroke="url(#sacredGrad)" strokeWidth="0.8" fill="none" className="fibonacci-spiral" />
            {/* Fibonacci circles */}
            <circle cx="250" cy="250" r="21" stroke="url(#sacredGrad)" strokeWidth="0.5" fill="none" className="fib-circle-1" />
            <circle cx="250" cy="250" r="34" stroke="url(#sacredGrad)" strokeWidth="0.5" fill="none" className="fib-circle-2" />
            <circle cx="250" cy="250" r="55" stroke="url(#sacredGrad)" strokeWidth="0.5" fill="none" className="fib-circle-3" />
            <circle cx="250" cy="250" r="89" stroke="url(#sacredGrad)" strokeWidth="0.6" fill="none" className="fib-circle-4" />
            <circle cx="250" cy="250" r="144" stroke="url(#sacredGrad)" strokeWidth="0.6" fill="none" className="fib-circle-5" />
            {/* Flower of Life petals */}
            <circle cx="250" cy="215" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            <circle cx="280" cy="232" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            <circle cx="280" cy="268" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            <circle cx="250" cy="285" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            <circle cx="220" cy="268" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            <circle cx="220" cy="232" r="35" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none" />
            {/* Organic floral curves */}
            <path d="M150,100 Q200,150 180,200 Q160,250 200,280 Q240,310 200,350" stroke="url(#sacredGrad)" strokeWidth="0.6" fill="none" className="organic-line-1" />
            <path d="M350,100 Q300,150 320,200 Q340,250 300,280 Q260,310 300,350" stroke="url(#sacredGrad)" strokeWidth="0.6" fill="none" className="organic-line-2" />
            <path d="M100,250 Q150,220 200,250 Q250,280 300,250 Q350,220 400,250" stroke="url(#sacredGrad)" strokeWidth="0.5" fill="none" />
            {/* Fine detail arcs */}
            <path d="M180,150 Q220,120 260,150" stroke="url(#sacredGrad)" strokeWidth="0.3" fill="none" />
            <path d="M240,350 Q280,380 320,350" stroke="url(#sacredGrad)" strokeWidth="0.3" fill="none" />
          </svg>
          
          <div className="logo-spinner" style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            animation: 'spin 1.5s ease-in-out infinite',
            boxShadow: `0 0 60px ${colors.accentCyan}33`,
          }}>
            <img 
              src="/Tribal Logo.jpg" 
              alt="LBRL" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
              }} 
            />
          </div>
          <span style={{ 
            fontSize: '24px', 
            fontWeight: '300', 
            letterSpacing: '6px', 
            color: colors.textPrimary,
            opacity: 0.8,
          }}>LBRL</span>
        </div>
      )}

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
        opacity: isLoading ? 0 : 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '20px', fontWeight: '300', letterSpacing: '4px', color: colors.textPrimary }}>LBRL</span>
        </div>
        
        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textPrimary} strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.bgDark,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 24px',
          gap: '24px',
        }}>
          {['Portfolio', 'About', 'Process', 'Pricing', 'FAQs', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: colors.textPrimary,
                textDecoration: 'none',
                fontSize: '18px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {item}
            </a>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '14px 24px',
                background: 'transparent',
                border: `1px solid ${colors.accentCyan}`,
                borderRadius: '6px',
                color: colors.accentCyan,
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Release Form
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '14px 24px',
                background: colors.accentCyan,
                borderRadius: '6px',
                color: colors.bgDark,
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Book Now
            </a>
          </div>
        </div>
      )}

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
        overflow: 'hidden',
      }}>
        {/* Aurora / Northern Lights Effect */}
        <div className="aurora-container" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <div className="aurora-flash aurora-1" />
          <div className="aurora-flash aurora-2" />
          <div className="aurora-flash aurora-3" />
        </div>
        
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
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.6s ease 0.3s',
        }}>
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>📍 Vancouver, WA</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>•</span>
          <span style={{ fontSize: '12px', color: colors.accentCyan }}>Award Winner: NYC 2016 & Portland 2024</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 72px)',
          fontWeight: '300',
          letterSpacing: '-1px',
          marginBottom: '24px',
          lineHeight: '1.1',
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(30px)' : 'translateY(0)',
          transition: 'all 0.6s ease 0.5s',
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
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(30px)' : 'translateY(0)',
          transition: 'all 0.6s ease 0.7s',
        }}>
          Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(30px)' : 'translateY(0)',
          transition: 'all 0.6s ease 0.9s',
        }}>
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

        {/* Wind Animation Image - Below Buttons */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          marginTop: '60px',
          padding: '0 40px',
        }}>
          <img 
            src="/IMG_4885.png" 
            alt="Decorative floral element" 
            className="wind-blow-image"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
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
      <section id="about" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className={visibleSections['about'] ? 'animate-fadeInLeft' : 'animate-hidden'}>
              <img 
                src="/Dany 3.PNG" 
                alt="Daniel Liberal tattooing" 
                style={{ 
                  width: '100%', 
                  borderRadius: '16px', 
                  marginBottom: '30px',
                  objectFit: 'cover',
                }} 
              />
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
                Tattooing, for me, starts with understanding how the body carries a design. I think about flow, movement, and how a tattoo lives on the skin over time.
              </p>
              <p style={{
                fontSize: '16px',
                color: colors.textSecondary,
                lineHeight: '1.8',
                marginBottom: '24px',
              }}>
                With over 12 years of experience and recognition from tattoo conventions in New York and Portland, my approach stays the same: one-on-one collaboration and fully custom work.
              </p>
              <p style={{
                fontSize: '14px',
                color: colors.textMuted,
                fontStyle: 'italic',
              }}>
                From Puerto Rico 2013 est. to Vancouver, WA 2016-Present
              </p>
            </div>
            <div className={visibleSections['about'] ? 'animate-fadeInRight animate-delay-2' : 'animate-hidden'} style={{
              background: `linear-gradient(180deg, rgba(42,50,45,0.95) 0%, rgba(42,50,45,0.98) 100%), url('/about-bg.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              padding: '40px 32px',
              border: `1px solid ${colors.borderDefault}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <img src="/Dani1.png" alt="Daniel Liberal" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Daniel Liberal</h3>
                  <p style={{ fontSize: '13px', color: colors.textMuted }}>Lead Artist & Owner</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderSubtle}` }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Experience</span>
                  <span style={{ fontSize: '13px', color: colors.textPrimary }}>12+ Years</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderSubtle}`, flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Specialties</span>
                  <span style={{ fontSize: '13px', color: colors.textPrimary, textAlign: 'right' }}>Neo Japanese, Blackwork,<br />Ornamental, Floral</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>Recognition</span>
                  <span style={{ fontSize: '13px', color: colors.accentCyan }}>NYC 2016 & Portland 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100vw',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className={visibleSections['portfolio'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '40px' }}>
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
      <section id="process" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className={visibleSections['process'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
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
                className={visibleSections['process'] ? `animate-fadeInUp animate-delay-${i + 1}` : 'animate-hidden'}
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
      <section id="pricing" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          <div className={visibleSections['pricing'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
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
          <div className={visibleSections['pricing'] ? 'animate-fadeInUp animate-delay-2' : 'animate-hidden'} style={{
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
              }}>$500 to $750</div>
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
              }}>$150 to $350</div>
              <div style={{
                fontSize: '14px',
                color: colors.accentCyan,
                marginBottom: '20px',
              }}>$50 to $100 deposit</div>
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
      <section id="reviews" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={visibleSections['reviews'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
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

          {/* Single Review Carousel */}
          <div className={visibleSections['reviews'] ? 'animate-fadeInUp animate-delay-2' : 'animate-hidden'} style={{
            background: colors.bgCard,
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 48px)',
            border: `1px solid ${colors.borderDefault}`,
            textAlign: 'center',
            position: 'relative',
            minHeight: '220px',
          }}>
            {/* Stars */}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '24px' }}>
              {[...Array(5)].map((_, j) => (
                <span key={j} style={{ color: colors.accentOrange, fontSize: '20px' }}>★</span>
              ))}
            </div>
            
            {/* Review Text */}
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: colors.textSecondary,
              lineHeight: '1.8',
              marginBottom: '24px',
              fontStyle: 'italic',
              transition: 'opacity 0.5s ease',
            }}>"{reviews[currentReviewIndex].text}"</p>
            
            {/* Client Name */}
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.accentCyan,
              marginBottom: '32px',
            }}>— {reviews[currentReviewIndex].name}</p>
            
            {/* Navigation Dots */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReviewIndex(i)}
                  style={{
                    width: currentReviewIndex === i ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: currentReviewIndex === i ? colors.accentCyan : colors.bgElevated,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Google Rating Badge */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ color: colors.accentOrange, fontSize: '24px' }}>★</span>
            <span style={{ fontSize: '14px', color: colors.textSecondary }}>
              <strong style={{ color: colors.textPrimary }}>5.0</strong> rating on Google
            </span>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgPrimary,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '60px', alignItems: 'start' }}>
            <div className={visibleSections['faqs'] ? 'animate-fadeInLeft' : 'animate-hidden'}>
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: colors.bgCard,
                      borderRadius: '12px',
                      border: `1px solid ${colors.borderDefault}`,
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                      }}
                    >
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: colors.textPrimary,
                        margin: 0,
                        paddingRight: '16px',
                      }}>{faq.q}</h3>
                      <span style={{
                        color: colors.accentCyan,
                        fontSize: '20px',
                        fontWeight: '300',
                        transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}>+</span>
                    </button>
                    <div style={{
                      maxHeight: expandedFaq === i ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: colors.textSecondary,
                        lineHeight: '1.7',
                        margin: 0,
                        padding: '0 24px 20px 24px',
                      }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={visibleSections['faqs'] ? 'animate-fadeInRight animate-delay-2' : 'animate-hidden'} style={{
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
                  marginBottom: '20px',
                }} 
              />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  objectFit: 'cover',
                }}
              >
                <source src="/_users_355de36e-0a13-42b0-a4f8-690006e9848c_generated_0760b186-f9b7-45de-b081-c173128c2802_generated_video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        background: colors.bgDark,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className={visibleSections['contact'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
              ✉️ Liberaltattoos@gmail.com
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
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${colors.bgDark}; }
        ::-webkit-scrollbar-thumb { background: ${colors.bgElevated}; border-radius: 4px; }
        
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        /* Wind Blow Animation for IMG_4885 */
        @keyframes windBlow {
          0% {
            transform: translateX(-100px);
            clip-path: inset(0 100% 0 0);
          }
          50% {
            clip-path: inset(0 0 0 0);
          }
          70% {
            transform: translateX(15px);
          }
          85% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
            clip-path: inset(0 0 0 0);
          }
        }
        
        .wind-blow-image {
          animation: windBlow 1.5s ease-out forwards;
          animation-delay: 1s;
          clip-path: inset(0 100% 0 0);
        }
        
        /* Aurora / Northern Lights Effect */
        @keyframes auroraFlash {
          0%, 80%, 100% { 
            opacity: 0; 
            transform: translateX(-100%) skewX(-15deg);
          }
          88% { 
            opacity: 0.25; 
            transform: translateX(0%) skewX(-15deg);
          }
          94% { 
            opacity: 0.12; 
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        .aurora-flash {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(125, 212, 196, 0.05) 15%,
            rgba(125, 212, 196, 0.15) 35%,
            rgba(90, 138, 138, 0.2) 50%,
            rgba(125, 212, 196, 0.15) 65%,
            rgba(125, 212, 196, 0.05) 85%,
            transparent 100%
          );
          pointer-events: none;
        }
        
        .aurora-1 {
          top: 0;
          left: -100%;
          animation: auroraFlash 10s ease-in-out infinite;
        }
        
        .aurora-2 {
          top: 25%;
          left: -100%;
          animation: auroraFlash 13s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .aurora-3 {
          top: 55%;
          left: -100%;
          animation: auroraFlash 16s ease-in-out infinite;
          animation-delay: 7s;
        }
        
        /* Fibonacci circles animation for loading - continuous pulse */
        .fib-circle-1, .fib-circle-2, .fib-circle-3, .fib-circle-4, .fib-circle-5 {
          animation: fibPulse 2.5s ease-in-out infinite;
        }
        .fib-circle-2 { animation-delay: 0.15s; }
        .fib-circle-3 { animation-delay: 0.3s; }
        .fib-circle-4 { animation-delay: 0.45s; }
        .fib-circle-5 { animation-delay: 0.6s; }
        
        @keyframes fibPulse {
          0%, 100% { 
            opacity: 0.08; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.25; 
            transform: scale(1.05);
          }
        }
        
        .fibonacci-spiral {
          animation: spiralPulse 3s ease-in-out infinite;
        }
        
        @keyframes spiralPulse {
          0%, 100% { 
            opacity: 0.1; 
            stroke-dashoffset: 0;
          }
          50% { 
            opacity: 0.3; 
            stroke-dashoffset: 100;
          }
        }
        
        .organic-line-1, .organic-line-2 {
          animation: organicPulse 2.8s ease-in-out infinite;
        }
        .organic-line-2 { animation-delay: 0.4s; }
        
        @keyframes organicPulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-hidden {
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease forwards;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease forwards;
        }
        
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
        .animate-delay-4 { animation-delay: 0.4s; }
        .animate-delay-5 { animation-delay: 0.5s; }
        
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }
        
        @media (max-width: 1024px) {
          .desktop-nav { gap: 16px !important; }
          .desktop-nav a { font-size: 10px !important; }
        }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          
          html, body { overflow-x: hidden !important; width: 100% !important; }
          
          nav { padding: 12px 16px !important; }
          
          section { padding: 40px 16px !important; }
          
          h1 { font-size: 32px !important; }
          h2 { font-size: 24px !important; }
          
          [style*="grid-template-columns: 1fr 1fr"] { 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 30px !important; 
          }
          
          [style*="grid-template-columns: repeat(4"] { 
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 12px !important;
          }
          
          [style*="grid-template-columns: repeat(3"] { 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 16px !important;
          }
          
          [style*="grid-template-columns: 1fr 300px"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }
          
          [style*="grid-template-columns: repeat(auto-fit"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          
          /* Portfolio filter buttons */
          [style*="gap: 12px"][style*="flex-wrap"] {
            gap: 8px !important;
          }
          
          [style*="gap: 12px"][style*="flex-wrap"] button {
            padding: 8px 12px !important;
            font-size: 10px !important;
          }
          
          /* Fix slider on mobile */
          [style*="minWidth: 280px"] {
            min-width: 240px !important;
          }
          
          /* Fix hero section */
          [style*="minHeight: 100vh"] {
            min-height: auto !important;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          
          /* Remove any fixed positioning issues */
          [style*="position: sticky"] {
            position: relative !important;
          }
          
          /* Fix FAQs section on mobile - hide image */
          #faqs [style*="position: sticky"] {
            display: none !important;
          }
          
          /* Ensure proper spacing between sections */
          section {
            position: relative !important;
            z-index: 1 !important;
            overflow: visible !important;
          }
          
          /* Fix contact section overlap */
          #contact {
            margin-top: 0 !important;
            padding-top: 60px !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 { font-size: 26px !important; }
          h2 { font-size: 20px !important; }
          
          [style*="grid-template-columns: repeat(4"] { 
            grid-template-columns: 1fr !important;
          }
          
          [style*="padding: 32px"] {
            padding: 16px !important;
          }
          
          /* Stats bar single column */
          [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          /* Portfolio filter buttons wrap better */
          [style*="gap: 12px"][style*="flex-wrap"] {
            justify-content: center !important;
          }
          
          [style*="gap: 12px"][style*="flex-wrap"] button {
            padding: 6px 10px !important;
            font-size: 9px !important;
            letter-spacing: 0.5px !important;
          }
          
          /* Slider cards smaller */
          [style*="minWidth: 280px"] {
            min-width: 200px !important;
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  )
}
