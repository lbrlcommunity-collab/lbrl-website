export default function sitemap() {
  const baseUrl = 'https://www.lbrltattoos.com'
  const currentDate = new Date().toISOString()
  
  return [
    // Homepage - Highest Priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Portfolio - High Priority for SEO
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // About Section
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Process Section
    {
      url: `${baseUrl}/#process`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Pricing Section
    {
      url: `${baseUrl}/#pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // FAQs Section
    {
      url: `${baseUrl}/#faqs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Contact Section
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
