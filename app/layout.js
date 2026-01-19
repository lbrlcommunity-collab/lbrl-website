import './globals.css'

export const metadata = {
  title: 'LBRL Tattoo Studio | Multi-Award Winning Custom Tattoos Vancouver WA',
  description: 'Multi-award winning custom tattoo studio in Vancouver, WA. Daniel Liberal brings 12+ years of experience in Japanese, blackwork, ornamental & floral designs. By appointment only.',
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
