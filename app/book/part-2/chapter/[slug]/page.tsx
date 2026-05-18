import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getParts, getAllChapterPaths } from '@/lib/content'
import { getChapterContent } from '@/lib/content-server'
import ChapterNav from '@/components/ChapterNav'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

export async function generateStaticParams() {
  const paths = getAllChapterPaths()
  return paths
    .filter(p => p.part === 'part-2')
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const parts = getParts()
  const part = parts.find(p => p.id === 'part-2')!
  const chapter = part.chapters.find(c => c.slug === params.slug)
  if (!chapter) return { title: '章节未找到' }
  return { title: `${chapter.title} | 第 2 部分 · Web 开发` }
}

export default async function ChapterPage({ params }: { params: { slug: string } }) {
  const parts = getParts()
  const part = parts.find(p => p.id === 'part-2')!
  const chapter = part.chapters.find(c => c.slug === params.slug)

  if (!chapter) {
    notFound()
  }

  const content = getChapterContent('part-2', params.slug)

  if (!content) {
    notFound()
  }

  return (
    <article>
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="text-sm text-racket-600 font-medium mb-2">
          第 2 部分 · {part.title}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{chapter.title}</h1>
      </div>
      <div className="prose max-w-none">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>
      <ChapterNav currentPart="part-2" currentSlug={params.slug} />
    </article>
  )
}
