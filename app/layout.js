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

// ========== JSON-LD SCHEMAS (in body to prevent Next.js head duplication) ==========
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.lbrltattoos.com/#business',
  additionalType: 'https://schema.org/TattooParlor',
  name: 'LBRL Tattoo Studio',
  alternateName: 'LBRL Tattoos',
  description:
    'Multi-award winning custom tattoo studio specializing in Japanese, blackwork, ornamental, and botanical fine line tattoos. Body Harmony approach designs each piece to flow with your natural anatomy.',
  url: 'https://www.lbrltattoos.com',
  telephone: '',
  email: 'Liberaltattoos@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9013 NE Hwy 99',
    addressLocality: 'Vancouver',
    addressRegion: 'WA',
    postalCode: '98665',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.6797,
    longitude: -122.6615,
  },
  image: 'https://www.lbrltattoos.com/Tribal%20Logo.jpg',
  priceRange: '$$-$$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '18:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom Tattoo Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Large-Scale Custom Tattoo (Sleeves, Back Pieces)' },
        priceCurrency: 'USD',
        price: '260',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '260', priceCurrency: 'USD', unitText: 'HOUR' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Medium Custom Tattoo' },
        priceCurrency: 'USD',
        price: '500',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Small Custom Tattoo' },
        priceCurrency: 'USD',
        price: '150',
      },
    ],
  },
  founder: {
    '@type': 'Person',
    name: 'Daniel Liberal',
    jobTitle: 'Lead Artist & Owner',
    knowsAbout: ['Japanese Tattoo', 'Blackwork', 'Ornamental Tattoo', 'Botanical Fine Line', 'Body Harmony Tattoo Design'],
    award: ['3rd Place Asian Category - Portland Tattoo Expo 2024', 'Award Winner - New York Tattoo Convention 2016'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '18',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Ivan Martinez' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Got my first tattoo done here, and I couldn\'t have asked for a better experience. Dani was amazing—super chill, easy to talk to, and made the whole process really comfortable.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Andrew Ammerman' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Dani designed two beautiful and unique sleeves for me. He was amazing through the process and tuned in to my pain tolerance while working around more sensitive spots.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Logan Sherlock' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Been going to Dani since I was 18, now almost two sleeves down. Always great at working with the client and giving them what they ask for. A true professional.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'T Boyter' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Clean, professional, personable. Dani will work with you to create your one of a kind masterpiece. His tattoo skills are impressive—clean lines, incredible shading. 10/10',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sara Sargent' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Dani is the only artist I will go to. Hands down the best experience, every time. If you\'re looking for someone to bring your feelings to life, this is your person.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Shainna Thompson' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'He listened to my ideas and had the most beautiful concept drawn up. If you want your body to become a walking piece of art, contact him!',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Emily Heacock' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Love my new tattoo! Dani is very professional and communicative. He makes you feel very welcome and comfortable through the process.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Jessica Allen' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'I have gone to Dani for the past 3 years and gotten 3 different tattoos from him. He is very professional but also exceptionally talented and fast!',
    },
  ],
  sameAs: [
    'https://www.instagram.com/danilbrl_tattoo/',
    'https://www.instagram.com/lbrltattoostudio/',
    'https://www.facebook.com/lbrltattoos',
    'https://www.tattoodo.com/Dani_lbrl',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Am I eligible for a tattoo at LBRL Studio?',
      acceptedAnswer: { '@type': 'Answer', text: 'You must be 18 years or older and present a valid ID. No exceptions.' },
    },
    {
      '@type': 'Question',
      name: 'What should I expect from a large-scale tattoo project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Large-scale projects like sleeves, back pieces, or full leg pieces require a real commitment of time and budget. These projects are completed over multiple sessions, and timelines vary depending on the design, your body, and how you sit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does tattoo pricing work at LBRL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Large-scale projects are priced at $260 per hour with a $300 deposit. Medium projects are a flat rate from $500 to $750 with a $250 deposit. Small tattoos have a $150 shop minimum, typically ranging from $150 to $350.',
      },
    },
    {
      '@type': 'Question',
      name: 'What deposit is required to book a tattoo appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All appointments require a deposit which secures your booking and covers design time. Deposits are applied toward the final session and are non-refundable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cancellation policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cancellations or reschedules made with less than 72 hours notice will result in the loss of the deposit. A new deposit is required to book again.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I see my tattoo design before the session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For large-scale projects with a $300 deposit, a revision appointment is scheduled where you review up to three design directions. For medium and small tattoos, designs are reviewed on the day of the appointment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I prepare for my tattoo session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Get a good night\'s rest, eat beforehand, stay hydrated, and bring snacks if you\'d like. You\'re welcome to bring a blanket or anything that helps you stay comfortable during the session.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I agree to when I book an appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'By booking an appointment, you acknowledge and agree to the pricing, deposit policy, and process outlined on the website. You\'re also agreeing to follow studio guidelines so the session runs smoothly.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
