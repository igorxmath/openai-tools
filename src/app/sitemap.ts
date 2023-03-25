export default async function sitemap() {
  const routes = ['/blog', '/about', '/contact']
  return routes.map((route) => {
    return {
      url: `https://ai.igormatheus.com.br${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }
  })
}
