import './globals.css'

export const metadata = {
  title: 'LBRL Tattoo Studio | Multi-Award Winning Custom Tattoos Vancouver WA',
  description:
    'Multi-award winning custom tattoo studio in Vancouver, WA. Daniel Liberal brings 12+ years of experience in Japanese, blackwork, ornamental, botanical fine line & Body Harmony designs. By appointment only.',
  keywords:
    'tattoo shop Vancouver WA, custom tattoo artist Vancouver, Japanese tattoo Vancouver WA, blackwork tattoo, ornamental tattoo, botanical fine line tattoo, sleeve tattoo Vancouver, Daniel Liberal tattoo, LBRL tattoo, Body Harmony tattoo, award winning tattoo artist Vancouver WA, custom sleeve tattoo Portland area, tattoo near me Vancouver, best tattoo artist Vancouver WA',
  authors: [{ name: 'Daniel Liberal', url: 'https://www.lbrltattoos.com' }],
  creator: 'Daniel Liberal',
  publisher: 'LBRL Tattoo Studio',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  alternates: {
    canonical: 'https://www.lbrltattoos.com',
  },
  openGraph: {
    title: 'LBRL Tattoo Studio | Custom Tattoos Vancouver WA',
    description:
      'Multi-award winning custom tattoo studio. Japanese, blackwork, ornamental & botanical fine line tattoos designed in harmony with your body.',
    url: 'https://www.lbrltattoos.com',
    siteName: 'LBRL Tattoo Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.lbrltattoos.com/Tribal%20Logo.jpg',
        width: 800,
        height: 800,
        alt: 'LBRL Tattoo Studio Logo - Custom Tattoos Vancouver WA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LBRL Tattoo Studio | Custom Tattoos Vancouver WA',
    description:
      'Multi-award winning custom tattoo studio in Vancouver, WA. Japanese, blackwork, ornamental & botanical fine line.',
    images: ['https://www.lbrltattoos.com/Tribal%20Logo.jpg'],
  },
  verification: {
    google: 'ArYpD1e2h-wSSrfa7MVjVn13znFx-hoVl_DOl0pgQrc',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
