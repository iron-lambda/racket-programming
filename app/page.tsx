import Link from 'next/link'
import { BookOpen, Code2, Globe, Monitor, Brain, ArrowRight } from 'lucide-react'
import { getParts } from '@/lib/content'

export default function HomePage() {
  const parts = getParts()

  const icons = [Code2, Globe, Monitor, Brain]

  return (
    <div className="min-h-screen bg-gradient-to-b from-racket-50 to-white">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-racket-100 text-racket-700 text-sm font-medium mb-8">
          <BookOpen className="w-4 h-4" />
          在线技术书籍
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Racket 编程
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          从核心语法到 AI 应用，全面掌握 Racket 编程语言
        </p>
        <p className="text-lg text-racket-600 font-medium">
          作者：吉人
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book/part-1"
            className="inline-flex items-center gap-2 px-6 py-3 bg-racket-600 text-white rounded-lg font-medium hover:bg-racket-700 transition-colors"
          >
            开始阅读
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://racket-lang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Racket 官网
          </a>
        </div>
      </header>

      {/* Parts Overview */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {parts.map((part, i) => {
            const Icon = icons[i]
            return (
              <Link
                key={part.id}
                href={`/book/${part.id}`}
                className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-racket-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-racket-100 flex items-center justify-center shrink-0 group-hover:bg-racket-200 transition-colors">
                    <Icon className="w-6 h-6 text-racket-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-racket-600 font-medium mb-1">
                      第 {part.number} 部分
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {part.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{part.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {part.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-racket-600 text-sm font-medium">
                      进入章节
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p> Racket 编程 · 由 吉人 创作</p>
        <p className="mt-1">使用 Next.js + MDX 构建</p>
      </footer>
    </div>
  )
}
