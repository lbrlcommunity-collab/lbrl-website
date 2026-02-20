/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // CRITICAL: Kill ghost /contact-me page showing wrong address (903 Main St)
      {
        source: '/contact-me',
        destination: '/#contact',
        permanent: true,
      },
      // Old Wix routes still indexed by Google
      {
        source: '/gallery',
        destination: '/#portfolio',
        permanent: true,
      },
      {
        source: '/about-1',
        destination: '/#about',
        permanent: true,
      },
      // Route to Wix booking site
      {
        source: '/release-form',
        destination: 'https://book.lbrltattoos.com/release-form',
        permanent: true,
      },
      // Route old booking calendar to Tattoodo
      {
        source: '/booking-calendar/:path*',
        destination: 'https://ta2.do/Dani_lbrl',
        permanent: true,
      },
      // Catch any old Wix copy-of duplicate pages
      {
        source: '/copy-of-:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
