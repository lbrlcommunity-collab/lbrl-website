export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/api/'],
      },
    ],
    sitemap: 'https://lbrltattoos.com/sitemap.xml',
  }
}
