import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Racket 编程',
  description: '从核心语言到应用开发，全面掌握 Racket 编程。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  )
}
