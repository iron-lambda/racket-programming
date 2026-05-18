import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getParts, getAllChapterPaths } from '@/lib/content'
import { getChapterContent } from '@/lib/content-server'
import ChapterNav from '@/components/ChapterNav'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

const partId = 'part-2'
const partMeta = { number: 2, title: '高级特性' }

export async function generateStaticParams() {
  const paths = getAllChapterPaths()
  return paths
    .filter(p => p.part === partId)
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const parts = getParts()
  const part = parts.find(p => p.id === partId)!
  const chapter = part.chapters.find(c => c.slug === params.slug)
  if (!chapter) return { title: '章节未找到' }
  return { title: `${chapter.title} | 第 ${partMeta.number} 部分 · ${partMeta.title}` }
}

export default async function ChapterPage({ params }: { params: { slug: string } }) {
  const parts = getParts()
  const part = parts.find(p => p.id === partId)!
  const chapter = part.chapters.find(c => c.slug === params.slug)

  if (!chapter) notFound()

  const content = getChapterContent(partId, params.slug)
  if (!content) notFound()

  return (
    <article>
      <div className="mb-8 pb-4 border-b border-sand-200">
        <p className="text-xs tracking-widest uppercase text-sand-500 mb-2">
          第 {partMeta.number} 部分 · {partMeta.title}
        </p>
        <h1 className="text-3xl font-bold text-sand-900 tracking-tight">{chapter.title}</h1>
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
      <ChapterNav currentPart={partId} currentSlug={params.slug} />
    </article>
  )
}
