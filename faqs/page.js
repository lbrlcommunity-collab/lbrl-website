'use client'

import React from 'react'

export default function FAQsPage() {
  const colors = {
    bgDark: '#1a1f1c',
    bgPrimary: '#232a26',
    bgCard: '#2a322d',
    borderSubtle: 'rgba(255,255,255,0.04)',
    textPrimary: '#ffffff',
    textSecondary: '#a8b0ab',
    textMuted: '#6b756e',
    accentCyan: '#7dd4c4',
    accentOrange: '#e8a87c',
  }

  const faqs = [
    {
      q: 'Am I Eligible for a Tattoo?',
      a: 'To be eligible for a tattoo, you must be at least 18 years old and present a valid ID. This is non-negotiable.'
    },
    {
      q: 'What Should I Expect from a Large Scale Tattoo?',
      a: 'Large scale tattoos require a significant investment of time and money. They cannot be completed in just 2-3 sessions due to factors like design complexity, your body size, and pain tolerance. It\'s crucial to note that rushing a tattoo may compromise the quality of the artwork.'
    },
    {
      q: 'What are the Costs Involved?',
      a: 'Tattoo pricing varies based on size, complexity, and session duration. Half-day session (4 hours): Ideal for medium-sized tattoos or multiple smaller pieces — $1,000. Full-day session (8 hours): Perfect for larger, intricate tattoos or multiple pieces in one session — $2,000. Individual pricing for small tattoos is decided based on design, size, and complexity rather than an hourly rate.'
    },
    {
      q: 'What\'s Required to Secure an Appointment?',
      a: 'To secure a half-day or full-day session, a $300 deposit is necessary. This deposit goes towards the time invested in your design and is applied towards your final session.'
    },
    {
      q: 'What if I Need to Cancel or Reschedule?',
      a: 'Clients who cancel with less than 72 hours\' notice forfeit their initial deposit. A new deposit will be required to reschedule.'
    },
    {
      q: 'Will I Get to See the Drawing Process?',
      a: 'To ensure the best tattoo experience, I prioritize one-on-one communication rather than sending pictures of the drawing process. This is to avoid any misunderstandings that may arise from email communication. You\'ll see and approve the final design before we begin.'
    },
    {
      q: 'What Should I Do to Prepare for My Session?',
      a: 'Make sure to get plenty of rest before your appointment, eat a good meal beforehand, stay hydrated, and bring snacks. Consider bringing comfort items like a favorite blanket or headphones, and maintain a positive attitude.'
    },
    {
      q: 'What Am I Agreeing to by Booking an Appointment?',
      a: 'By scheduling an appointment, you acknowledge understanding and agreeing to the provided information, including pricing, deposit, and tattoo process. You\'re also agreeing to follow guidelines to ensure a quality tattoo experience. If you have any questions or concerns, don\'t hesitate to reach out.'
    }
  ]

  const noShowPolicy = [
    'Deposit is refundable only if we don\'t move forward after the consultation.',
    'Once you approve the design and confirm your appointment, the deposit becomes non-refundable.',
    'Cancellations with less than 72 hours\' notice = deposit lost.',
    'Arriving more than 15 minutes late with no message counts as a no-show.',
    'To rebook after a no-show, a new deposit will be required.'
  ]

  return (
    <div style={{ minHeight: '100vh', background: colors.bgDark, color: colors.textPrimary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ padding: '24px', borderBottom: `1px solid ${colors.borderSubtle}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ textDecoration: 'none', color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '6px' }}>LBRL</span>
          </a>
          <a href="/" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '12px' }}>← Back to Home</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 300, margin: '0 0 16px 0' }}>FAQs</h1>
          <p style={{ color: colors.textMuted, fontSize: '15px' }}>Frequently Asked Questions and Important Information</p>
        </div>

        {/* FAQ LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              padding: '28px',
              background: colors.bgPrimary,
              borderRadius: '12px',
              border: `1px solid ${colors.borderSubtle}`
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: colors.accentCyan }}>{faq.q}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: colors.textSecondary, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* NO-SHOW POLICY */}
        <div style={{
          padding: '32px',
          background: `linear-gradient(145deg, ${colors.bgCard} 0%, ${colors.bgPrimary} 100%)`,
          borderRadius: '12px',
          border: `1px solid ${colors.borderSubtle}`,
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 500, margin: '0 0 24px 0' }}>LBRL No-Show Policy</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {noShowPolicy.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', lineHeight: 1.7, color: colors.textSecondary }}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: '24px', fontSize: '14px', color: colors.accentOrange, fontStyle: 'italic' }}>
            Respect my time and I'll respect yours.
          </p>
        </div>

        {/* CLOSING */}
        <div style={{ textAlign: 'center', padding: '40px', background: colors.bgPrimary, borderRadius: '12px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: colors.textSecondary, margin: '0 0 24px 0' }}>
            If you have any questions or concerns, don't hesitate to reach out.<br/>
            Thank you for considering me as your tattoo artist.
          </p>
          <a href="https://book.lbrltattoos.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            background: colors.accentCyan,
            color: colors.bgDark,
            padding: '16px 32px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderRadius: '6px',
            textDecoration: 'none'
          }}>
            Book Consultation
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '40px 24px', borderTop: `1px solid ${colors.borderSubtle}`, textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: colors.textMuted }}>© 2025 Daniel Liberal. All rights reserved.</p>
      </footer>
    </div>
  )
}
