'use client'

export default function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TattooShop",
    "name": "LBRL Tattoo Studio",
    "alternateName": "LBRL Tattoos",
    "description": "Multi-award winning custom tattoo studio in Vancouver, WA. Daniel Liberal brings 12+ years of experience specializing in Japanese-inspired, blackwork, ornamental, and botanical fine line tattoos. Every design flows with your natural anatomy using the Body Harmony approach. By appointment only.",
    "url": "https://www.lbrltattoos.com",
    "email": "Liberaltattoos@gmail.com",
    "image": "https://www.lbrltattoos.com/Tribal Logo.jpg",
    "logo": "https://www.lbrltattoos.com/Tribal Logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9013 NE Hwy 99",
      "addressLocality": "Vancouver",
      "addressRegion": "WA",
      "postalCode": "98665",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.6797,
      "longitude": -122.6615
    },
    "areaServed": [
      { "@type": "City", "name": "Vancouver", "containedInPlace": { "@type": "State", "name": "Washington" } },
      { "@type": "City", "name": "Portland", "containedInPlace": { "@type": "State", "name": "Oregon" } },
      { "@type": "Place", "name": "Clark County, Washington" }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "USD",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom Tattoo Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Large-Scale Custom Tattoos",
            "description": "Half sleeves, full sleeves, back pieces, and leg pieces. Includes revision appointment with up to three design directions.",
            "offers": { "@type": "Offer", "price": "260", "priceCurrency": "USD", "unitText": "per hour" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medium Custom Tattoos",
            "description": "Flat rate custom tattoo work with design reviewed day of session.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "500", "highPrice": "750", "priceCurrency": "USD" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Small Custom Tattoos",
            "description": "Names, symbols, and simple designs. $150 shop minimum.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "150", "highPrice": "350", "priceCurrency": "USD" }
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Daniel Liberal",
      "jobTitle": "Lead Artist & Owner",
      "knowsAbout": ["Japanese Tattoo", "Blackwork Tattoo", "Ornamental Tattoo", "Botanical Fine Line Tattoo", "Custom Tattoo Design"],
      "award": ["NY United Ink Expo 2016 Award", "3rd Place Asian Category Portland Tattoo Expo 2024"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "18",
      "reviewCount": "18"
    },
    "sameAs": [
      "https://instagram.com/danilbrl_tattoo",
      "https://facebook.com/lbrltattoos",
      "https://www.tattoodo.com/artists/Dani_lbrl",
      "https://www.yelp.com/biz/lbrl-tattoos-vancouver",
      "https://www.linkedin.com/in/daniel-liberal-635222341/"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Am I eligible for a tattoo at LBRL Studio?",
        "acceptedAnswer": { "@type": "Answer", "text": "You must be 18 years or older and present a valid ID. No exceptions." }
      },
      {
        "@type": "Question",
        "name": "What should I expect from a large-scale tattoo?",
        "acceptedAnswer": { "@type": "Answer", "text": "Large-scale projects like sleeves, back pieces, or full leg pieces require a real commitment of time and budget. These projects are completed over multiple sessions, and timelines vary depending on the design, your body, and how you sit. Rushing a tattoo usually affects the quality, so the focus is always on doing it right rather than doing it fast." }
      },
      {
        "@type": "Question",
        "name": "How does tattoo pricing work at LBRL Studio?",
        "acceptedAnswer": { "@type": "Answer", "text": "Large-scale projects are priced at $260 per hour with a $300 deposit. Medium projects are a flat rate from $500 to $750 with a $250 deposit. Small tattoos have a $150 shop minimum, typically ranging from $150 to $350, with deposits from $50 to $100. All deposits go toward the final session." }
      },
      {
        "@type": "Question",
        "name": "What's required to secure a tattoo appointment?",
        "acceptedAnswer": { "@type": "Answer", "text": "All appointments require a deposit, which secures your booking and covers design time. Deposits are applied toward the final session and are non-refundable." }
      },
      {
        "@type": "Question",
        "name": "What if I need to cancel or reschedule my tattoo appointment?",
        "acceptedAnswer": { "@type": "Answer", "text": "Cancellations or reschedules made with less than 72 hours notice will result in the loss of the deposit. A new deposit is required to book again." }
      },
      {
        "@type": "Question",
        "name": "Will I see the tattoo design before my appointment?",
        "acceptedAnswer": { "@type": "Answer", "text": "For large-scale projects with a $300 deposit, a revision appointment is scheduled where you review up to three design directions. For medium and small tattoos, designs are reviewed on the day of the appointment. Designs are not sent beforehand, as reviewing in person leads to better results." }
      },
      {
        "@type": "Question",
        "name": "How should I prepare for my tattoo session?",
        "acceptedAnswer": { "@type": "Answer", "text": "Get a good night's rest, eat beforehand, stay hydrated, and bring snacks if you'd like. You're welcome to bring a blanket or anything that helps you stay comfortable during the session." }
      },
      {
        "@type": "Question",
        "name": "What am I agreeing to when I book a tattoo at LBRL?",
        "acceptedAnswer": { "@type": "Answer", "text": "By booking an appointment, you acknowledge and agree to the pricing, deposit policy, and process outlined on the website. You're also agreeing to follow studio guidelines so the session runs smoothly." }
      }
    ]
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "TattooShop",
    "name": "LBRL Tattoo Studio",
    "review": [
      { "@type": "Review", "author": { "@type": "Person", "name": "Ivan Martinez" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Got my first tattoo done here, and I couldn't have asked for a better experience. Dani was amazing—super chill, easy to talk to, and made the whole process really comfortable from start to finish." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Andrew Ammerman" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Dani designed two beautiful and unique sleeves for me. He was amazing through the process and tuned in to my pain tolerance while working around more sensitive spots. I recommend anyone to seek out Dani." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Logan Sherlock" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Been going to Dani since I was 18, now almost two sleeves down. I have nothing but fantastic things to say. Always great at working with the client and giving them what they ask for. A true professional." },
      { "@type": "Review", "author": { "@type": "Person", "name": "T Boyter" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "I've had three sessions with Dani. Clean, professional, personable. Dani will work with you to create your one of a kind masterpiece. His tattoo skills are impressive—clean lines, incredible shading. 10/10" },
      { "@type": "Review", "author": { "@type": "Person", "name": "Sara Sargent" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Dani is the only artist I will go to. Hands down the best experience, every time. If you're looking for someone to bring your feelings to life, this is your person. Creativity at its best." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Shainna Thompson" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "I came to Dani looking for his expertise in covering an existing tattoo. He listened to my ideas and had the most beautiful concept drawn up. If you want your body to become a walking piece of art, contact him!" },
      { "@type": "Review", "author": { "@type": "Person", "name": "Emily Heacock" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Love my new tattoo! Dani is very professional and communicative. He makes you feel very welcome and comfortable through the process. Will definitely be going back for future tattoos!" },
      { "@type": "Review", "author": { "@type": "Person", "name": "Jessica Allen" }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "I have gone to Dani for the past 3 years and gotten 3 different tattoos from him. He is very professional but also exceptionally talented and fast! You will not be disappointed!" }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
    </>
  )
}
