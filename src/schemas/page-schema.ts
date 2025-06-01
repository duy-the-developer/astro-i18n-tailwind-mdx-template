import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

export const pageSchema = defineCollection({
  loader: glob({
    pattern: '**/*.(md|mdx)',
    base: './src/content/pages',
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    lang: z.string(),
    images: z.string(),
    alternates: z.object({
      languages: z.object({ en: z.string(), fr: z.string() }),
    }),
  }),
})
