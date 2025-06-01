import { z } from 'astro:content'

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z
    .enum(['default', 'destructive', 'secondary', 'outlined', 'ghost', 'link'])
    .optional()
    .default('default'),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional().default('default'),
})
