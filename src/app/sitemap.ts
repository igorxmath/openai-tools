export default async function sitemap() {
  const routes = ['', '/chat', '/search'].map((route) => ({
    url: `https://ai.igormatheus.com.br${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
