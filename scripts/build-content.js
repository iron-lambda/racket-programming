const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'lib', 'content-data.json');

function getChapters(partId) {
  const partDir = path.join(contentDir, partId);
  if (!fs.existsSync(partDir)) return [];

  const files = fs.readdirSync(partDir);
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => {
      const slug = f.replace(/\.(mdx|md)$/, '');
      const content = fs.readFileSync(path.join(partDir, f), 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const descMatch = content.match(/^>\s+(.+)$/m);
      return {
        slug,
        title: titleMatch ? titleMatch[1] : slug,
        description: descMatch ? descMatch[1] : '',
      };
    })
    .sort((a, b) => {
      const numA = parseInt(a.slug.split('-')[0]) || 0;
      const numB = parseInt(b.slug.split('-')[0]) || 0;
      return numA - numB;
    });
}

function getAllChapterPaths() {
  const paths = [];
  for (const part of ['part-1', 'part-2', 'part-3', 'part-4']) {
    const partDir = path.join(contentDir, part);
    if (!fs.existsSync(partDir)) continue;
    const files = fs.readdirSync(partDir);
    for (const f of files) {
      if (f.endsWith('.mdx') || f.endsWith('.md')) {
        paths.push({ part, slug: f.replace(/\.(mdx|md)$/, '') });
      }
    }
  }
  return paths;
}

const partsData = [
  {
    id: 'part-1',
    number: 1,
    title: 'Racket 核心',
    subtitle: 'Core Racket',
    description: '深入理解 Racket 语言的核心概念，包括表达式、函数、数据结构、宏系统等基础知识。',
    chapters: getChapters('part-1'),
  },
  {
    id: 'part-2',
    number: 2,
    title: 'Web 开发',
    subtitle: 'Web Development',
    description: '使用 Racket 构建现代 Web 应用，涵盖 HTTP 服务、路由、模板、数据库连接等内容。',
    chapters: getChapters('part-2'),
  },
  {
    id: 'part-3',
    number: 3,
    title: 'GUI 开发',
    subtitle: 'GUI Development',
    description: '利用 Racket 强大的 GUI 框架创建桌面应用程序，包括窗口、控件、事件处理等。',
    chapters: getChapters('part-3'),
  },
  {
    id: 'part-4',
    number: 4,
    title: 'AI 开发',
    subtitle: 'AI Development',
    description: '探索 Racket 在人工智能领域的应用，包括机器学习、自然语言处理、符号推理等。',
    chapters: getChapters('part-4'),
  },
];

const data = {
  parts: partsData,
  paths: getAllChapterPaths(),
};

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log('Content data generated:', outputFile);
