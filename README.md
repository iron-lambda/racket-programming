# Racket 编程

一本关于 Racket 编程语言的在线技术书籍网站，涵盖核心语法、Web 开发、GUI 开发和 AI 开发四个部分。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **渲染**: 静态导出 (Static Export)
- **样式**: Tailwind CSS
- **内容**: MDX / Markdown
- **部署**: Vercel

## 项目结构

```
racket-book/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 首页（书籍封面）
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式
│   ├── mdx-components.tsx  # MDX 自定义组件
│   └── book/               # 书籍阅读页
│       ├── layout.tsx      # 书籍布局（侧边栏 + 内容区）
│       ├── part-1/         # 第一部分：Racket 核心
│       ├── part-2/         # 第二部分：Web 开发
│       ├── part-3/         # 第三部分：GUI 开发
│       └── part-4/         # 第四部分：AI 开发
├── components/             # React 组件
│   ├── Sidebar.tsx         # 侧边导航
│   ├── BookHeader.tsx      # 移动端头部
│   └── ChapterNav.tsx      # 章节前后导航
├── content/                # 书籍内容（MDX 文件）
│   ├── part-1/
│   ├── part-2/
│   ├── part-3/
│   └── part-4/
├── lib/                    # 工具函数
│   ├── content.ts          # 内容数据（客户端可用）
│   ├── content-server.ts   # 内容读取（服务端专用）
│   ├── content-data.json   # 构建时生成的内容索引
│   └── utils.ts            # 工具函数
├── scripts/                # 构建脚本
│   └── build-content.js    # 生成内容索引
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态站点
npm run build
```

## 添加新章节

1. 在 `content/part-N/` 目录下创建 `.mdx` 文件
2. 文件第一行用 `# 标题` 作为章节标题
3. 第二行用 `> 描述` 作为章节简介
4. 重新运行 `npm run build` 即可自动生成新页面

命名规范：`01-title.mdx`、`02-next-topic.mdx`，数字前缀控制排序。

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入该仓库
3. 构建命令保持默认 `npm run build`
4. 输出目录设为 `dist`
5. 点击部署

## 作者

吉人
