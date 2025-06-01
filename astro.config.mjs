// @ts-check
import { defineConfig } from 'astro/config'
import { ACCEPTED_LOCALES, DEFAULT_LOCALE } from './src/config/i18n-config'

import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import react from '@astrojs/react'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'directory',
  },

  trailingSlash: 'ignore',

  i18n: {
    locales: ACCEPTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    fallback: {
      'en-US': 'en',
      'en-CA': 'en',
      'fr-CA': 'fr',
    },
    routing: 'manual',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), react()],
  adapter: vercel({
    edgeMiddleware: true,
  }),
})

