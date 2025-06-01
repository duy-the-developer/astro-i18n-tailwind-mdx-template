import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { linkSchema } from './link-schema'

export const globalSchema = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: './src/content/global',
    generateId: ({ entry }) => entry.replace(/\.yaml$/, ''),
  }),
  schema: z.object({
    site: z.object({
      name: z.string(),
    }),
    navigation: z.object({
      header: z.object({
        cta: linkSchema,
        links: z.array(linkSchema),
      }),
      footer: z.object({
        copyrightLine: z.string(),
        links: z.array(linkSchema),
      }),
    }),
    contactForm: z
      .object({
        headline: z.string(),
        description: z.string(),
        formLabels: z.object({
          fullName: z.string(),
          email: z.string(),
          phone: z.string(),
          message: z.string(),
          cta: z.string(),
          success: z.string(),
          error: z.string(),
          thankYou: z.string(),
        }),
      })
      .required(),
  }),
})
