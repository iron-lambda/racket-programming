import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Racket 编程 - 从核心到 AI',
  description: '一本关于 Racket 编程语言的全面指南，涵盖核心语法、Web 开发、GUI 开发和 AI 开发。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
