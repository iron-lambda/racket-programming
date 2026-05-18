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
    title: 'Racket 语言核心',
    subtitle: 'Core Language',
    description: '从零开始掌握 Racket 的核心概念：S-表达式、数据类型、函数、控制流、列表与递归、结构体以及模块系统。',
    chapters: getChapters('part-1'),
  },
  {
    id: 'part-2',
    number: 2,
    title: '高级特性',
    subtitle: 'Advanced Features',
    description: '掌握 Racket 的进阶能力：模式匹配、宏系统、异常处理与契约编程、并发编程以及正则表达式。',
    chapters: getChapters('part-2'),
  },
  {
    id: 'part-3',
    number: 3,
    title: '应用开发实战',
    subtitle: 'Applied Development',
    description: '用 Racket 构建真实应用：Web 服务、数据库操作、RESTful API、桌面 GUI 应用、命令行工具，以及综合项目实战。',
    chapters: getChapters('part-3'),
  },
  {
    id: 'part-4',
    number: 4,
    title: '语言设计',
    subtitle: 'Language Design',
    description: 'Racket 最独特的能力——用宏和 #lang 创造新的编程语言。从 DSL 理念到类型系统，掌握语言设计的核心思想。',
    chapters: getChapters('part-4'),
  },
];

const data = {
  parts: partsData,
  paths: getAllChapterPaths(),
};

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log('Content data generated:', outputFile);
