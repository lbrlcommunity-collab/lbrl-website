import { tattooServices } from '../lib/tattooServices'

const origin = 'https://www.lbrltattoos.com'
export default function sitemap() {
  return [
    { url: origin + '/', changeFrequency: 'monthly', priority: 1 },
    ...tattooServices.map(({ slug }) => ({
      url: origin + '/tattoos/' + slug,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
