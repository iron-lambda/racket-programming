import fs from 'fs'
import path from 'path'
import contentData from './content-data.json'

export interface Chapter {
  slug: string
  title: string
  description: string
}

export interface Part {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  chapters: Chapter[]
}

const contentDir = path.join(process.cwd(), 'content')

export function getParts(): Part[] {
  return contentData.parts as Part[]
}

export function getChapterContent(partId: string, slug: string): string {
  const filePath = path.join(contentDir, partId, `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8')
  }
  const mdPath = path.join(contentDir, partId, `${slug}.md`)
  if (fs.existsSync(mdPath)) {
    return fs.readFileSync(mdPath, 'utf-8')
  }
  return ''
}

export function getAllChapterPaths(): { part: string; slug: string }[] {
  return contentData.paths as { part: string; slug: string }[]
}
