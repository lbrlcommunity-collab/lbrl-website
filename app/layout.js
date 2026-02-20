import './globals.css'
import SchemaMarkup from './SchemaMarkup'

export const metadata = {
  title: 'LBRL Tattoo Studio | Multi-Award Winning Custom Tattoos Vancouver WA',
  description: 'Multi-award winning custom tattoo studio in Vancouver, WA. Daniel Liberal brings 12+ years of experience in Japanese, blackwork, ornamental & botanical fine line designs. Body Harmony approach — every piece flows with your anatomy. By appointment only.',
  keywords: 'tattoo shop Vancouver WA, custom tattoo artist Vancouver, Japanese tattoo Vancouver WA, blackwork tattoo Vancouver, ornamental tattoo Vancouver, botanical fine line tattoo, sleeve tattoo Vancouver, tattoo studio Vancouver Washington, Daniel Liberal tattoo, LBRL tattoo, Body Harmony tattoo, award winning tattoo artist Vancouver, best tattoo artist Vancouver WA, custom sleeve tattoo Portland area, tattoo near me Vancouver',
  authors: [{ name: 'Daniel Liberal', url: 'https://www.lbrltattoos.com' }],
  creator: 'LBRL Tattoo Studio',
  publisher: 'LBRL Tattoo Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ArYpD1e2h-wSSrfa7MVjVn13znFx-hoVl_DOl0pgQrc',
  },
  alternates: {
    canonical: 'https://www.lbrltattoos.com',
  },
  openGraph: {
    title: 'LBRL Tattoo Studio | Custom Tattoos Vancouver WA',
    description: 'Multi-award winning custom tattoo studio. Japanese, blackwork, ornamental & botanical fine line designs by Daniel Liberal. 12+ years experience. By appointment only.',
    url: 'https://www.lbrltattoos.com',
    siteName: 'LBRL Tattoo Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.lbrltattoos.com/Tribal Logo.jpg',
        width: 800,
        height: 800,
        alt: 'LBRL Tattoo Studio Logo - Custom Tattoo Shop Vancouver WA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LBRL Tattoo Studio | Custom Tattoos Vancouver WA',
    description: 'Multi-award winning custom tattoos by Daniel Liberal. Japanese, blackwork, ornamental & botanical fine line. Vancouver, WA.',
    images: ['https://www.lbrltattoos.com/Tribal Logo.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SchemaMarkup />
        {children}
      </body>
    </html>
  )
}
