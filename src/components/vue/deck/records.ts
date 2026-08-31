import type { Project } from '../../../types/index.ts'
import type { DeckIconName } from './icons/paths'

export interface DeckRecord {
  key: string
  index: string
  title: string
  description: string
  tags: string[]
  status: string
  live: boolean
  picture?: string
  /** Full text for the drawer; `description` is the clamped card line. */
  body: string
  specs: Array<[string, string]>
  links: Array<{ url: string; label: string; icon: DeckIconName }>
  section?: boolean
  icon?: DeckIconName
}

/**
 * `description` comes back as rich HTML from the editor. A card line has room
 * for a sentence, not markup, so flatten it to text rather than rendering it —
 * which also keeps editor content out of v-html.
 */
function toPlainText(html: string | undefined, limit = 180): string {
  const text = (html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= limit) return text
  return `${text.slice(0, text.lastIndexOf(' ', limit))}…`
}

/** Tags serialise as objects on some endpoints and bare strings on others. */
function labelsOf(tags: Project['tags']): string[] {
  return (tags ?? [])
    .map((tag) => (typeof tag === 'string' ? tag : tag?.label))
    .filter((label): label is string => Boolean(label))
}

/** A link's icon is guessed from its label, so the API stays icon-agnostic. */
function iconFor(label: string): DeckIconName {
  const l = label.toLowerCase()
  if (l.includes('git') || l.includes('source') || l.includes('repo')) return 'code'
  if (l.includes('npm') || l.includes('package')) return 'box'
  if (l.includes('doc')) return 'doc'
  return 'out'
}

export function toRecord(project: Project, i: number): DeckRecord {
  const updated = project.updatedAt ? new Date(project.updatedAt) : undefined
  const live = (project.links ?? []).some((link) => !/git|npm/i.test(link.label))

  return {
    key: project.id ?? project.slug ?? String(i),
    index: String(i + 1).padStart(2, '0'),
    title: project.name,
    description: toPlainText(project.description),
    body: toPlainText(project.description, 1200),
    picture: (project.pictures ?? [])[0],
    tags: labelsOf(project.tags),
    status: live ? 'Deployed' : 'Source',
    live,
    specs: [
      ['Stack', labelsOf(project.tags).slice(0, 2).join(' · ') || '—'],
      ['Links', String((project.links ?? []).length)],
      ['Slug', project.slug ?? '—'],
      ['Updated', updated ? updated.toISOString().slice(0, 10) : '—'],
    ],
    links: (project.links ?? []).map((link) => ({
      url: link.url,
      label: link.label,
      icon: iconFor(link.label),
    })),
  }
}

/** Real site destinations, carried in the lattice alongside the records. */
export const SECTIONS: DeckRecord[] = [
  {
    key: 'section-blog',
    index: '',
    title: 'Blog',
    description: 'Longer write-ups on build tooling, design systems and the parts that broke.',
    tags: [],
    status: '',
    live: false,
    specs: [],
    links: [],
    body: '',
    section: true,
    icon: 'doc',
  },
  {
    key: 'section-snippets',
    index: '',
    title: 'Snippets',
    description: 'Short, copyable solutions. Filed by language, no preamble.',
    tags: [],
    status: '',
    live: false,
    specs: [],
    links: [],
    body: '',
    section: true,
    icon: 'terminal',
  },
  {
    key: 'section-contact',
    index: '',
    title: 'Contact',
    description: 'Open to contract and full-time work.',
    tags: [],
    status: '',
    live: false,
    specs: [],
    links: [],
    body: '',
    section: true,
    icon: 'mail',
  },
]
