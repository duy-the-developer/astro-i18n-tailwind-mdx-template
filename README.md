# Astro i18n Tailwind MDX Template

A lean, statically-generated, multilingual site template built with **[Astro](https://astro.build)**, styled with **TailwindCSS**, powered by **MDX**, and enhanced with **React components** via **shadcn/ui**. Optimized for SEO, performance, and a scalable content structure.

## 🌍 Features

- ✅ Full **i18n** setup with localized routes and slugs
- 🗂️ **Content collections** powered by Astro’s `content/config` API
- 📝 Editable pages using **MDX**
- 🌐 **Language switcher** with route awareness
- 🔀 **Static redirects** for unmatched locales & path mismatches
- ⚡ 100% **static** (SSG) & deployable to Vercel
- 💅 Styled with TailwindCSS & `shadcn/ui` components
- 🔍 SEO-friendly with `hreflang`, canonical URLs, Open Graph tags, and more

---

## 📦 Tech Stack

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)
- TypeScript + Zod + YAML for content structure

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/duy-the-developer/astro-i18n-tailwind-mdx-template.git
cd astro-i18n-tailwind-mdx-template
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run dev server

```bash
pnpm dev
```

## Scripts

Generate localized redirects (for Vercel)

```bash
pnpm run generate:redirects
```

This scans all MDX files for `slug` and `alternates`, and generates proper `vercel.json` redirects to handle mismatched slugs and locale-less URLs.

## Project Structure

```
.
├── src/
│   ├── content/         ← MDX/YAML content
│   ├── config/          ← i18n config
│   ├── layouts/         ← Shared layouts
│   ├── pages/           ← Dynamic routes via [locale] and [...slug]
│   ├── schemas/         ← Zod schemas for content collections
│   └── components/      ← UI + LanguageSwitcher
├── public/              ← Static assets
├── astro.config.mjs     ← Astro config (i18n enabled)
├── vercel.json          ← Generated static redirects
└── tsconfig.json        ← TypeScript config
```
