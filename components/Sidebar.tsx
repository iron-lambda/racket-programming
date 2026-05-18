'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getParts } from '@/lib/content'
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const parts = getParts()

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    parts.forEach(p => { initial[p.id] = true })
    return initial
  })

  const togglePart = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-racket-700 hover:text-racket-800">
          <BookOpen className="w-5 h-5" />
          <span className="font-bold text-lg">Racket 编程</span>
        </Link>
      </div>
      <nav className="p-2">
        {parts.map(part => (
          <div key={part.id} className="mb-2">
            <button
              onClick={() => togglePart(part.id)}
              className={cn(
                'w-full flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname.startsWith(`/book/${part.id}`)
                  ? 'bg-racket-50 text-racket-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {expanded[part.id] ? (
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="truncate">
                {part.number}. {part.title}
              </span>
            </button>
            {expanded[part.id] && part.chapters.length > 0 && (
              <div className="ml-6 mt-1 space-y-0.5">
                {part.chapters.map(ch => (
                  <Link
                    key={ch.slug}
                    href={`/book/${part.id}/chapter/${ch.slug}`}
                    className={cn(
                      'block px-3 py-1.5 rounded-md text-sm transition-colors truncate',
                      pathname === `/book/${part.id}/chapter/${ch.slug}`
                        ? 'bg-racket-100 text-racket-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {ch.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
