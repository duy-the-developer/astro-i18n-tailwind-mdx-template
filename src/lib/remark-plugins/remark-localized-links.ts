import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'

export function remarkLocalizeLinks() {
  return (tree: Root, file: VFile) => {
    const lang = file.data.astro?.frontmatter?.lang
    visit(tree, 'link', (node) => {
      if (
        node.url.startsWith('/') &&
        !node.url.startsWith(`/${lang}/`) &&
        !node.url.startsWith('http')
      ) {
        node.url = `/${lang}${node.url}`
      }
    })
  }
}
