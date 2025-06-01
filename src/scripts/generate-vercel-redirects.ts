import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { DEFAULT_LOCALE } from '@/config/i18n-config'

const CONTENT_DIR = path.resolve('src/content/pages')
const VERCEL_JSON_PATH = path.resolve('vercel.json')

type Redirect = {
  source: string
  destination: string
  permanent: boolean
}

const MANUAL_REDIRECTS: Redirect[] = [
  {
    source: '/',
    destination: `/${DEFAULT_LOCALE}`,
    permanent: true,
  },
]

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name)
      return entry.isDirectory() ? getAllMarkdownFiles(res) : res
    }),
  )

  return files.flat().filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

async function extractRedirectsFromContent(): Promise<Redirect[]> {
  const files = await getAllMarkdownFiles(CONTENT_DIR)
  const redirects: Redirect[] = []

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8')
    const { data } = matter(raw)

    const slug = data?.slug
    const lang = data?.lang
    const alternates: Record<string, string> = data?.alternates?.languages

    if (!slug || !lang || !alternates || typeof alternates !== 'object') continue

    for (const [locale, destPath] of Object.entries(alternates)) {
      const sourcePath = `/${locale}/${slug}`
      if (sourcePath !== destPath) {
        redirects.push({
          source: sourcePath,
          destination: destPath,
          permanent: true,
        })
      }
    }
  }

  return redirects
}

async function updateVercelRedirects() {
  const redirects = await extractRedirectsFromContent()

  redirects.unshift(...MANUAL_REDIRECTS)

  let vercelConfig = { redirects: [] as Redirect[] }
  try {
    const existing = await fs.readFile(VERCEL_JSON_PATH, 'utf-8')
    vercelConfig = JSON.parse(existing)
  } catch {
    console.warn('⚠️ No existing vercel.json found. Creating a new one.')
  }

  vercelConfig.redirects = redirects

  await fs.writeFile(VERCEL_JSON_PATH, JSON.stringify(vercelConfig, null, 2), 'utf-8')
  console.log(`✅ Wrote ${redirects.length} redirects to vercel.json`)
}

updateVercelRedirects().catch((err) => {
  console.error('❌ Failed to generate redirects:', err)
  process.exit(1)
})
