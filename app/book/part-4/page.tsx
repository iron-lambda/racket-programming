import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getParts } from '@/lib/content'

export default function Part4Page() {
  const part = getParts().find(p => p.id === 'part-4')!

  return (
    <div>
      <div className="mb-8">
        <div className="text-sm text-racket-600 font-medium mb-2">第 4 部分</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{part.title}</h1>
        <p className="text-lg text-gray-600">{part.subtitle}</p>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8">{part.description}</p>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">章节列表</h2>
        {part.chapters.length === 0 ? (
          <p className="text-gray-500 italic">章节内容正在编写中...</p>
        ) : (
          part.chapters.map((ch, i) => (
            <Link
              key={ch.slug}
              href={`/book/part-4/chapter/${ch.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-racket-300 hover:bg-racket-50 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-racket-100 text-racket-700 flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{ch.title}</h3>
                {ch.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{ch.description}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-racket-600 transition-colors" />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
