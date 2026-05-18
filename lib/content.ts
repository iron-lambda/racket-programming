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

export function getParts(): Part[] {
  return contentData.parts as Part[]
}

export function getAllChapterPaths(): { part: string; slug: string }[] {
  return contentData.paths as { part: string; slug: string }[]
}
