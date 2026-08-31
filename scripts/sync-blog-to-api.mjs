// One-off migration: pushes the local MDX blog collection (src/content/blog/,
// still the source of truth for src/content.config.ts) through the API's
// content pipeline so it lands in arthu-pr/use-github-actions ahead of the
// site fully cutting the /blog pages over to the API-backed data. Safe to
// re-run — `BlogsController.create` always mints a new entry keyed by slug,
// so re-running against posts that already made it through will 409/slug-clash
// rather than duplicate; delete the stale one first if you need to re-sync.
import matter from 'gray-matter'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const BLOG_DIR = fileURLToPath(new URL('../src/content/blog', import.meta.url))
const API_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:3333'

const markdownToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify, { allowDangerousHtml: true })

async function main() {
  const files = (await readdir(BLOG_DIR)).filter((f) => /\.(md|mdx)$/.test(f))

  if (files.length === 0) {
    console.log('No local blog posts found under src/content/blog/.')
    return
  }

  console.log(`Syncing ${files.length} post(s) to ${API_URL}/content/blog…`)

  for (const file of files) {
    const raw = await readFile(`${BLOG_DIR}/${file}`, 'utf-8')
    const { data, content } = matter(raw)
    const body = String(await markdownToHtml.process(content))

    const payload = {
      title: data.title,
      description: data.description ?? '',
      body,
      tags: [],
    }

    try {
      const response = await fetch(`${API_URL}/content/blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error(`✗ ${file} — ${response.status} ${await response.text()}`)
        continue
      }

      const created = await response.json()
      console.log(`✓ ${file} → ${created.slug}`)
    } catch (error) {
      console.error(`✗ ${file} — ${error}`)
    }
  }
}

main()
