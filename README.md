# Racket 编程

一本关于 Racket 编程语言的在线书籍，从核心语言到应用开发。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **内容**: MDX / Markdown
- **部署**: Vercel

## 本地开发

```bash
npm install
npm run dev
```

## 添加新章节

1. 在 `content/part-N/` 目录下创建 `.mdx` 文件
2. 文件第一行用 `# 标题` 作为章节标题
3. 第二行用 `> 描述` 作为章节简介
4. 重新运行 `npm run build` 即可自动生成新页面

命名规范：`01-title.mdx`、`02-next-topic.mdx`，数字前缀控制排序。

## 作者

吉人
