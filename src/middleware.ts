import { defineMiddleware, sequence } from 'astro/middleware'
import { getCollection } from 'astro:content'
import { middleware as i18nMiddleware } from 'astro:i18n'
import { ACCEPTED_LOCALES } from './config/i18n-config'

const customI18nMiddleware = defineMiddleware(async (ctx, next) => {
  const pathname = ctx.url.pathname

  const routeSegments = pathname.split('/')
  const localePrefix = routeSegments.shift()

  if (!localePrefix) {
    // Load all content entries
    const pages = await getCollection('pages')

    // Try to match the pathname to any alternate path (e.g. "/about", "/apropos")
    const matchedPage = pages.find((page) => {
      // find page with exact slug match
      return page.data.slug === routeSegments.filter((r) => r !== '').join('/')
    })

    console.log({ matchedPage })

    if (matchedPage) {
      const acceptLang = ctx.request.headers.get('accept-language') || ''
      const preferredLang = acceptLang.toLowerCase().startsWith('fr') ? 'fr' : 'en'
      const redirectPath = matchedPage.data.alternates.languages[preferredLang]

      if (redirectPath) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: redirectPath,
          },
        })
      }
    }

    // Otherwise, continue to the next middleware
    return next()
  }

  return next()
})

export const onRequest = sequence(
  customI18nMiddleware,
  i18nMiddleware({
    redirectToDefaultLocale: false,
    prefixDefaultLocale: true,
    fallbackType: 'rewrite',
  }),
)
