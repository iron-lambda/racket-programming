import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getParts } from '@/lib/content'

interface ChapterNavProps {
  currentPart: string
  currentSlug: string
}

export default function ChapterNav({ currentPart, currentSlug }: ChapterNavProps) {
  const parts = getParts()
  const allChapters = parts.flatMap(p =>
    p.chapters.map(c => ({ ...c, partId: p.id, partNum: p.number }))
  )

  const currentIndex = allChapters.findIndex(
    c => c.partId === currentPart && c.slug === currentSlug
  )
  const prev = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const next = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <div className="mt-16 pt-8 border-t border-sand-200 flex items-center justify-between">
      {prev ? (
        <Link
          href={`/book/${prev.partId}/chapter/${prev.slug}`}
          className="group flex items-center gap-2 text-sm text-sand-500 hover:text-sand-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="truncate max-w-[200px]">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/book/${next.partId}/chapter/${next.slug}`}
          className="group flex items-center gap-2 text-sm text-sand-500 hover:text-sand-900 transition-colors"
        >
          <span className="truncate max-w-[200px]">{next.title}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
