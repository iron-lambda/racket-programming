import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-sand-900 mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-sand-900 mt-10 mb-3 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-sand-800 mt-8 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sand-800 leading-[1.8] mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-sand-800 mb-4 space-y-1.5 list-disc pl-5 marker:text-sand-400">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-sand-800 mb-4 space-y-1.5 list-decimal pl-5 marker:text-sand-400">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-[1.8] pl-1">{children}</li>,
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-')
      if (isBlock) {
        return (
          <pre className="bg-sand-900 text-sand-100 rounded-lg p-5 overflow-x-auto text-sm my-6 font-mono leading-[1.7]">
            <code className={className}>{children}</code>
          </pre>
        )
      }
      return (
        <code className="bg-sand-100 text-accent-600 px-1.5 py-0.5 rounded text-[0.875em] font-mono">
          {children}
        </code>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-400 pl-4 py-1 my-6 text-sand-600 italic">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-accent-500 hover:text-accent-600 underline underline-offset-2 decoration-sand-300 hover:decoration-accent-300 transition-colors">
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b-2 border-sand-300 px-4 py-2 text-left text-sm font-semibold text-sand-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-sand-200 px-4 py-2 text-sm text-sand-700">
        {children}
      </td>
    ),
    hr: () => <hr className="my-10 border-sand-200" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-sand-900">{children}</strong>
    ),
    ...components,
  }
}
