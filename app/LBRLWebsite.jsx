'use client'

import React, { useState, useEffect, useRef } from 'react'
import WelcomeIntro from './WelcomeIntro'
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
  const videoRef = useRef(null)
  const [videoHasEntered, setVideoHasEntered] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  
  // ========== TATTOODO MODAL STATE ==========
  const [tattoodoModalOpen, setTattoodoModalOpen] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [welcomeReopenSignal, setWelcomeReopenSignal] = useState(0)

  const showBookingGuide = () => setWelcomeReopenSignal((n) => n + 1)

  // A brief brand welcome, not a blocking loading sequence.
  // Returning tab visitors and reduced-motion users go straight to the site.
  useEffect(() => {
    let alreadySeen = false
    try { alreadySeen = sessionStorage.getItem('lbrl_intro_seen') === '1' } catch (e) { /* storage unavailable */ }
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (alreadySeen || prefersReducedMotion) {
      setIsLoading(false)
      return
    }
    const exit = window.setTimeout(() => setLoadingPhase(3), 760)
    const done = window.setTimeout(() => {
      setIsLoading(false)
      try { sessionStorage.setItem('lbrl_intro_seen', '1') } catch (e) { /* private browsing */ }
    }, 1100)
    return () => { window.clearTimeout(exit); window.clearTimeout(done) }
  }, [])

  // ========== LOAD TATTOODO SDK ASYNCHRONOUSLY (ORIGINAL RELIABLE FLOW) ==========
  useEffect(() => {
    // Preserve the existing Tattoodo integration until its SDK initialization
    // lifecycle can be tested in the live deployment. Loading is non-blocking.
    const sdkUrl = 'https://www.tattoodo.com/static/assets/sdk.js'
    if (document.querySelector(`script[src="${sdkUrl}"]`)) return
    const script = document.createElement('script')
    script.src = sdkUrl
    script.async = true
    document.body.appendChild(script)
  }, [])

  // One authority manages scrolling for every full-screen overlay.
  // Prevents the welcome and booking dialogs from restoring stale values.
  useEffect(() => {
    if (!(welcomeOpen || tattoodoModalOpen || lightboxOpen || mobileMenuOpen)) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [welcomeOpen, tattoodoModalOpen, lightboxOpen, mobileMenuOpen])

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
    if (typeof IntersectionObserver === 'undefined') {
      const allVisible = {}
      document.querySelectorAll('[data-animate]').forEach((el) => { allVisible[el.id] = true })
      setVisibleSections(allVisible)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => prev[entry.target.id] ? prev : ({ ...prev, [entry.target.id]: true }))
            observer.unobserve(entry.target)
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
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  const maxSliderIndex = Math.max(0, filteredPortfolio.length - visibleCount)
  const safeSliderIndex = Math.min(sliderIndex, maxSliderIndex)
  const visiblePortfolio = filteredPortfolio.slice(safeSliderIndex, safeSliderIndex + visibleCount)

  // Align the number of rendered gallery images with available screen width.
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      setVisibleCount(width >= 1280 ? 4 : width >= 769 ? 3 : width >= 481 ? 2 : 1)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount, { passive: true })
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // No video bytes or autoplay until the video is actually near the viewport.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (typeof IntersectionObserver === 'undefined') {
      setVideoHasEntered(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVideoHasEntered(true)
        if (video.readyState >= 2) video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '120px 0px', threshold: 0.01 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!videoHasEntered || !videoRef.current) return
    const video = videoRef.current
    video.load()
    if (video.getBoundingClientRect().top < window.innerHeight && video.getBoundingClientRect().bottom > 0) {
      video.play().catch(() => {})
    }
  }, [videoHasEntered])

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
      <WelcomeIntro isLoading={isLoading} onOpenChange={setWelcomeOpen}
        reopenSignal={welcomeReopenSignal}
        onBook={() => setTattoodoModalOpen(true)} />

      {/* ========== TATTOODO EMBED MODAL ========== */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)', zIndex: 3000,
          display: tattoodoModalOpen ? 'flex' : 'none',
          alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}
        onClick={() => setTattoodoModalOpen(false)}
        aria-hidden={!tattoodoModalOpen}
      >
        <div
          role={tattoodoModalOpen ? 'dialog' : undefined}
          aria-modal={tattoodoModalOpen ? 'true' : undefined}
          aria-label={tattoodoModalOpen ? 'Tattoodo booking form' : undefined}
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
              aria-label="Close booking form"
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

      {/* Lightweight LBRL entrance — short, accessible and GPU-friendly */}
      {isLoading && (
        <div className={`loader-screen ${loadingPhase >= 3 ? 'loader-exit' : ''}`}
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, background: colors.bgDark,
            zIndex: 9999, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <div className="intro-mark">
            <svg className="intro-mark-geometry" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="intro-ring" cx="100" cy="100" r="83" />
              <circle className="intro-ring intro-ring-inner" cx="100" cy="100" r="65" />
              <path className="intro-line" d="M100 32 L159 66 L159 134 L100 168 L41 134 L41 66 Z" />
              <path className="intro-line intro-line-second" d="M100 32 L100 168 M41 66 L159 134 M159 66 L41 134" />
            </svg>
            <img src="/Tribal Logo.jpg" className="intro-brand-logo" alt=""
              width="72" height="72" decoding="async" />
          </div>
          <div className="intro-brand-name">LBRL</div>
          <div className="intro-brand-caption">Tattoo Studio · Vancouver, WA</div>
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
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textPrimary} strokeWidth="2">{mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}</svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0, background: colors.bgDark, zIndex: 999, display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: '24px' }}>
          <button onClick={() => { setMobileMenuOpen(false); setTattoodoModalOpen(true) }} style={{ background: 'none', border: 'none', color: colors.textPrimary, fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '0', textAlign: 'left' }}><TattoodoIcon /><span>Book on Tattoodo</span></button>
          <button type="button" onClick={() => { setMobileMenuOpen(false); showBookingGuide() }}
            style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: colors.accentCyan, fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
            How I Work · Booking Guide
          </button>
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
        <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.accentCyan, marginBottom: '16px', fontWeight: 500 }}>Custom Tattoo Studio in Vancouver, WA</p>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '300', letterSpacing: '-1px', marginBottom: '24px', lineHeight: '1.1', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.5s' }}>
          Art That<br /><span style={{ color: colors.accentCyan }}>Becomes You</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: colors.textSecondary, maxWidth: '600px', lineHeight: '1.7', marginBottom: '40px', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.7s' }}>
          Multi-award winning custom tattoos designed in harmony with your body. Every piece flows with your anatomy.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(30px)' : 'translateY(0)', transition: 'all 0.6s ease 0.9s' }}>
          <button onClick={() => setTattoodoModalOpen(true)} style={{ padding: '16px 32px', background: colors.accentCyan, color: colors.bgDark, borderRadius: '8px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Start Your Journey</button>
          <a href="#portfolio" style={{ padding: '16px 32px', background: 'transparent', border: `1px solid ${colors.borderDefault}`, color: colors.textPrimary, borderRadius: '8px', fontSize: '13px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease' }}>View Portfolio</a>
          <button type="button" onClick={showBookingGuide}
            style={{ padding: '16px 24px', background: 'transparent', border: 'none', color: colors.accentCyan, fontSize: '12px', fontWeight: 500, letterSpacing: '0.8px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            How I Work · Booking Guide
          </button>
        </div>
        <div style={{ width: '100%', maxWidth: '1200px', marginTop: '60px', padding: '0 40px' }}>
          <img loading="lazy" decoding="async" src="/IMG_4885.png" alt="Decorative floral element" className="wind-blow-image" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
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
              <img loading="lazy" decoding="async" src="/Dany 3.PNG" alt="Daniel Liberal tattooing a client at LBRL Tattoo Studio Vancouver WA" style={{ width: '100%', borderRadius: '16px', marginBottom: '30px', objectFit: 'cover' }} />
              <p style={{ fontSize: '12px', fontWeight: '500', color: colors.accentCyan, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Body Harmony</p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', marginBottom: '24px', lineHeight: '1.3' }}>Every Design Flows<br />With Your Anatomy</h2>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px' }}>Tattooing, for me, starts with understanding how the body carries a design. I think about flow, movement, and how a tattoo lives on the skin over time.</p>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px' }}>With over 12 years of experience and recognition from tattoo conventions in New York and Portland, my approach stays the same: one-on-one collaboration and fully custom work.</p>
              <p style={{ fontSize: '14px', color: colors.textMuted, fontStyle: 'italic' }}>From Puerto Rico 2013 est. to Vancouver, WA 2016-Present</p>
            </div>
            <div className={visibleSections['about'] ? 'animate-fadeInRight animate-delay-2' : 'animate-hidden'} style={{ background: `linear-gradient(180deg, rgba(42,50,45,0.95) 0%, rgba(42,50,45,0.98) 100%), url('/about-bg.webp')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', padding: '40px 32px', border: `1px solid ${colors.borderDefault}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <img loading="lazy" decoding="async" src="/Dani1.png" alt="Daniel Liberal headshot - Lead Artist and Owner LBRL Tattoo Studio" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
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

      {/* Local search service paths — real server-rendered pages, not gallery filters */}
      <section aria-label="Vancouver WA tattoo specialties" style={{ padding: '64px 20px', background: colors.bgDark }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <p style={{ color: colors.accentCyan, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Vancouver, Washington</p>
          <h2 style={{ fontWeight: 300, fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: '16px' }}>Custom Tattoo Styles & Large-Scale Projects</h2>
          <p style={{ color: colors.textSecondary, maxWidth: '800px', lineHeight: 1.8, marginBottom: '26px' }}>LBRL is a private tattoo studio in Vancouver, WA, creating custom Japanese-inspired, blackwork, ornamental and floral tattoos, including half and full sleeves. Explore the work and approach behind each specialty.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(210px, 100%), 1fr))', gap: '12px' }}>
            {[
              { title: 'Neo-Japanese Tattoos', href: '/tattoos/neo-japanese-vancouver-wa' },
              { title: 'Blackwork Tattoos', href: '/tattoos/blackwork-vancouver-wa' },
              { title: 'Ornamental Tattoos', href: '/tattoos/ornamental-vancouver-wa' },
              { title: 'Floral Tattoos', href: '/tattoos/floral-vancouver-wa' },
              { title: 'Custom Tattoo Sleeves', href: '/tattoos/sleeves-vancouver-wa' },
            ].map(({ title, href }) => (
              <a key={href} href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '18px', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '10px', background: colors.bgCard, color: colors.textPrimary, textDecoration: 'none', fontSize: '14px', lineHeight: 1.5 }}>
                {title}<span aria-hidden="true" style={{ color: colors.accentCyan }}>↗</span>
              </a>
            ))}
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
                <button key={style.value} onClick={() => { setActiveStyle(style.value); setSliderIndex(0) }} style={{ padding: '10px 20px', background: activeStyle === style.value ? colors.accentCyan : colors.bgCard, color: activeStyle === style.value ? colors.bgDark : colors.textSecondary, border: 'none', borderRadius: '20px', fontSize: '12px', fontWeight: '500', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s ease' }}>{style.label}</button>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSliderIndex(Math.max(0, safeSliderIndex - 1))} disabled={safeSliderIndex === 0} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: colors.bgCard, border: `1px solid ${colors.borderDefault}`, color: safeSliderIndex === 0 ? colors.textMuted : colors.textPrimary, cursor: safeSliderIndex === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10, transition: 'all 0.3s ease' }}>←</button>
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div key={`${activeStyle}-${safeSliderIndex}`} className="portfolio-window" style={{ display: 'flex', gap: '16px' }}>
                {visiblePortfolio.map((item, index) => (
                  <button key={item.id} type="button" className="portfolio-card"
                    aria-label={`View tattoo ${safeSliderIndex + index + 1} of ${filteredPortfolio.length}`}
                    onClick={() => openLightbox(safeSliderIndex + index)}
                    style={{ flexShrink: 0, width: `calc((100% - ${16 * (visibleCount - 1)}px) / ${visibleCount})`, aspectRatio: '4 / 5', padding: 0, border: 'none', background: 'none', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                    <img src={item.image} alt={item.alt || 'Custom tattoo by Daniel Liberal - LBRL Tattoo Studio Vancouver WA'}
                      loading="lazy" decoding="async" width="280" height="350"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.25s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setSliderIndex(Math.min(maxSliderIndex, safeSliderIndex + 1))} disabled={safeSliderIndex >= maxSliderIndex} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: colors.bgCard, border: `1px solid ${colors.borderDefault}`, color: safeSliderIndex >= maxSliderIndex ? colors.textMuted : colors.textPrimary, cursor: safeSliderIndex >= maxSliderIndex ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10, transition: 'all 0.3s ease' }}>→</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}><span style={{ fontSize: '13px', color: colors.textMuted }}>{safeSliderIndex + 1}-{Math.min(safeSliderIndex + visibleCount, filteredPortfolio.length)} of {filteredPortfolio.length} pieces</span></div>
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
              <img loading="lazy" decoding="async" src="/Dani2.png" alt="Daniel Liberal tattoo artist at work - LBRL Tattoo Studio Vancouver WA" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', marginBottom: '20px' }} />
              <video ref={videoRef} preload="none" loop muted playsInline
                poster="/Dani2.png"
                style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}>
                {videoHasEntered && <source src="/_users_355de36e-0a13-42b0-a4f8-690006e9848c_generated_0760b186-f9b7-45de-b081-c173128c2802_generated_video.mp4" type="video/mp4" />}
              </video>
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

        /* Minimal brand transition: no particles, glows, SVG filters or blurs. */
        .loader-screen { isolation: isolate; user-select: none; }
        .loader-exit { animation: introExit 0.34s ease forwards; pointer-events: none; }
        @keyframes introExit { to { opacity: 0; } }
        .intro-mark { width: 154px; height: 154px; position: relative; display: grid; place-items: center; }
        .intro-mark-geometry { width: 154px; height: 154px; position: absolute; inset: 0; }
        .intro-ring, .intro-line {
          fill: none; stroke: #7dd4c4; stroke-width: 0.7; opacity: 0.35;
          transform-origin: center;
          animation: introDraw 0.65s ease both;
        }
        .intro-ring-inner { stroke-width: 0.5; opacity: 0.18; animation-delay: 0.08s; }
        .intro-line { stroke-width: 0.6; opacity: 0.25; animation-delay: 0.1s; }
        .intro-line-second { stroke-width: 0.4; opacity: 0.12; animation-delay: 0.16s; }
        @keyframes introDraw { from { opacity: 0; transform: scale(0.89); } }
        .intro-brand-logo {
          width: 72px; height: 72px; position: relative; border-radius: 50%; object-fit: cover;
          animation: introReveal 0.55s ease-out 0.08s both;
        }
        .intro-brand-name {
          color: #fff; font-size: 24px; font-weight: 300; letter-spacing: 0.28em;
          padding-left: 0.28em; animation: introReveal 0.55s ease-out 0.15s both;
        }
        .intro-brand-caption {
          color: #7dd4c4; font-size: 9px; font-weight: 400;
          letter-spacing: 0.24em; text-transform: uppercase;
          animation: introReveal 0.55s ease-out 0.2s both;
        }
        @keyframes introReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

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
        body { overflow-x: hidden !important; width: 100% !important; }
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: block !important; }
        
        /* Mobile nav + sections */
        nav { padding: 12px 16px !important; }
        section { padding: 40px 16px !important; position: relative !important; z-index: 1 !important; overflow: visible !important; }
        h1 { font-size: 26px !important; }
        h2 { font-size: 20px !important; }
        [role="dialog"] h2 { font-size: clamp(26px, 5vw, 34px) !important; }
        
        /* Mobile grids → stacked */
        [style*="grid-template-columns: 1fr 1fr"] { display: flex !important; flex-direction: column !important; gap: 30px !important; }
        [style*="grid-template-columns: repeat(4"] { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        [style*="grid-template-columns: repeat(3"] { display: flex !important; flex-direction: column !important; gap: 16px !important; }
        [style*="grid-template-columns: 1fr 300px"] { display: flex !important; flex-direction: column !important; gap: 30px !important; }
        [style*="grid-template-columns: repeat(auto-fit"] { display: flex !important; flex-direction: column !important; gap: 16px !important; }
        
        /* Mobile portfolio cards */
        /* Portfolio card size is set dynamically in JSX to fit each breakpoint. */
        .portfolio-window { animation: portfolioWindowIn 0.18s ease-out; }
        @keyframes portfolioWindowIn { from { opacity: 0.65; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
        
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
        
        /* === TABLET: 481px+ === */
        @media (min-width: 481px) {
          h1 { font-size: 32px !important; }
          h2 { font-size: 24px !important; }
          [role="dialog"] h2 { font-size: clamp(26px, 5vw, 34px) !important; }
          /* Portfolio card size is set dynamically in JSX to fit each breakpoint. */
          [style*="gap: 12px"][style*="flex-wrap"] button { padding: 8px 14px !important; font-size: 10px !important; letter-spacing: 0.8px !important; }
          [style*="padding: 32px"] { padding: 24px !important; }

}

        /* === DESKTOP: 769px+ === */
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          nav { padding: 20px 24px !important; }
          section { padding: clamp(60px, 10vw, 100px) 20px !important; }
          h1 { font-size: clamp(40px, 8vw, 72px) !important; }
          h2 { font-size: clamp(28px, 4vw, 36px) !important; }
          [role="dialog"] h2 { font-size: 34px !important; }
          
          /* Desktop grids restore */
          [style*="grid-template-columns: 1fr 1fr"] { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 60px !important; }
          [style*="grid-template-columns: repeat(4"] { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important; }
          [style*="grid-template-columns: 1fr 300px"] { display: grid !important; grid-template-columns: 1fr 300px !important; gap: 60px !important; }
          [style*="grid-template-columns: repeat(auto-fit"] { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important; gap: 24px !important; }
          
          /* Desktop portfolio */
          /* Portfolio card size is set dynamically in JSX to fit each breakpoint. */
          
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
          .portfolio-window { animation: none !important; }
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

        /* === PRINT — hide loader and non-essential === */
        @media print {
          .loader-screen, nav, footer { display: none !important; }
          section { break-inside: avoid; }
          * { color: #000 !important; background: #fff !important; }
        }
      `}</style>
    </div>
  )
}
