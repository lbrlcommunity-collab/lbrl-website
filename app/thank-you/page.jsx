'use client'

import React, { useEffect, useState } from 'react'

export default function ThankYouPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)
  }, [])

  const colors = {
    bgDark: '#1a1f1c',
    bgPrimary: '#232a26',
    bgCard: '#2a322d',
    textPrimary: '#ffffff',
    textSecondary: '#a8b0ab',
    accentCyan: '#7dd4c4',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bgDark,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      
      <div style={{
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        
        {/* Logo */}
        <div style={{ marginBottom: '30px' }}>
          <img src="/Tribal Logo.jpg" alt="LBRL" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>

        {/* Checkmark Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.accentCyan}, #5a9a8a)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          boxShadow: `0 0 40px ${colors.accentCyan}33`,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.bgDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Thank You Text */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: '300',
          color: colors.textPrimary,
          marginBottom: '16px',
          letterSpacing: '-0.5px',
        }}>
          Thank You
        </h1>

        <p style={{
          fontSize: '18px',
          color: colors.textSecondary,
          lineHeight: '1.7',
          marginBottom: '30px',
        }}>
          Your booking request has been received. I'll review your submission and get back to you within 1-3 business days to confirm your appointment.
        </p>

        {/* What to Expect */}
        <div style={{
          background: colors.bgCard,
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'left',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '500',
            color: colors.accentCyan,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            What Happens Next
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: colors.accentCyan, fontWeight: '600' }}>1.</span>
              <p style={{ color: colors.textSecondary, margin: 0, lineHeight: '1.6' }}>
                I'll review your idea and reference images
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: colors.accentCyan, fontWeight: '600' }}>2.</span>
              <p style={{ color: colors.textSecondary, margin: 0, lineHeight: '1.6' }}>
                You'll receive an email to confirm your consultation or session
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: colors.accentCyan, fontWeight: '600' }}>3.</span>
              <p style={{ color: colors.textSecondary, margin: 0, lineHeight: '1.6' }}>
                Deposit secures your spot on the calendar
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'transparent',
            border: `1px solid ${colors.accentCyan}`,
            borderRadius: '8px',
            color: colors.accentCyan,
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
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
          Back to Home
        </a>

        {/* Contact Info */}
        <p style={{
          marginTop: '40px',
          fontSize: '14px',
          color: colors.textSecondary,
        }}>
          Questions? Email <a href="mailto:lbrltattoos@gmail.com" style={{ color: colors.accentCyan, textDecoration: 'none' }}>lbrltattoos@gmail.com</a>
        </p>

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}
