'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

const BOOKING_URL = 'https://ta2.do/Dani_lbrl'
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
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [visibleSections, setVisibleSections] = useState({})
  const [particles, setParticles] = useState([])
  
  // ========== TATTOODO MODAL STATE ==========
  const [tattoodoModalOpen, setTattoodoModalOpen] = useState(false)

  // ========== PARTICLE SYSTEM ==========
  useEffect(() => {
    if (!isLoading) return
    const pts = []
    for (let i = 0; i < 20; i++) {
      pts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 3,
        duration: Math.random() * 5 + 4,
        drift: (Math.random() - 0.5) * 50,
        opacity: Math.random() * 0.2 + 0.05,
      })
    }
    setParticles(pts)
  }, [isLoading])

  // ========== SACRED GEOMETRY HELPERS ==========
  const hexPath = (cx, cy, r) => {
    const pts = Array.from({length: 6}, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
    })
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + ' Z'
  }

  // Metatron's Cube: 13 Fruit of Life centers + ALL connections
  const metatronCenters = [
    [250, 250],
    [250, 215], [280, 232], [280, 268], [250, 285], [220, 268], [220, 232],
    [250, 180], [295, 197], [295, 303], [250, 320], [205, 303], [205, 197],
  ]
  const metatronLines = []
  for (let i = 0; i < metatronCenters.length; i++) {
    for (let j = i + 1; j < metatronCenters.length; j++) {
      const d = Math.sqrt((metatronCenters[i][0]-metatronCenters[j][0])**2 + (metatronCenters[i][1]-metatronCenters[j][1])**2)
      metatronLines.push({ x1: metatronCenters[i][0], y1: metatronCenters[i][1], x2: metatronCenters[j][0], y2: metatronCenters[j][1], d })
    }
  }

  useEffect(() => {
    // Phase sequence — extended for appreciation
    const phase1 = setTimeout(() => setLoadingPhase(1), 2000)   // 2s of pure geometry drawing
    const phase2 = setTimeout(() => setLoadingPhase(2), 2800)   // Logo settles → Text reveals
    const phase3 = setTimeout(() => setLoadingPhase(3), 4400)   // Hold and breathe → Exit
    const done   = setTimeout(() => setIsLoading(false), 5200)  // Cleanup
    return () => { clearTimeout(phase1); clearTimeout(phase2); clearTimeout(phase3); clearTimeout(done) }
  }, [])

  // ========== LOAD TATTOODO SDK ON MOUNT ==========
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.tattoodo.com/static/assets/sdk.js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.tattoodo.com/static/assets/sdk.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  // ========== CONTROL BODY SCROLL WHEN MODAL OPENS ==========
  useEffect(() => {
    if (tattoodoModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [tattoodoModalOpen])

  // ========== CLOSE MODAL ON ESCAPE KEY ==========
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && tattoodoModalOpen) {
        setTattoodoModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tattoodoModalOpen])

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

  // ========== SEO-OPTIMIZED PORTFOLIO WITH ALT TEXT ==========
  const portfolioItems = [
    // NEO JAPANESE
    { id: 4, style: 'japanese', image: '/portfolio/japanese/IMG_0465.png', alt: 'Neo Japanese koi fish tattoo with water elements by Daniel Liberal Vancouver WA' },
    { id: 6, style: 'japanese', image: '/portfolio/japanese/IMG_0534.png', alt: 'Japanese inspired dragon tattoo with bold colors custom design Vancouver WA' },
    { id: 7, style: 'japanese', image: '/portfolio/japanese/IMG_0536.jpeg', alt: 'Neo Japanese sleeve tattoo with traditional motifs by LBRL Tattoo Studio' },
    { id: 8, style: 'japanese', image: '/portfolio/japanese/IMG_0597.jpeg', alt: 'Japanese style tattoo with flowing composition custom work Vancouver Washington' },
    { id: 9, style: 'japanese', image: '/portfolio/japanese/IMG_0781.png', alt: 'Neo Japanese forearm tattoo with dynamic movement by Daniel Liberal' },
    { id: 10, style: 'japanese', image: '/portfolio/japanese/IMG_0785.png', alt: 'Japanese inspired tattoo piece with traditional elements Vancouver WA artist' },
    { id: 12, style: 'japanese', image: '/portfolio/japanese/IMG_0794.jpeg', alt: 'Custom neo Japanese tattoo with bold shading by LBRL Studio Vancouver' },
    { id: 13, style: 'japanese', image: '/portfolio/japanese/IMG_1028.png', alt: 'Japanese style half sleeve tattoo custom designed Vancouver WA tattoo shop' },
    { id: 14, style: 'japanese', image: '/portfolio/japanese/IMG_4404.png', alt: 'Neo Japanese arm tattoo flowing with natural anatomy Body Harmony design' },
    { id: 16, style: 'japanese', image: '/portfolio/japanese/IMG_4407.webp', alt: 'Japanese inspired custom tattoo with wave elements by Daniel Liberal' },
    { id: 17, style: 'japanese', image: '/portfolio/japanese/IMG_4410.webp', alt: 'Neo Japanese leg tattoo with traditional Japanese art influences Vancouver WA' },
    { id: 18, style: 'japanese', image: '/portfolio/japanese/IMG_4411.webp', alt: 'Custom Japanese style tattoo with organic flow by award winning artist Daniel Liberal' },
    { id: 19, style: 'japanese', image: '/portfolio/japanese/IMG_4412.jpeg', alt: 'Neo Japanese tattoo design with bold lines and color by LBRL Tattoo Studio' },
    { id: 20, style: 'japanese', image: '/portfolio/japanese/IMG_4416.jpeg', alt: 'Japanese inspired sleeve progress custom tattoo art Vancouver Washington' },
    { id: 21, style: 'japanese', image: '/portfolio/japanese/IMG_4460.webp', alt: 'Neo Japanese upper arm tattoo with dynamic composition LBRL Studio' },
    { id: 23, style: 'japanese', image: '/portfolio/japanese/IMG_4463.webp', alt: 'Japanese style custom tattoo with flowing design by Daniel Liberal Vancouver' },
    { id: 25, style: 'japanese', image: '/portfolio/japanese/IMG_4467.webp', alt: 'Neo Japanese tattoo piece with traditional motifs and modern execution' },
    { id: 26, style: 'japanese', image: '/portfolio/japanese/IMG_4468.webp', alt: 'Custom Japanese inspired tattoo with bold shading Vancouver WA tattoo artist' },
    { id: 28, style: 'japanese', image: '/portfolio/japanese/IMG_4736.webp', alt: 'Neo Japanese full color tattoo designed to flow with body anatomy' },
    { id: 29, style: 'japanese', image: '/portfolio/japanese/IMG_9302.png', alt: 'Japanese style forearm tattoo with detailed line work by Daniel Liberal' },
    { id: 30, style: 'japanese', image: '/portfolio/japanese/IMG_9303.png', alt: 'Neo Japanese tattoo with traditional waves and bold contrast LBRL Studio' },
    { id: 31, style: 'japanese', image: '/portfolio/japanese/IMG_9304.png', alt: 'Custom Japanese sleeve tattoo in progress by award winning Vancouver WA artist' },
    { id: 33, style: 'japanese', image: '/portfolio/japanese/IMG_9311.png', alt: 'Neo Japanese arm tattoo with organic flow and detailed shading' },
    { id: 34, style: 'japanese', image: '/portfolio/japanese/IMG_9312.png', alt: 'Japanese inspired custom tattoo piece with dynamic composition Vancouver WA' },
    { id: 35, style: 'japanese', image: '/portfolio/japanese/IMG_9314.png', alt: 'Neo Japanese tattoo with bold colors flowing with natural body lines' },
    { id: 36, style: 'japanese', image: '/portfolio/japanese/IMG_9315.png', alt: 'Custom neo Japanese tattoo design by Daniel Liberal LBRL Tattoo Studio' },
    { id: 37, style: 'japanese', image: '/portfolio/japanese/IMG_9320.png', alt: 'Japanese style tattoo with traditional elements and modern flair Vancouver' },
    { id: 38, style: 'japanese', image: '/portfolio/japanese/IMG_9321.png', alt: 'Neo Japanese leg piece with flowing composition by LBRL Studio Vancouver WA' },
    { id: 39, style: 'japanese', image: '/portfolio/japanese/IMG_9322.png', alt: 'Japanese inspired custom tattoo with detailed shading and bold lines' },
    { id: 40, style: 'japanese', image: '/portfolio/japanese/IMG_9371.png', alt: 'Neo Japanese tattoo art with anatomical flow Body Harmony approach' },
    { id: 41, style: 'japanese', image: '/portfolio/japanese/IMG_9395.jpeg', alt: 'Japanese style tattoo sleeve by Daniel Liberal award winning tattoo artist' },
    { id: 42, style: 'japanese', image: '/portfolio/japanese/IMG_9397.png', alt: 'Neo Japanese custom tattoo with vibrant colors Vancouver WA tattoo shop' },
    { id: 43, style: 'japanese', image: '/portfolio/japanese/IMG_9398.webp', alt: 'Japanese inspired arm tattoo with traditional motifs by LBRL Studio' },
    { id: 45, style: 'japanese', image: '/portfolio/japanese/IMG_9411.webp', alt: 'Neo Japanese tattoo piece designed with Body Harmony philosophy Vancouver' },
    { id: 46, style: 'japanese', image: '/portfolio/japanese/IMG_9413.webp', alt: 'Custom Japanese style tattoo with bold composition by Daniel Liberal' },
    { id: 47, style: 'japanese', image: '/portfolio/japanese/IMG_9415.webp', alt: 'Neo Japanese forearm tattoo with dynamic flow and detailed execution' },
    { id: 48, style: 'japanese', image: '/portfolio/japanese/IMG_9417.png', alt: 'Japanese inspired custom piece with organic movement Vancouver WA' },
    { id: 49, style: 'japanese', image: '/portfolio/japanese/IMG_9419.png', alt: 'Neo Japanese tattoo with bold shading and traditional elements LBRL' },
    { id: 50, style: 'japanese', image: '/portfolio/japanese/IMG_9445.png', alt: 'Japanese style custom tattoo art flowing with anatomy by Daniel Liberal' },
    { id: 51, style: 'japanese', image: '/portfolio/japanese/IMG_9844.jpeg', alt: 'Neo Japanese full sleeve tattoo with cohesive design Vancouver WA artist' },
    { id: 52, style: 'japanese', image: '/portfolio/japanese/IMG_9852.webp', alt: 'Japanese inspired custom tattoo with flowing water elements LBRL Studio' },
    { id: 53, style: 'japanese', image: '/portfolio/japanese/IMG_9855.jpeg', alt: 'Neo Japanese tattoo piece with detailed line work and bold shading' },
    { id: 54, style: 'japanese', image: '/portfolio/japanese/IMG_9871.png', alt: 'Custom Japanese style tattoo designed for natural body flow Vancouver WA' },
    // BLACKWORK
    { id: 56, style: 'blackwork', image: '/portfolio/blackwork/IMG_0446.png', alt: 'Heavy blackwork tattoo with bold geometric patterns by Daniel Liberal Vancouver WA' },
    { id: 57, style: 'blackwork', image: '/portfolio/blackwork/IMG_0447.png', alt: 'Custom blackwork arm tattoo with solid black fills LBRL Tattoo Studio' },
    { id: 58, style: 'blackwork', image: '/portfolio/blackwork/IMG_0460.png', alt: 'Blackwork tattoo design with intricate detail by award winning artist Vancouver' },
    { id: 59, style: 'blackwork', image: '/portfolio/blackwork/IMG_4428.webp', alt: 'Heavy blackwork forearm piece with organic patterns Vancouver WA tattoo shop' },
    { id: 60, style: 'blackwork', image: '/portfolio/blackwork/IMG_4429.webp', alt: 'Custom blackwork tattoo with bold contrast by Daniel Liberal LBRL Studio' },
    { id: 61, style: 'blackwork', image: '/portfolio/blackwork/IMG_4430.webp', alt: 'Blackwork sleeve tattoo with detailed composition flowing with body anatomy' },
    { id: 62, style: 'blackwork', image: '/portfolio/blackwork/IMG_4433.webp', alt: 'Heavy blackwork tattoo piece with organic flow Vancouver Washington artist' },
    { id: 63, style: 'blackwork', image: '/portfolio/blackwork/IMG_4435.webp', alt: 'Custom blackwork arm tattoo with bold design elements by LBRL Studio' },
    { id: 64, style: 'blackwork', image: '/portfolio/blackwork/IMG_4438.webp', alt: 'Blackwork tattoo with intricate patterns and solid fills Vancouver WA' },
    { id: 65, style: 'blackwork', image: '/portfolio/blackwork/IMG_4440.webp', alt: 'Heavy blackwork custom tattoo by Daniel Liberal award winning tattoo artist' },
    { id: 66, style: 'blackwork', image: '/portfolio/blackwork/IMG_4442.webp', alt: 'Blackwork leg tattoo with bold design flowing with natural anatomy' },
    { id: 67, style: 'blackwork', image: '/portfolio/blackwork/IMG_4443.webp', alt: 'Custom blackwork piece with geometric elements LBRL Tattoo Studio Vancouver' },
    { id: 68, style: 'blackwork', image: '/portfolio/blackwork/IMG_9386.webp', alt: 'Heavy blackwork tattoo with organic patterns and bold contrast Vancouver WA' },
    { id: 69, style: 'blackwork', image: '/portfolio/blackwork/IMG_9388.jpeg', alt: 'Blackwork arm tattoo with detailed shading by Daniel Liberal' },
    { id: 70, style: 'blackwork', image: '/portfolio/blackwork/IMG_9399.jpeg', alt: 'Custom blackwork tattoo design with bold solid fills Vancouver WA tattoo shop' },
    { id: 71, style: 'blackwork', image: '/portfolio/blackwork/IMG_9400.webp', alt: 'Heavy blackwork forearm piece by award winning artist LBRL Studio' },
    { id: 72, style: 'blackwork', image: '/portfolio/blackwork/IMG_9404.png', alt: 'Blackwork custom tattoo with Body Harmony anatomical flow Vancouver' },
    // FLORAL
    { id: 74, style: 'floral', image: '/portfolio/floral/IMG_0122.jpeg', alt: 'Botanical fine line floral tattoo with delicate petals by Daniel Liberal Vancouver WA' },
    { id: 75, style: 'floral', image: '/portfolio/floral/IMG_0131.webp', alt: 'Custom floral tattoo with organic botanical elements LBRL Tattoo Studio' },
    { id: 76, style: 'floral', image: '/portfolio/floral/IMG_0133.jpeg', alt: 'Fine line flower tattoo design flowing with natural body lines Vancouver' },
    { id: 77, style: 'floral', image: '/portfolio/floral/IMG_0137.jpeg', alt: 'Botanical tattoo with detailed floral composition by award winning artist' },
    { id: 78, style: 'floral', image: '/portfolio/floral/IMG_0140.jpeg', alt: 'Custom floral arm tattoo with fine line detail Vancouver WA tattoo shop' },
    { id: 79, style: 'floral', image: '/portfolio/floral/IMG_0141.jpeg', alt: 'Botanical fine line tattoo with organic flower design by Daniel Liberal' },
    { id: 80, style: 'floral', image: '/portfolio/floral/IMG_0143.jpeg', alt: 'Floral tattoo piece with delicate botanical elements LBRL Studio Vancouver' },
    { id: 81, style: 'floral', image: '/portfolio/floral/IMG_1222.jpeg', alt: 'Custom botanical tattoo with flowing floral composition Vancouver WA' },
    { id: 82, style: 'floral', image: '/portfolio/floral/IMG_1223.jpeg', alt: 'Fine line floral tattoo designed with Body Harmony anatomy approach' },
    { id: 83, style: 'floral', image: '/portfolio/floral/IMG_1225.jpeg', alt: 'Botanical flower tattoo with intricate line work by Daniel Liberal' },
    { id: 84, style: 'floral', image: '/portfolio/floral/IMG_9361.webp', alt: 'Custom floral tattoo with organic flow by LBRL Tattoo Studio Vancouver WA' },
    { id: 85, style: 'floral', image: '/portfolio/floral/IMG_9363.jpeg', alt: 'Botanical fine line arm tattoo with natural movement and detail' },
    { id: 86, style: 'floral', image: '/portfolio/floral/IMG_9414.webp', alt: 'Floral tattoo with delicate petals and stems Vancouver Washington artist' },
    { id: 87, style: 'floral', image: '/portfolio/floral/IMG_9442.webp', alt: 'Custom botanical tattoo piece flowing with body anatomy by Daniel Liberal' },
    { id: 88, style: 'floral', image: '/portfolio/floral/IMG_9446.png', alt: 'Fine line floral tattoo with detailed botanical elements LBRL Studio' },
    { id: 89, style: 'floral', image: '/portfolio/floral/IMG_9447.webp', alt: 'Botanical flower tattoo with organic composition Vancouver WA tattoo shop' },
    { id: 90, style: 'floral', image: '/portfolio/floral/IMG_9449.jpeg', alt: 'Custom floral fine line tattoo by award winning artist Daniel Liberal' },
    { id: 91, style: 'floral', image: '/portfolio/floral/IMG_9450.jpeg', alt: 'Botanical tattoo with flowing floral design LBRL Tattoo Studio Vancouver' },
    // ORNAMENTAL
    { id: 98, style: 'ornamental', image: '/portfolio/ornamental/IMG_0477.png', alt: 'Ornamental tattoo with intricate geometric patterns by Daniel Liberal Vancouver WA' },
    { id: 100, style: 'ornamental', image: '/portfolio/ornamental/IMG_0723.png', alt: 'Custom ornamental tattoo with mandala elements LBRL Tattoo Studio Vancouver' },
    { id: 101, style: 'ornamental', image: '/portfolio/ornamental/IMG_0725.png', alt: 'Ornamental arm tattoo with detailed symmetrical patterns Vancouver WA' },
    { id: 102, style: 'ornamental', image: '/portfolio/ornamental/IMG_0726.png', alt: 'Custom ornamental piece with fine line geometric design by Daniel Liberal' },
    { id: 103, style: 'ornamental', image: '/portfolio/ornamental/IMG_0727.png', alt: 'Ornamental tattoo flowing with body anatomy Body Harmony approach LBRL' },
    { id: 104, style: 'ornamental', image: '/portfolio/ornamental/IMG_0730.png', alt: 'Detailed ornamental tattoo with sacred geometry elements Vancouver WA' },
    { id: 105, style: 'ornamental', image: '/portfolio/ornamental/IMG_0731.png', alt: 'Custom ornamental forearm tattoo by award winning artist Daniel Liberal' },
    { id: 106, style: 'ornamental', image: '/portfolio/ornamental/IMG_0733.png', alt: 'Ornamental tattoo with intricate dot work and patterns LBRL Studio' },
    { id: 107, style: 'ornamental', image: '/portfolio/ornamental/IMG_0735.webp', alt: 'Ornamental leg tattoo with flowing geometric composition Vancouver WA' },
    { id: 108, style: 'ornamental', image: '/portfolio/ornamental/IMG_1230.jpeg', alt: 'Custom ornamental tattoo with mandala and fine line detail by Daniel Liberal' },
    { id: 109, style: 'ornamental', image: '/portfolio/ornamental/IMG_1232.png', alt: 'Ornamental arm piece with symmetrical patterns Vancouver Washington tattoo' },
    { id: 110, style: 'ornamental', image: '/portfolio/ornamental/IMG_1775.jpeg', alt: 'Detailed ornamental tattoo design flowing with natural anatomy LBRL Studio' },
    { id: 111, style: 'ornamental', image: '/portfolio/ornamental/IMG_2580.png', alt: 'Custom ornamental tattoo with sacred geometry by Daniel Liberal Vancouver' },
    { id: 112, style: 'ornamental', image: '/portfolio/ornamental/IMG_2584.webp', alt: 'Ornamental tattoo with intricate fine line patterns Vancouver WA tattoo shop' },
    { id: 113, style: 'ornamental', image: '/portfolio/ornamental/IMG_2610.jpeg', alt: 'Custom ornamental piece with detailed geometric elements by LBRL Studio' },
    { id: 114, style: 'ornamental', image: '/portfolio/ornamental/IMG_2616.webp', alt: 'Ornamental arm tattoo with mandala and dot work Vancouver WA artist' },
    { id: 115, style: 'ornamental', image: '/portfolio/ornamental/IMG_2618.jpeg', alt: 'Detailed ornamental tattoo with Body Harmony anatomical flow design' },
    { id: 116, style: 'ornamental', image: '/portfolio/ornamental/IMG_9366.png', alt: 'Custom ornamental tattoo with fine geometric patterns by Daniel Liberal' },
    { id: 117, style: 'ornamental', image: '/portfolio/ornamental/IMG_9367.jpeg', alt: 'Ornamental forearm tattoo with intricate symmetry LBRL Tattoo Studio' },
    { id: 118, style: 'ornamental', image: '/portfolio/ornamental/IMG_9382.jpeg', alt: 'Ornamental tattoo with sacred geometry and organic flow Vancouver WA' },
    { id: 119, style: 'ornamental', image: '/portfolio/ornamental/IMG_9389.png', alt: 'Custom ornamental piece with detailed patterns by award winning artist' },
    { id: 120, style: 'ornamental', image: '/portfolio/ornamental/IMG_9390.webp', alt: 'Ornamental tattoo design flowing with body anatomy Vancouver Washington' },
    { id: 121, style: 'ornamental', image: '/portfolio/ornamental/IMG_9393.jpeg', alt: 'Detailed ornamental arm tattoo with mandala elements by Daniel Liberal' },
    { id: 123, style: 'ornamental', image: '/portfolio/ornamental/IMG_9420.png', alt: 'Custom ornamental tattoo with fine line geometric work LBRL Studio' },
    { id: 124, style: 'ornamental', image: '/portfolio/ornamental/IMG_9422.png', alt: 'Ornamental tattoo with intricate symmetrical patterns Vancouver WA' },
    { id: 125, style: 'ornamental', image: '/portfolio/ornamental/IMG_9423.jpeg', alt: 'Ornamental piece with sacred geometry and dot work by Daniel Liberal' },
    { id: 126, style: 'ornamental', image: '/portfolio/ornamental/IMG_9424.jpeg', alt: 'Custom ornamental tattoo designed for natural body flow LBRL Studio' },
    { id: 127, style: 'ornamental', image: '/portfolio/ornamental/IMG_9425.webp', alt: 'Detailed ornamental forearm tattoo by award winning Vancouver WA artist' },
    { id: 128, style: 'ornamental', image: '/portfolio/ornamental/IMG_9754.jpeg', alt: 'Ornamental tattoo with mandala and geometric composition Vancouver' },
    { id: 129, style: 'ornamental', image: '/portfolio/ornamental/IMG_9755.jpeg', alt: 'Custom ornamental arm tattoo with fine patterns by Daniel Liberal' },
    { id: 130, style: 'ornamental', image: '/portfolio/ornamental/IMG_9756.png', alt: 'Ornamental tattoo with intricate detail and Body Harmony flow LBRL' },
    { id: 131, style: 'ornamental', image: '/portfolio/ornamental/IMG_9758.webp', alt: 'Detailed ornamental tattoo piece with sacred geometry Vancouver WA tattoo shop' },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
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

  const TattoodoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v4h-6v12h-4V8H4V4z"/>
    </svg>
  )

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

      {/* ========== TATTOODO EMBED MODAL ========== */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)', zIndex: 3000,
          display: tattoodoModalOpen ? 'flex' : 'none',
          alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}
        onClick={() => setTattoodoModalOpen(false)}
      >
        <div
          style={{
            background: colors.bgCard, borderRadius: '16px', width: '100%',
            maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden',
            position: 'relative', border: `1px solid ${colors.borderDefault}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 24px', borderBottom: `1px solid ${colors.borderSubtle}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <TattoodoIcon />
              <span style={{ fontSize: '16px', fontWeight: '500', color: colors.textPrimary }}>Book via Tattoodo</span>
            </div>
            <button
              onClick={() => setTattoodoModalOpen(false)}
              style={{ background: 'none', border: 'none', color: colors.textSecondary, fontSize: '28px', cursor: 'pointer', lineHeight: 1, padding: '0', transition: 'color 0.3s' }}
              onMouseOver={(e) => e.target.style.color = colors.textPrimary}
              onMouseOut={(e) => e.target.style.color = colors.textSecondary}
            >×</button>
          </div>
          <div style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>
            <div className="ta2do-booking-form" data-user="Dani_lbrl" style={{ minHeight: '400px' }} />
            <div style={{ marginTop: '20px', textAlign: 'center', padding: '16px', background: colors.bgElevated, borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '12px' }}>Having trouble? Book directly on Tattoodo:</p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: colors.accentCyan, color: colors.bgDark, borderRadius: '6px',
                fontSize: '12px', fontWeight: '600', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px',
              }}><TattoodoIcon /> Open Tattoodo</a>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          ★ PREMIUM LOADING — Maximum Sacred Geometry ★
          ================================================================ */}
      {isLoading && (
        <div className={`loader-screen ${loadingPhase >= 3 ? 'loader-exit' : ''}`} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: colors.bgDark, zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          
          {/* ===== FLOATING INK PARTICLES ===== */}
          {particles.map((p) => (
            <div key={p.id} className="ink-particle" style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: colors.accentCyan,
              opacity: 0,
              animation: `inkFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
              '--drift': `${p.drift}px`,
              '--op': p.opacity,
              pointerEvents: 'none',
            }} />
          ))}

          {/* ===== SOFT VIGNETTE — frosted depth ===== */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            backdropFilter: 'blur(0.5px)',
            WebkitBackdropFilter: 'blur(0.5px)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* ===== SACRED GEOMETRY — MAXIMUM PRESENCE ===== */}
          <svg className="sacred-geo" style={{
            position: 'absolute', width: '100%', height: '100%',
            opacity: loadingPhase >= 3 ? 0 : 1,
            transition: 'opacity 1.2s ease',
            zIndex: 2,
            mixBlendMode: 'screen',
            willChange: 'opacity',
          }} viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sacredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.accentCyan} />
                <stop offset="50%" stopColor={colors.accentTeal} />
                <stop offset="100%" stopColor={colors.accentCyan} />
              </linearGradient>
              <linearGradient id="sacredGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.accentTeal} />
                <stop offset="100%" stopColor={colors.accentCyan} />
              </linearGradient>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors.accentCyan} stopOpacity="0.2" />
                <stop offset="50%" stopColor={colors.accentCyan} stopOpacity="0.06" />
                <stop offset="100%" stopColor={colors.accentCyan} stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow"><feGaussianBlur stdDeviation="1.2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="strongGlow"><feGaussianBlur stdDeviation="3.5"/><feMerge><feMergeNode/><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="medGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* Deep breathing glow */}
            <circle cx="250" cy="250" r="200" fill="url(#centerGlow)" className="breath-glow" />

            {/* ===== FIBONACCI CIRCLES — Bold, 7 rings — slower draw ===== */}
            {[21, 34, 55, 89, 144, 195, 233].map((r, i) => (
              <circle key={r} cx="250" cy="250" r={r}
                stroke="url(#sacredGrad)" strokeWidth={0.8 + i * 0.15} fill="none"
                filter="url(#softGlow)"
                className={`geo-draw-bold`}
                style={{
                  strokeDasharray: Math.PI * 2 * r,
                  strokeDashoffset: Math.PI * 2 * r,
                  animationDuration: `${1.2 + i * 0.15}s`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}

            {/* ===== GOLDEN SPIRALS — dual, prominent ===== */}
            <path d="M250,250 Q250,175 325,175 Q400,175 400,250 Q400,360 285,360 Q160,360 160,225 Q160,80 315,80"
              stroke="url(#sacredGrad)" strokeWidth="1.5" fill="none" filter="url(#medGlow)"
              className="geo-draw-bold" style={{ strokeDasharray: 900, strokeDashoffset: 900, animationDuration: '2.8s', animationDelay: '0.15s' }} />
            <path d="M250,250 Q250,325 175,325 Q100,325 100,250 Q100,140 215,140 Q340,140 340,275 Q340,420 185,420"
              stroke="url(#sacredGrad2)" strokeWidth="1" fill="none" filter="url(#softGlow)"
              className="geo-draw-medium" style={{ strokeDasharray: 950, strokeDashoffset: 950, animationDuration: '3s', animationDelay: '0.3s' }} />

            {/* ===== FLOWER OF LIFE — Full 3 rings ===== */}
            {/* Center circle */}
            <circle cx="250" cy="250" r="35" stroke="url(#sacredGrad)" strokeWidth="1" fill="none" filter="url(#softGlow)"
              className="geo-draw-bold" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDuration: '0.9s', animationDelay: '0.3s' }} />
            {/* Ring 1 — inner 6 */}
            {[[250,215],[280,232],[280,268],[250,285],[220,268],[220,232]].map(([cx,cy], i) => (
              <circle key={`fl1-${i}`} cx={cx} cy={cy} r={35}
                stroke="url(#sacredGrad)" strokeWidth="0.9" fill="none" filter="url(#softGlow)"
                className="geo-draw-bold" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDuration: '0.9s', animationDelay: `${0.4 + i * 0.08}s` }} />
            ))}
            {/* Ring 2 — outer 6 */}
            {[[250,180],[295,197],[295,303],[250,320],[205,303],[205,197]].map(([cx,cy], i) => (
              <circle key={`fl2-${i}`} cx={cx} cy={cy} r={35}
                stroke="url(#sacredGrad)" strokeWidth="0.7" fill="none"
                className="geo-draw-medium" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDuration: '0.8s', animationDelay: `${0.7 + i * 0.08}s` }} />
            ))}
            {/* Ring 3 — outermost 18 */}
            {[
              [250,145],[271,155],[290,170],[303,190],[310,215],[310,285],
              [303,310],[290,330],[271,345],[250,355],[229,345],[210,330],
              [197,310],[190,285],[190,215],[197,190],[210,170],[229,155],
            ].map(([cx,cy], i) => (
              <circle key={`fl3-${i}`} cx={cx} cy={cy} r={35}
                stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none"
                className="geo-draw-subtle" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDuration: '0.7s', animationDelay: `${0.95 + i * 0.04}s` }} />
            ))}

            {/* ===== METATRON'S CUBE — ALL connections ===== */}
            {metatronLines.map((line, i) => (
              <line key={`met-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke="url(#sacredGrad)" strokeWidth={line.d < 50 ? "0.5" : line.d < 90 ? "0.35" : "0.25"}
                className="geo-draw-medium" style={{
                  strokeDasharray: line.d, strokeDashoffset: line.d,
                  animationDuration: `${0.6 + line.d * 0.005}s`,
                  animationDelay: `${0.8 + i * 0.02}s`,
                }} />
            ))}

            {/* ===== INTERSECTION DOTS — glowing nodes ===== */}
            {metatronCenters.map(([cx, cy], i) => (
              <circle key={`nd-${i}`} cx={cx} cy={cy} r="2.5" fill={colors.accentCyan} filter="url(#softGlow)"
                className="geo-dot" style={{ animationDelay: `${1.0 + i * 0.06}s` }} />
            ))}

            {/* ===== HEXAGONS — 3 nested + rotated Star of David ===== */}
            <path d={hexPath(250, 250, 70)} stroke="url(#sacredGrad)" strokeWidth="0.9" fill="none" filter="url(#softGlow)"
              className="geo-draw-bold" style={{ strokeDasharray: 420, strokeDashoffset: 420, animationDuration: '1.3s', animationDelay: '0.5s' }} />
            <path d={hexPath(250, 250, 115)} stroke="url(#sacredGrad)" strokeWidth="0.7" fill="none" filter="url(#softGlow)"
              className="geo-draw-medium" style={{ strokeDasharray: 700, strokeDashoffset: 700, animationDuration: '1.5s', animationDelay: '0.6s' }} />
            <path d={hexPath(250, 250, 170)} stroke="url(#sacredGrad)" strokeWidth="0.5" fill="none"
              className="geo-draw-medium" style={{ strokeDasharray: 1020, strokeDashoffset: 1020, animationDuration: '1.8s', animationDelay: '0.7s' }} />
            {/* Rotated = Star of David */}
            <path d={hexPath(250, 250, 70)} stroke="url(#sacredGrad2)" strokeWidth="0.6" fill="none"
              className="geo-draw-medium" style={{ transformOrigin: '250px 250px', transform: 'rotate(30deg)', strokeDasharray: 420, strokeDashoffset: 420, animationDuration: '1.3s', animationDelay: '0.75s' }} />
            <path d={hexPath(250, 250, 115)} stroke="url(#sacredGrad2)" strokeWidth="0.45" fill="none"
              className="geo-draw-subtle" style={{ transformOrigin: '250px 250px', transform: 'rotate(30deg)', strokeDasharray: 700, strokeDashoffset: 700, animationDuration: '1.5s', animationDelay: '0.85s' }} />

            {/* ===== VESICA PISCIS ===== */}
            <circle cx="225" cy="250" r="55" stroke="url(#sacredGrad)" strokeWidth="0.7" fill="none" filter="url(#softGlow)"
              className="geo-draw-medium" style={{ strokeDasharray: 346, strokeDashoffset: 346, animationDuration: '1.1s', animationDelay: '0.55s' }} />
            <circle cx="275" cy="250" r="55" stroke="url(#sacredGrad)" strokeWidth="0.7" fill="none" filter="url(#softGlow)"
              className="geo-draw-medium" style={{ strokeDasharray: 346, strokeDashoffset: 346, animationDuration: '1.1s', animationDelay: '0.65s' }} />

            {/* ===== ORGANIC FLOWING CURVES ===== */}
            <path d="M130,80 Q185,135 165,200 Q145,265 190,300 Q235,335 190,385" stroke="url(#sacredGrad)" strokeWidth="0.8" fill="none"
              className="geo-draw-medium" style={{ strokeDasharray: 450, strokeDashoffset: 450, animationDuration: '2s', animationDelay: '0.35s' }} />
            <path d="M370,80 Q315,135 335,200 Q355,265 310,300 Q265,335 310,385" stroke="url(#sacredGrad)" strokeWidth="0.8" fill="none"
              className="geo-draw-medium" style={{ strokeDasharray: 450, strokeDashoffset: 450, animationDuration: '2s', animationDelay: '0.5s' }} />
            <path d="M70,250 Q160,205 250,250 Q340,295 430,250" stroke="url(#sacredGrad)" strokeWidth="0.6" fill="none"
              className="geo-draw-medium" style={{ strokeDasharray: 400, strokeDashoffset: 400, animationDuration: '1.8s', animationDelay: '0.7s' }} />
            <path d="M70,200 Q160,240 250,200 Q340,160 430,200" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none"
              className="geo-draw-subtle" style={{ strokeDasharray: 400, strokeDashoffset: 400, animationDuration: '1.8s', animationDelay: '0.9s' }} />
            <path d="M70,300 Q160,260 250,300 Q340,340 430,300" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none"
              className="geo-draw-subtle" style={{ strokeDasharray: 400, strokeDashoffset: 400, animationDuration: '1.8s', animationDelay: '1s' }} />

            {/* ===== SPINNING RINGS — triple ===== */}
            <circle cx="250" cy="250" r="225" stroke="url(#sacredGrad)" strokeWidth="0.4" fill="none"
              strokeDasharray="6 8" className="spin-ring" />
            <circle cx="250" cy="250" r="235" stroke="url(#sacredGrad)" strokeWidth="0.25" fill="none"
              strokeDasharray="2 14" className="spin-ring-inner" />
            <circle cx="250" cy="250" r="243" stroke="url(#sacredGrad)" strokeWidth="0.15" fill="none"
              strokeDasharray="1 20" className="spin-ring-slow" />

            {/* ===== NEEDLE TRACERS — slower, more dramatic ===== */}
            <circle r="3.5" fill={colors.accentCyan} filter="url(#strongGlow)" className="needle-dot" style={{ animationDelay: '0.1s', animationDuration: '2s' }}>
              <animateMotion dur="2s" begin="0.1s" fill="freeze"><mpath href="#needlePath1" /></animateMotion>
            </circle>
            <circle r="4.5" fill={colors.accentCyan} filter="url(#strongGlow)" className="needle-dot" style={{ animationDelay: '0.2s', animationDuration: '2.8s' }}>
              <animateMotion dur="2.8s" begin="0.2s" fill="freeze"><mpath href="#needlePath2" /></animateMotion>
            </circle>
            <circle r="3" fill={colors.accentCyan} filter="url(#strongGlow)" className="needle-dot" style={{ animationDelay: '0.5s', animationDuration: '1.6s' }}>
              <animateMotion dur="1.6s" begin="0.5s" fill="freeze"><mpath href="#needlePath3" /></animateMotion>
            </circle>
            <path id="needlePath1" d="M339,250 A89,89 0 1,1 338.99,250" fill="none" stroke="none" />
            <path id="needlePath2" d="M445,250 A195,195 0 1,1 444.99,250" fill="none" stroke="none" />
            <path id="needlePath3" d="M305,250 A55,55 0 1,1 304.99,250" fill="none" stroke="none" />

            {/* ===== LIVING GEOMETRY — starts later, pulses through the hold ===== */}
            <circle cx="250" cy="250" r="55" stroke={colors.accentCyan} strokeWidth="0.5" fill="none" className="geo-alive geo-alive-1" />
            <circle cx="250" cy="250" r="89" stroke={colors.accentCyan} strokeWidth="0.5" fill="none" className="geo-alive geo-alive-2" />
            <circle cx="250" cy="250" r="144" stroke={colors.accentCyan} strokeWidth="0.4" fill="none" className="geo-alive geo-alive-3" />
            <path d={hexPath(250, 250, 70)} stroke={colors.accentCyan} strokeWidth="0.4" fill="none" className="geo-alive geo-alive-4" />
            <path d={hexPath(250, 250, 115)} stroke={colors.accentCyan} strokeWidth="0.3" fill="none" className="geo-alive geo-alive-5" />
            <circle cx="250" cy="250" r="195" stroke={colors.accentCyan} strokeWidth="0.3" fill="none" className="geo-alive geo-alive-6" />
          </svg>

          {/* ===== CENTRAL CONTENT ===== */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Logo Container with Morphing Ring */}
            <div className="logo-area" style={{
              position: 'relative', width: '140px', height: '140px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Outer ring — draws itself */}
              <svg className="logo-ring-svg" style={{
                position: 'absolute', width: '140px', height: '140px',
              }} viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="66" stroke={colors.accentCyan} strokeWidth="0.8" fill="none" filter="url(#softGlow)"
                  style={{
                    strokeDasharray: 415, strokeDashoffset: loadingPhase >= 1 ? 0 : 415,
                    opacity: loadingPhase >= 1 ? 0.7 : 0,
                    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                  }} />
                <circle cx="70" cy="70" r="63" stroke={colors.accentCyan} strokeWidth="0.25" fill="none"
                  strokeDasharray="2 9" className="logo-ring-dots"
                  style={{ opacity: loadingPhase >= 1 ? 0.3 : 0, transition: 'opacity 0.5s ease 0.3s' }} />
              </svg>

              {/* Orbiting micro-dots */}
              <div className={`orbit-system ${loadingPhase >= 1 ? 'orbit-active' : ''}`}>
                <div className="orbit-dot orbit-dot-1" />
                <div className="orbit-dot orbit-dot-2" />
                <div className="orbit-dot orbit-dot-3" />
              </div>

              {/* Logo — ink reveal */}
              <div className={`logo-ink-reveal ${loadingPhase >= 1 ? 'logo-materialized' : ''}`} style={{
                width: '88px', height: '88px', borderRadius: '50%',
                overflow: 'hidden', position: 'relative', zIndex: 2,
              }}>
                <img src="/Tribal Logo.jpg" alt="LBRL" style={{ 
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              </div>
            </div>

            {/* Brand Text */}
            <div className={`brand-text ${loadingPhase >= 2 ? 'brand-visible' : ''}`} style={{ marginTop: '28px' }}>
              <div className="brand-letters" style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                {'LBRL'.split('').map((letter, i) => (
                  <span key={i} className={`brand-letter bl-${i}`} style={{
                    fontSize: '28px', fontWeight: '200', letterSpacing: '10px',
                    color: colors.textPrimary, display: 'inline-block',
                  }}>{letter}</span>
                ))}
              </div>
              <div className="brand-divider" style={{
                width: '0px', height: '1px', margin: '12px auto 0',
                background: `linear-gradient(90deg, transparent, ${colors.accentCyan}, transparent)`,
              }} />
              <p className="brand-subtitle" style={{
                fontSize: '9px', fontWeight: '500', letterSpacing: '4px',
                textTransform: 'uppercase', color: colors.accentCyan,
                marginTop: '10px', textAlign: 'center', opacity: 0,
              }}>Tattoo Studio • Vancouver, WA</p>
            </div>
          </div>

          {/* ===== PROGRESS INDICATOR ===== */}
          <div style={{
            position: 'absolute', bottom: '45px', left: '50%',
            transform: 'translateX(-50%)', zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '80px', height: '1px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '1px', overflow: 'hidden',
              position: 'relative',
            }}>
              <div className="progress-needle" style={{
                height: '100%', borderRadius: '1px',
                background: `linear-gradient(90deg, ${colors.accentTeal}, ${colors.accentCyan})`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', right: '-2px', top: '-2px',
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: colors.accentCyan,
                  boxShadow: `0 0 6px ${colors.accentCyan}, 0 0 12px ${colors.accentCyan}66`,
                }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '12px 24px' : '20px 24px',
        background: scrolled ? `${colors.bgDark}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.borderSubtle}` : 'none',
        transition: 'all 0.3s ease',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: isLoading ? 0 : 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL Tattoo Studio Vancouver WA" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '20px', fontWeight: '300', letterSpacing: '4px', color: colors.textPrimary }}>LBRL</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <button onClick={() => setTattoodoModalOpen(true)} aria-label="Book via Tattoodo" style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', padding: '4px' }} onMouseOver={(e) => e.currentTarget.style.color = colors.accentCyan} onMouseOut={(e) => e.currentTarget.style.color = colors.textSecondary}><TattoodoIcon /></button>
          {['Portfolio', 'About', 'Process', 'Pricing', 'FAQs', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = colors.accentCyan} onMouseOut={(e) => e.target.style.color = colors.textSecondary}>{item}</a>
          ))}
          <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${colors.accentCyan}`, borderRadius: '6px', color: colors.accentCyan, fontSize: '11px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.target.style.background = colors.accentCyan; e.target.style.color = colors.bgDark }} onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = colors.accentCyan }}>Release Form</a>
          <button onClick={() => setTattoodoModalOpen(true)} style={{ padding: '10px 20px', background: colors.textPrimary, borderRadius: '6px', color: colors.bgDark, fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Book Now</button>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textPrimary} strokeWidth="2">{mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}</svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0, background: colors.bgDark, zIndex: 999, display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: '24px' }}>
          <button onClick={() => { setMobileMenuOpen(false); setTattoodoModalOpen(true) }} style={{ background: 'none', border: 'none', color: colors.textPrimary, fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '0', textAlign: 'left' }}><TattoodoIcon /><span>Book on Tattoodo</span></button>
          {['Portfolio', 'About', 'Process', 'Pricing', 'FAQs', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase' }}>{item}</a>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} style={{ padding: '14px 24px', background: 'transparent', border: `1px solid ${colors.accentCyan}`, borderRadius: '6px', color: colors.accentCyan, fontSize: '13px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>Release Form</a>
            <button onClick={() => { setMobileMenuOpen(false); setTattoodoModalOpen(true) }} style={{ padding: '14px 24px', background: colors.accentCyan, borderRadius: '6px', color: colors.bgDark, fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', textAlign: 'center' }}>Book Now</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 20px 80px', background: `linear-gradient(180deg, rgba(61,74,66,0.9) 0%, rgba(26,31,28,0.95) 100%), url('/IMG_4330.WEBP')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="aurora-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="aurora-flash aurora-1" />
          <div className="aurora-flash aurora-2" />
          <div className="aurora-flash aurora-3" />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.06, pointerEvents: 'none' }}>
          <img src="/Tribal Logo.jpg" alt="" style={{ width: '500px', height: '500px', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: colors.bgCard, borderRadius: '20px', marginBottom: '32px', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(20px)' : 'translateY(0)', transition: 'all 0.6s ease 0.3s' }}>
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>📍 Vancouver, WA</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>•</span>
          <span style={{ fontSize: '12px', color: colors.accentCyan }}>Award Winner: NYC 2016 & Portland 2024</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '300', letterSpacing: '-1px', marginBottom: '24px', lineHeight: '1.1', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.5s' }}>
          Art That<br /><span style={{ color: colors.accentCyan }}>Becomes You</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: colors.textSecondary, maxWidth: '600px', lineHeight: '1.7', marginBottom: '40px', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.7s' }}>
          Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.9s' }}>
          <button onClick={() => setTattoodoModalOpen(true)} style={{ padding: '16px 32px', background: colors.accentCyan, color: colors.bgDark, borderRadius: '8px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Start Your Journey</button>
          <a href="#portfolio" style={{ padding: '16px 32px', background: 'transparent', border: `1px solid ${colors.borderDefault}`, color: colors.textPrimary, borderRadius: '8px', fontSize: '13px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease' }}>View Portfolio</a>
        </div>
        <div style={{ width: '100%', maxWidth: '1200px', marginTop: '60px', padding: '0 40px' }}>
          <img src="/IMG_4885.png" alt="Decorative floral element" className="wind-blow-image" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '40px 20px', background: colors.bgPrimary, borderTop: `1px solid ${colors.borderSubtle}`, borderBottom: `1px solid ${colors.borderSubtle}` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '32px', fontWeight: '300', color: colors.accentCyan, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgDark, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className={visibleSections['about'] ? 'animate-fadeInLeft' : 'animate-hidden'}>
              <img src="/Dany 3.PNG" alt="Daniel Liberal tattooing a client at LBRL Tattoo Studio Vancouver WA" style={{ width: '100%', borderRadius: '16px', marginBottom: '30px', objectFit: 'cover' }} />
              <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Body Harmony</p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', marginBottom: '24px', lineHeight: '1.3' }}>Every Design Flows<br />With Your Anatomy</h2>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px' }}>Tattooing, for me, starts with understanding how the body carries a design. I think about flow, movement, and how a tattoo lives on the skin over time.</p>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px' }}>With over 12 years of experience and recognition from tattoo conventions in New York and Portland, my approach stays the same: one-on-one collaboration and fully custom work.</p>
              <p style={{ fontSize: '14px', color: colors.textMuted, fontStyle: 'italic' }}>From Puerto Rico 2013 est. to Vancouver, WA 2016-Present</p>
            </div>
            <div className={visibleSections['about'] ? 'animate-fadeInRight animate-delay-2' : 'animate-hidden'} style={{ background: `linear-gradient(180deg, rgba(42,50,45,0.95) 0%, rgba(42,50,45,0.98) 100%), url('/about-bg.webp')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', padding: '40px 32px', border: `1px solid ${colors.borderDefault}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <img src="/Dani1.png" alt="Daniel Liberal headshot - Lead Artist and Owner LBRL Tattoo Studio" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Daniel Liberal</h3>
                  <p style={{ fontSize: '13px', color: colors.textMuted }}>Lead Artist & Owner</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderSubtle}` }}><span style={{ fontSize: '13px', color: colors.textMuted }}>Experience</span><span style={{ fontSize: '13px', color: colors.textPrimary }}>12+ Years</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderSubtle}`, flexWrap: 'wrap', gap: '4px' }}><span style={{ fontSize: '13px', color: colors.textMuted }}>Specialties</span><span style={{ fontSize: '13px', color: colors.textPrimary, textAlign: 'right' }}>Neo Japanese, Blackwork,<br />Ornamental, Floral</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}><span style={{ fontSize: '13px', color: colors.textMuted }}>Recognition</span><span style={{ fontSize: '13px', color: colors.accentCyan }}>NYC 2016 & Portland 2024</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgPrimary, position: 'relative', overflow: 'hidden', maxWidth: '100vw' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className={visibleSections['portfolio'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Portfolio</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', marginBottom: '32px' }}>Custom Tattoo Work</h2>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {styleFilters.map((style) => (
                <button key={style.value} onClick={() => setActiveStyle(style.value)} style={{ padding: '10px 20px', background: activeStyle === style.value ? colors.accentCyan : colors.bgCard, color: activeStyle === style.value ? colors.bgDark : colors.textSecondary, border: 'none', borderRadius: '20px', fontSize: '12px', fontWeight: '500', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s ease' }}>{style.label}</button>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))} disabled={sliderIndex === 0} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: colors.bgCard, border: `1px solid ${colors.borderDefault}`, color: sliderIndex === 0 ? colors.textMuted : colors.textPrimary, cursor: sliderIndex === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10, transition: 'all 0.3s ease' }}>←</button>
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', transform: `translate3d(-${sliderIndex * (280 + 16)}px, 0, 0)`, transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', willChange: 'transform' }}>
                {filteredPortfolio.map((item, index) => (
                  <div key={item.id} onClick={() => openLightbox(index)} style={{ minWidth: '280px', height: '350px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                    <img src={item.image} alt={item.alt || 'Custom tattoo by Daniel Liberal - LBRL Tattoo Studio Vancouver WA'} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setSliderIndex(Math.min(maxSliderIndex, sliderIndex + 1))} disabled={sliderIndex >= maxSliderIndex} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: colors.bgCard, border: `1px solid ${colors.borderDefault}`, color: sliderIndex >= maxSliderIndex ? colors.textMuted : colors.textPrimary, cursor: sliderIndex >= maxSliderIndex ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10, transition: 'all 0.3s ease' }}>→</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}><span style={{ fontSize: '13px', color: colors.textMuted }}>{sliderIndex + 1}-{Math.min(sliderIndex + visibleCount, filteredPortfolio.length)} of {filteredPortfolio.length} pieces</span></div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgDark }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className={visibleSections['process'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>The Process</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300' }}>From Vision to Reality</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {processSteps.map((step, i) => (
              <div key={i} className={visibleSections['process'] ? `animate-fadeInUp animate-delay-${i + 1}` : 'animate-hidden'} style={{ background: colors.bgCard, borderRadius: '16px', padding: '32px 24px', border: `1px solid ${colors.borderDefault}`, textAlign: 'center', transition: 'all 0.3s ease' }}>
                <div style={{ fontSize: '32px', fontWeight: '200', color: colors.accentCyan, marginBottom: '16px' }}>{step.number}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgPrimary, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className={visibleSections['pricing'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Pricing & Booking</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', color: colors.textPrimary, marginBottom: '20px' }}>Investment in Your Art</h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>Every project is different. Pricing depends on size, detail, and time. Here's a general breakdown.</p>
          </div>
          <div className={visibleSections['pricing'] ? 'animate-fadeInUp animate-delay-2' : 'animate-hidden'} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: colors.bgCard, borderRadius: '16px', padding: '32px', border: `1px solid ${colors.borderDefault}` }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: colors.accentCyan, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Large-Scale Work</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: colors.textPrimary, marginBottom: '8px' }}>$260<span style={{ fontSize: '16px', color: colors.textMuted }}>/hour</span></div>
              <div style={{ fontSize: '14px', color: colors.accentCyan, marginBottom: '20px' }}>$300 deposit to book</div>
              <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>Half sleeves, full sleeves, back pieces, leg pieces. Your deposit goes toward the final session and includes a revision appointment where I present up to three design directions. Large projects get priority scheduling.</p>
            </div>
            <div style={{ background: colors.bgCard, borderRadius: '16px', padding: '32px', border: `1px solid ${colors.borderDefault}` }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: colors.accentCyan, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Medium Work</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: colors.textPrimary, marginBottom: '8px' }}>$500 to $750</div>
              <div style={{ fontSize: '14px', color: colors.accentCyan, marginBottom: '20px' }}>$250 deposit to book</div>
              <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>Flat rate depending on detail. Design is prepared and reviewed the day of your session.</p>
            </div>
            <div style={{ background: colors.bgCard, borderRadius: '16px', padding: '32px', border: `1px solid ${colors.borderDefault}` }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: colors.accentCyan, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Small Work</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: colors.textPrimary, marginBottom: '8px' }}>$150 to $350</div>
              <div style={{ fontSize: '14px', color: colors.accentCyan, marginBottom: '20px' }}>$50 to $100 deposit</div>
              <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>Names, symbols, simple designs. $150 minimum. Design reviewed day of session.</p>
            </div>
          </div>
          <div style={{ background: colors.bgElevated, borderRadius: '12px', padding: '24px 32px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.textPrimary, marginBottom: '12px' }}>Deposits & Cancellations</h3>
            <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', margin: 0 }}>All deposits are non-refundable. Cancellations or reschedules with less than 72 hours notice forfeit the deposit. Arrivals more than 30 minutes late without notice count as a no-show.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '20px' }}>Not sure where your project fits? I'll help you figure that out during the consultation.</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '16px 40px', background: colors.accentCyan, color: colors.bgDark, borderRadius: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>Book Consultation</a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgDark }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={visibleSections['reviews'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Reviews</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300' }}>What Clients Say</h2>
          </div>
          <div className={visibleSections['reviews'] ? 'animate-fadeInUp animate-delay-2' : 'animate-hidden'} style={{ background: colors.bgCard, borderRadius: '20px', padding: 'clamp(32px, 5vw, 48px)', border: `1px solid ${colors.borderDefault}`, textAlign: 'center', position: 'relative', minHeight: '220px' }}>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '24px' }}>{[...Array(5)].map((_, j) => (<span key={j} style={{ color: colors.accentOrange, fontSize: '20px' }}>★</span>))}</div>
            <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic', transition: 'opacity 0.5s ease' }}>"{reviews[currentReviewIndex].text}"</p>
            <p style={{ fontSize: '14px', fontWeight: '500', color: colors.accentCyan, marginBottom: '32px' }}>— {reviews[currentReviewIndex].name}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {reviews.map((_, i) => (<button key={i} onClick={() => setCurrentReviewIndex(i)} style={{ width: currentReviewIndex === i ? '24px' : '10px', height: '10px', borderRadius: '5px', background: currentReviewIndex === i ? colors.accentCyan : colors.bgElevated, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ color: colors.accentOrange, fontSize: '24px' }}>★</span>
            <span style={{ fontSize: '14px', color: colors.textSecondary }}><strong style={{ color: colors.textPrimary }}>5.0</strong> rating on Google</span>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgPrimary, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '60px', alignItems: 'start' }}>
            <div className={visibleSections['faqs'] ? 'animate-fadeInLeft' : 'animate-hidden'}>
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>FAQs</p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300' }}>Common Questions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ background: colors.bgCard, borderRadius: '12px', border: `1px solid ${colors.borderDefault}`, overflow: 'hidden' }}>
                    <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '500', color: colors.textPrimary, margin: 0, paddingRight: '16px' }}>{faq.q}</h3>
                      <span style={{ color: colors.accentCyan, fontSize: '20px', fontWeight: '300', transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                    </button>
                    <div style={{ maxHeight: expandedFaq === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', margin: 0, padding: '0 24px 20px 24px' }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={visibleSections['faqs'] ? 'animate-fadeInRight animate-delay-2' : 'animate-hidden'} style={{ position: 'sticky', top: '100px' }}>
              <img src="/Dani2.png" alt="Daniel Liberal tattoo artist at work - LBRL Tattoo Studio Vancouver WA" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', marginBottom: '20px' }} />
              <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}><source src="/_users_355de36e-0a13-42b0-a4f8-690006e9848c_generated_0760b186-f9b7-45de-b081-c173128c2802_generated_video.mp4" type="video/mp4" /></video>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: colors.bgDark, position: 'relative', overflow: 'hidden' }}>
        <div className={visibleSections['contact'] ? 'animate-fadeInUp' : 'animate-hidden'} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', marginBottom: '24px' }}>Ready to Start?</h2>
          <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.7', marginBottom: '32px' }}>Fill out the booking form to schedule your consultation. I'll review your idea and get back to you within 1-3 business days.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '16px 32px', background: colors.accentCyan, color: colors.bgDark, borderRadius: '8px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>Book Consultation</a>
            <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '16px 32px', background: 'transparent', border: `1px solid ${colors.accentCyan}`, color: colors.accentCyan, borderRadius: '8px', fontSize: '13px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>Release Form</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>📍 9013 NE Hwy 99, Vancouver, WA 98665</p>
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>✉️ Liberaltattoos@gmail.com</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setTattoodoModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.3s', padding: '0', fontSize: '14px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}><TattoodoIcon /><span>Tattoodo</span></button>
              <a href="https://instagram.com/danilbrl_tattoo" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span style={{ fontSize: '14px' }}>@danilbrl_tattoo</span>
              </a>
              <a href="https://facebook.com/lbrltattoos" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span style={{ fontSize: '14px' }}>Facebook</span>
              </a>
              <a href="https://share.google/vhS3WwTU20FQj2La2" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentCyan, textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span style={{ fontSize: '14px' }}>Google</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', background: colors.bgPrimary, borderTop: `1px solid ${colors.borderSubtle}`, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL Tattoo Studio" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '3px' }}>LBRL</span>
        </div>
        <p style={{ fontSize: '12px', color: colors.textMuted }}>© 2026 Daniel Liberal. All rights reserved.</p>
        <p style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px' }}>Appointment Only • Vancouver, WA</p>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '32px', cursor: 'pointer' }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length) }} style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '24px', padding: '16px', borderRadius: '50%', cursor: 'pointer' }}>←</button>
          <img src={filteredPortfolio[currentImage]?.image} alt={filteredPortfolio[currentImage]?.alt || 'Custom tattoo by Daniel Liberal - LBRL Tattoo Studio Vancouver WA'} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => (prev + 1) % filteredPortfolio.length) }} style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '24px', padding: '16px', borderRadius: '50%', cursor: 'pointer' }}>→</button>
          <div style={{ position: 'absolute', bottom: '20px', color: 'white', fontSize: '14px' }}>{currentImage + 1} / {filteredPortfolio.length}</div>
        </div>
      )}

      {/* ================================================================
          STYLES
          ================================================================ */}
      <style>{`
        /* === MODERN FOUNDATION === */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { 
          scroll-behavior: smooth; 
          overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        body { 
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          overscroll-behavior-y: none;
        }
        
        /* Modern scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bgDark}; }
        ::-webkit-scrollbar-thumb { background: ${colors.bgElevated}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.accentTeal}; }
        @supports (scrollbar-width: thin) {
          html { scrollbar-width: thin; scrollbar-color: ${colors.bgElevated} ${colors.bgDark}; }
        }

        /* Clean mobile interactions */
        a, button { 
          -webkit-tap-highlight-color: transparent; 
          touch-action: manipulation;
        }
        button { cursor: pointer; }
        img { 
          max-width: 100%; 
          height: auto; 
          display: block;
        }

        .ta2do-booking-form { width: 100%; min-height: 400px; }

        /* === CONTENT VISIBILITY — paint-on-demand for below-fold sections === */
        section[data-animate] {
          content-visibility: auto;
          contain-intrinsic-size: auto 600px;
        }

        /* ================================================================
           ★ Maximum Sacred Geometry — Loading Styles ★
           ================================================================ */
        
        /* === LOADER CONTAINER — GPU compositing layer === */
        .loader-screen {
          contain: strict;
          isolation: isolate;
          user-select: none;
          -webkit-user-select: none;
          overscroll-behavior: none;
          will-change: opacity, filter;
        }

        /* === SCREEN EXIT === */
        .loader-exit {
          animation: screenExit 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes screenExit {
          0% { opacity: 1; filter: blur(0px); }
          60% { opacity: 0.8; filter: blur(0px); }
          100% { opacity: 0; filter: blur(6px); }
        }

        /* === FLOATING INK PARTICLES — GPU accelerated === */
        .ink-particle {
          animation: inkFloat var(--duration, 4s) ease-in-out infinite;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes inkFloat {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.5); }
          15% { opacity: var(--op, 0.1); transform: translateY(-8px) translateX(calc(var(--drift, 0px) * 0.2)) scale(1); }
          85% { opacity: var(--op, 0.1); transform: translateY(-35px) translateX(var(--drift, 0px)) scale(0.7); }
          100% { opacity: 0; transform: translateY(-50px) translateX(calc(var(--drift, 0px) * 1.3)) scale(0.2); }
        }

        /* === BREATHING CENTER GLOW === */
        .breath-glow {
          animation: breathGlow 2.5s ease-in-out infinite;
        }
        @keyframes breathGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        /* === THREE TIERS OF GEOMETRY DRAW — all higher opacity === */
        .geo-draw-bold {
          animation: drawBold 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes drawBold {
          0% { stroke-dashoffset: inherit; opacity: 0; }
          8% { opacity: 0.8; }
          40% { opacity: 0.6; }
          100% { stroke-dashoffset: 0; opacity: 0.45; }
        }
        .geo-draw-medium {
          animation: drawMedium 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes drawMedium {
          0% { stroke-dashoffset: inherit; opacity: 0; }
          8% { opacity: 0.6; }
          40% { opacity: 0.45; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        .geo-draw-subtle {
          animation: drawSubtle 1s ease-out forwards;
        }
        @keyframes drawSubtle {
          0% { stroke-dashoffset: inherit; opacity: 0; }
          8% { opacity: 0.4; }
          100% { stroke-dashoffset: 0; opacity: 0.18; }
        }

        /* === INTERSECTION DOTS — pop === */
        .geo-dot {
          opacity: 0;
          animation: dotPop 0.3s ease-out forwards;
        }
        @keyframes dotPop {
          0% { opacity: 0; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }

        /* === NEEDLE TRACERS === */
        .needle-dot {
          opacity: 0;
          animation: needleFade 1.5s ease-in-out forwards;
        }
        @keyframes needleFade {
          0% { opacity: 0; }
          8% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        /* === SPINNING RINGS === */
        /* === SPINNING RINGS — GPU composited === */
        .spin-ring {
          opacity: 0;
          transform-origin: 250px 250px;
          animation: ringFadeIn 0.8s ease 0.6s forwards, ringSpin 18s linear 0.6s infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .spin-ring-inner {
          opacity: 0;
          transform-origin: 250px 250px;
          animation: ringFadeIn 0.8s ease 0.9s forwards, ringSpinReverse 24s linear 0.9s infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .spin-ring-slow {
          opacity: 0;
          transform-origin: 250px 250px;
          animation: ringFadeIn 0.8s ease 1.2s forwards, ringSpin 35s linear 1.2s infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @keyframes ringFadeIn { from { opacity: 0; } to { opacity: 0.18; } }
        @keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ringSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        /* === LIVING GEOMETRY — breathes forever after drawing === */
        .geo-alive-1 { opacity: 0; animation: aliveIn 0.5s ease 1.8s forwards, alivePulse 2.8s ease-in-out 2.3s infinite; }
        .geo-alive-2 { opacity: 0; animation: aliveIn 0.5s ease 1.9s forwards, alivePulse 3.2s ease-in-out 2.4s infinite; }
        .geo-alive-3 { opacity: 0; animation: aliveIn 0.5s ease 2s forwards, alivePulse 3.6s ease-in-out 2.5s infinite; }
        .geo-alive-4 { opacity: 0; animation: aliveIn 0.5s ease 2.1s forwards, alivePulse 3s ease-in-out 2.6s infinite; }
        .geo-alive-5 { opacity: 0; animation: aliveIn 0.5s ease 2.2s forwards, alivePulse 3.4s ease-in-out 2.7s infinite; }
        .geo-alive-6 { opacity: 0; animation: aliveIn 0.5s ease 2.3s forwards, alivePulse 4s ease-in-out 2.8s infinite; }
        @keyframes aliveIn { from { opacity: 0; } to { opacity: 0.1; } }
        @keyframes alivePulse {
          0%, 100% { opacity: 0.08; stroke-width: 0.3; }
          50% { opacity: 0.22; stroke-width: 0.6; }
        }

        /* === LOGO RING === */
        /* === LOGO RING — GPU composited === */
        .logo-ring-dots {
          animation: logoRingRotate 8s linear infinite;
          transform-origin: 70px 70px;
          will-change: transform;
          backface-visibility: hidden;
        }
        @keyframes logoRingRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* === LOGO INK REVEAL === */
        /* === LOGO INK REVEAL — GPU composited === */
        .logo-ink-reveal {
          opacity: 0;
          transform: scale(0.5);
          filter: blur(10px) brightness(1.5);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 0 0 rgba(125, 212, 196, 0);
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .logo-ink-reveal.logo-materialized {
          opacity: 1;
          transform: scale(1);
          filter: blur(0px) brightness(1);
          box-shadow: 
            0 0 40px rgba(125, 212, 196, 0.15),
            0 0 80px rgba(125, 212, 196, 0.08);
        }

        /* === ORBITING MICRO-DOTS === */
        .orbit-system {
          position: absolute;
          width: 140px;
          height: 140px;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease 0.3s;
        }
        .orbit-system.orbit-active { opacity: 1; }

        .orbit-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${colors.accentCyan};
          top: 50%;
          left: 50%;
          will-change: transform;
          backface-visibility: hidden;
        }
        .orbit-dot-1 {
          box-shadow: 0 0 6px ${colors.accentCyan};
          animation: orbit1 4.5s linear infinite;
        }
        .orbit-dot-2 {
          width: 2px; height: 2px;
          opacity: 0.5;
          box-shadow: 0 0 4px ${colors.accentCyan};
          animation: orbit2 6.5s linear infinite;
        }
        .orbit-dot-3 {
          width: 1.5px; height: 1.5px;
          opacity: 0.35;
          animation: orbit3 5.5s linear infinite;
        }

        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(68px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(68px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(120deg) translateX(65px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(65px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(240deg) translateX(72px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(72px) rotate(-600deg); }
        }

        /* === BRAND TEXT REVEAL === */
        /* === BRAND TEXT REVEAL — GPU composited === */
        .brand-text .brand-letter {
          opacity: 0;
          transform: translateY(20px) scale(0.85);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .brand-text.brand-visible .brand-letter {
          animation: letterPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .brand-visible .bl-0 { animation-delay: 0s; }
        .brand-visible .bl-1 { animation-delay: 0.07s; }
        .brand-visible .bl-2 { animation-delay: 0.14s; }
        .brand-visible .bl-3 { animation-delay: 0.21s; }

        @keyframes letterPop {
          0% { opacity: 0; transform: translateY(20px) scale(0.85); }
          60% { opacity: 1; transform: translateY(-3px) scale(1.02); }
          100% { opacity: 0.95; transform: translateY(0) scale(1); }
        }

        .brand-text.brand-visible .brand-divider {
          animation: dividerExpand 0.6s ease-out 0.25s forwards;
        }
        @keyframes dividerExpand {
          from { width: 0px; }
          to { width: 50px; }
        }

        .brand-text.brand-visible .brand-subtitle {
          animation: subtitleFade 0.4s ease-out 0.35s forwards;
        }
        @keyframes subtitleFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 0.5; transform: translateY(0); }
        }

        /* === PROGRESS NEEDLE === */
        .progress-needle {
          width: 0%;
          animation: needleProgress 4.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes needleProgress {
          0% { width: 0%; }
          15% { width: 18%; }
          35% { width: 40%; }
          55% { width: 60%; }
          75% { width: 78%; }
          90% { width: 92%; }
          100% { width: 100%; }
        }

        /* ================================================================
           ORIGINAL SITE ANIMATIONS (UNCHANGED)
           ================================================================ */
        
        @keyframes windBlow {
          0% { transform: translateX(-100px); clip-path: inset(0 100% 0 0); }
          50% { clip-path: inset(0 0 0 0); }
          70% { transform: translateX(15px); }
          85% { transform: translateX(-5px); }
          100% { transform: translateX(0); clip-path: inset(0 0 0 0); }
        }
        .wind-blow-image { animation: windBlow 1.5s ease-out forwards; animation-delay: 1s; clip-path: inset(0 100% 0 0); }

        @keyframes auroraFlash {
          0%, 80%, 100% { opacity: 0; transform: translateX(-100%) skewX(-15deg); }
          88% { opacity: 0.25; transform: translateX(0%) skewX(-15deg); }
          94% { opacity: 0.12; transform: translateX(100%) skewX(-15deg); }
        }
        .aurora-flash { position: absolute; width: 200%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(125,212,196,0.05) 15%, rgba(125,212,196,0.15) 35%, rgba(90,138,138,0.2) 50%, rgba(125,212,196,0.15) 65%, rgba(125,212,196,0.05) 85%, transparent 100%); pointer-events: none; }
        .aurora-1 { top: 0; left: -100%; animation: auroraFlash 10s ease-in-out infinite; }
        .aurora-2 { top: 25%; left: -100%; animation: auroraFlash 13s ease-in-out infinite; animation-delay: 3s; }
        .aurora-3 { top: 55%; left: -100%; animation: auroraFlash 16s ease-in-out infinite; animation-delay: 7s; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-hidden { opacity: 0; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease forwards; }
        .animate-fadeInScale { animation: fadeInScale 0.8s ease forwards; }
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
        .animate-delay-4 { animation-delay: 0.4s; }
        .animate-delay-5 { animation-delay: 0.5s; }

        /* ================================================================
           MOBILE-FIRST RESPONSIVE — base = mobile, enhance up
           ================================================================ */
        
        /* === BASE: MOBILE (default, no media query) === */
        html, body { overflow-x: hidden !important; width: 100% !important; }
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: block !important; }
        
        /* Mobile nav + sections */
        nav { padding: 12px 16px !important; }
        section { padding: 40px 16px !important; position: relative !important; z-index: 1 !important; overflow: visible !important; }
        h1 { font-size: 26px !important; }
        h2 { font-size: 20px !important; }
        
        /* Mobile grids → stacked */
        [style*="grid-template-columns: 1fr 1fr"] { display: flex !important; flex-direction: column !important; gap: 30px !important; }
        [style*="grid-template-columns: repeat(4"] { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        [style*="grid-template-columns: repeat(3"] { display: flex !important; flex-direction: column !important; gap: 16px !important; }
        [style*="grid-template-columns: 1fr 300px"] { display: flex !important; flex-direction: column !important; gap: 30px !important; }
        [style*="grid-template-columns: repeat(auto-fit"] { display: flex !important; flex-direction: column !important; gap: 16px !important; }
        
        /* Mobile portfolio slider */
        [style*="minWidth: 280px"] { min-width: 200px !important; height: 280px !important; }
        
        /* Mobile filter buttons */
        [style*="gap: 12px"][style*="flex-wrap"] { gap: 8px !important; justify-content: center !important; }
        [style*="gap: 12px"][style*="flex-wrap"] button { padding: 6px 10px !important; font-size: 9px !important; letter-spacing: 0.5px !important; }
        
        /* Mobile cards */
        [style*="padding: 32px"] { padding: 16px !important; }
        
        /* Mobile hero */
        [style*="minHeight: 100vh"] { min-height: auto !important; padding-top: 100px !important; padding-bottom: 60px !important; }
        
        /* Mobile sticky → relative */
        [style*="position: sticky"] { position: relative !important; }
        #faqs [style*="position: sticky"] { display: none !important; }
        #contact { margin-top: 0 !important; padding-top: 60px !important; }
        
        /* Mobile spinner */
        .logo-area { width: 110px !important; height: 110px !important; }
        .logo-ink-reveal { width: 70px !important; height: 70px !important; }
        .logo-ring-svg { width: 110px !important; height: 110px !important; }
        .orbit-system { width: 110px !important; height: 110px !important; }
        .brand-letter { font-size: 24px !important; letter-spacing: 8px !important; }
        .brand-subtitle { font-size: 8px !important; letter-spacing: 3px !important; }
        
        /* === TABLET: 481px+ === */
        @media (min-width: 481px) {
          h1 { font-size: 32px !important; }
          h2 { font-size: 24px !important; }
          [style*="minWidth: 280px"] { min-width: 240px !important; height: 320px !important; }
          [style*="gap: 12px"][style*="flex-wrap"] button { padding: 8px 14px !important; font-size: 10px !important; letter-spacing: 0.8px !important; }
          [style*="padding: 32px"] { padding: 24px !important; }
          .logo-area { width: 130px !important; height: 130px !important; }
          .logo-ink-reveal { width: 80px !important; height: 80px !important; }
          .logo-ring-svg { width: 130px !important; height: 130px !important; }
          .orbit-system { width: 130px !important; height: 130px !important; }
          .brand-letter { font-size: 26px !important; letter-spacing: 9px !important; }
        }

        /* === DESKTOP: 769px+ === */
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          nav { padding: 20px 24px !important; }
          section { padding: clamp(60px, 10vw, 100px) 20px !important; }
          h1 { font-size: clamp(40px, 8vw, 72px) !important; }
          h2 { font-size: clamp(28px, 4vw, 36px) !important; }
          
          /* Desktop grids restore */
          [style*="grid-template-columns: 1fr 1fr"] { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 60px !important; }
          [style*="grid-template-columns: repeat(4"] { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important; }
          [style*="grid-template-columns: 1fr 300px"] { display: grid !important; grid-template-columns: 1fr 300px !important; gap: 60px !important; }
          [style*="grid-template-columns: repeat(auto-fit"] { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important; gap: 24px !important; }
          
          /* Desktop portfolio */
          [style*="minWidth: 280px"] { min-width: 280px !important; height: 350px !important; }
          
          /* Desktop filter buttons */
          [style*="gap: 12px"][style*="flex-wrap"] { gap: 12px !important; }
          [style*="gap: 12px"][style*="flex-wrap"] button { padding: 10px 20px !important; font-size: 12px !important; letter-spacing: 1px !important; }
          
          /* Desktop cards */
          [style*="padding: 32px"] { padding: 32px !important; }
          
          /* Desktop hero */
          [style*="minHeight: 100vh"] { min-height: 100vh !important; padding-top: 120px !important; padding-bottom: 80px !important; }
          
          /* Desktop sticky */
          [style*="position: sticky"] { position: sticky !important; }
          #faqs [style*="position: sticky"] { display: block !important; }
          
          /* Desktop spinner */
          .logo-area { width: 140px !important; height: 140px !important; }
          .logo-ink-reveal { width: 88px !important; height: 88px !important; }
          .logo-ring-svg { width: 140px !important; height: 140px !important; }
          .orbit-system { width: 140px !important; height: 140px !important; }
          .brand-letter { font-size: 28px !important; letter-spacing: 10px !important; }
          .brand-subtitle { font-size: 9px !important; letter-spacing: 4px !important; }
        }

        /* === LARGE DESKTOP: 1025px+ === */
        @media (min-width: 1025px) {
          .desktop-nav { gap: 32px !important; }
          .desktop-nav a { font-size: 11px !important; }
        }

        /* ================================================================
           MODERN ENHANCEMENTS
           ================================================================ */

        /* === ACCESSIBILITY: Reduced Motion === */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .loader-screen { display: none !important; }
          .sacred-geo { display: none !important; }
          .ink-particle { display: none !important; }
          html { scroll-behavior: auto; }
        }

        /* === MODERN FOCUS — keyboard only, no ring on click === */
        :focus-visible {
          outline: 2px solid ${colors.accentCyan};
          outline-offset: 2px;
          border-radius: 4px;
        }
        :focus:not(:focus-visible) {
          outline: none;
        }

        /* === PORTFOLIO SCROLL SNAP (mobile) === */
        @supports (scroll-snap-type: x mandatory) {
          .portfolio-slider {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .portfolio-slider > * {
            scroll-snap-align: start;
          }
        }

        /* === MODERN TRANSITIONS with @supports === */
        @supports (transition-behavior: allow-discrete) {
          .loader-screen {
            transition-behavior: allow-discrete;
          }
        }

        /* === HIGH DPI — sharper SVG rendering === */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .sacred-geo {
            shape-rendering: geometricPrecision;
          }
        }

        /* === PRINT — hide loader and non-essential === */
        @media print {
          .loader-screen, .sacred-geo, nav, footer { display: none !important; }
          section { break-inside: avoid; }
          * { color: #000 !important; background: #fff !important; }
        }
      `}</style>
    </div>
  )
}
