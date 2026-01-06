import './globals.css'

export const metadata = {
  title: 'LBRL Tattoo Studio | Multi-Award Winning Custom Tattoos Vancouver WA',
  description: 'Multi-award winning custom tattoo studio in Vancouver, WA. Daniel Liberal brings 12+ years of experience in Japanese, blackwork, ornamental & floral designs. By appointment only.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
