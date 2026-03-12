const posts = [
  {
    id: 1,
    slug: 'hello-world',
    title: '你好，文字极客的世界',
    excerpt: '欢迎来到我的博客！这里是一个记录技术探索、生活感悟和创意想法的空间。在这个数字化的时代，文字依然是最有力量的表达方式。',
    content: `
欢迎来到"我的文字极客"！这是我的第一篇博客文章。

## 为什么叫文字极客？

在这个短视频盛行的时代，我依然相信文字的力量。每一个字符、每一段代码，都承载着思想的重量。作为一个极客，我不仅对技术充满热情，更对用文字记录和分享这份热情乐此不疲。

## 这个博客会写什么？

这里会记录：

- **技术探索**：前端、后端、架构设计等技术心得
- **开源项目**：我参与和维护的开源项目分享
- **生活感悟**：技术之外的思考与感悟
- **学习笔记**：各种学习过程中的知识整理

## 技术栈

这个博客本身也是一个有趣的技术实践，使用了：

\`\`\`javascript
const techStack = {
  framework: 'React 19',
  bundler: 'Vite',
  router: 'React Router v7',
  styling: 'Pure CSS with Custom Properties',
  icons: 'React Icons',
}
\`\`\`

希望你会喜欢这里，欢迎常来逛逛！
    `,
    date: '2026-03-12',
    tags: ['随笔', '公告'],
    coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    slug: 'react-hooks-deep-dive',
    title: '深入理解 React Hooks：从原理到实战',
    excerpt: 'React Hooks 彻底改变了我们编写 React 组件的方式。本文将从底层原理出发，带你深入理解 useState、useEffect 等核心 Hooks 的工作机制。',
    content: `
React Hooks 是 React 16.8 引入的特性，它让函数组件也能拥有状态和生命周期等能力。

## useState 的工作原理

\`useState\` 是最基础的 Hook，它让函数组件可以拥有自己的状态：

\`\`\`jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  )
}
\`\`\`

### Fiber 架构中的 Hooks

在 React 的 Fiber 架构中，每个组件对应一个 Fiber 节点。Hooks 的状态存储在 Fiber 节点的 \`memoizedState\` 属性上，以链表的形式串联起来。

## useEffect 的执行时机

\`useEffect\` 的回调函数会在浏览器完成布局和绘制之后异步执行：

\`\`\`jsx
useEffect(() => {
  // 这里的代码在 DOM 更新后执行
  document.title = \`你点击了 \${count} 次\`
  
  return () => {
    // 清理函数在下一次 effect 执行前调用
  }
}, [count]) // 仅在 count 变化时重新执行
\`\`\`

## 自定义 Hooks

自定义 Hooks 是复用状态逻辑的绝佳方式：

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
\`\`\`

## 最佳实践

1. **不要在条件语句中调用 Hooks** —— Hooks 依赖调用顺序
2. **合理使用依赖数组** —— 避免无限循环
3. **使用 useCallback 和 useMemo 优化性能** —— 但不要过度优化
4. **将复杂逻辑抽取为自定义 Hooks** —— 提高代码复用性

掌握 Hooks 的原理，能让你写出更优雅、更高效的 React 代码。
    `,
    date: '2026-03-10',
    tags: ['React', '前端', '教程'],
  },
  {
    id: 3,
    slug: 'css-modern-layout',
    title: '现代 CSS 布局技术：Grid 与 Flexbox 实战指南',
    excerpt: 'CSS Grid 和 Flexbox 是现代 Web 布局的两大利器。本文通过实际案例，对比两种布局方式的适用场景和最佳实践。',
    content: `
CSS 布局技术已经发展到了一个令人兴奋的阶段。Grid 和 Flexbox 让我们可以轻松实现过去需要大量 hack 才能完成的布局。

## Flexbox：一维布局之王

Flexbox 擅长处理一维布局，无论是水平还是垂直方向：

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

### 常见的 Flexbox 模式

**居中对齐**（最经典的用法）：
\`\`\`css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

## CSS Grid：二维布局之神

Grid 在处理二维布局时无可匹敌：

\`\`\`css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.featured-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 1.5rem;
}

.featured-layout .main-article {
  grid-row: 1 / -1;
}
\`\`\`

## 实际项目中的选择

| 场景 | 推荐方案 |
|------|---------|
| 导航栏 | Flexbox |
| 卡片列表 | Grid |
| 表单布局 | Grid |
| 侧边栏布局 | Grid |
| 按钮组 | Flexbox |
| 页面整体布局 | Grid |

## Container Queries：未来已来

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

现代 CSS 布局让 Web 开发变得更加有趣和高效。拥抱这些新特性，你的页面将更加灵活和优雅。
    `,
    date: '2026-03-08',
    tags: ['CSS', '前端', '布局'],
    coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    slug: 'terminal-productivity',
    title: '终端效率指南：打造你的命令行工作流',
    excerpt: '高效的终端使用能极大提升开发效率。从 Shell 配置到实用工具，本文分享一套完整的终端效率提升方案。',
    content: `
作为开发者，终端是我们每天都要使用的工具。一个配置得当的终端环境，能让你的开发效率翻倍。

## Zsh + Oh My Zsh

首先推荐使用 Zsh 配合 Oh My Zsh：

\`\`\`bash
# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 常用插件
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  z
  docker
  node
  npm
)
\`\`\`

## 必备命令行工具

### 1. fzf —— 模糊搜索

\`\`\`bash
# 搜索文件
fzf

# 搜索历史命令
ctrl + r

# 配合其他命令使用
git checkout $(git branch | fzf)
\`\`\`

### 2. ripgrep —— 快速搜索

\`\`\`bash
# 搜索代码中的特定字符串
rg "useState" --type jsx

# 忽略特定目录
rg "TODO" --glob '!node_modules'
\`\`\`

### 3. eza —— 现代化 ls

\`\`\`bash
# 替代 ls
alias ls='eza --icons'
alias ll='eza -la --icons --git'
alias tree='eza --tree --icons'
\`\`\`

## Git 别名加速

\`\`\`bash
# ~/.gitconfig
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  lg = log --oneline --graph --decorate
  last = log -1 HEAD
  unstage = reset HEAD --
\`\`\`

## tmux 多窗口管理

\`\`\`bash
# 创建新会话
tmux new -s dev

# 常用快捷键（prefix 默认是 Ctrl+b）
# prefix + c    创建新窗口
# prefix + ,    重命名窗口
# prefix + %    水平分屏
# prefix + "    垂直分屏
\`\`\`

## 我的效率原则

1. **能用键盘的不用鼠标**
2. **重复三次以上就写脚本**
3. **善用 alias 减少键入**
4. **保持终端环境一致性**

好的工具配置是一次性投资，但回报是每一天的效率提升。
    `,
    date: '2026-03-05',
    tags: ['工具', '效率', '终端'],
    coverColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: 5,
    slug: 'javascript-async-patterns',
    title: 'JavaScript 异步编程模式演进',
    excerpt: '从回调地狱到 Promise，再到 async/await，JavaScript 的异步编程经历了怎样的演进？本文梳理各种异步模式的优劣与最佳实践。',
    content: `
JavaScript 是一门单线程语言，异步编程是其核心特性之一。

## 回调函数时代

最早的异步处理方式是回调函数：

\`\`\`javascript
// 回调地狱
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetMoreData(c, function(d) {
        console.log('最终结果:', d)
      })
    })
  })
})
\`\`\`

这种嵌套方式被称为"回调地狱"，代码可读性极差。

## Promise 的救赎

Promise 提供了更优雅的链式调用：

\`\`\`javascript
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => getYetMoreData(c))
  .then(d => console.log('最终结果:', d))
  .catch(err => console.error('出错了:', err))
\`\`\`

### Promise 的并发控制

\`\`\`javascript
// 并行执行
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
])

// 竞速模式
const fastest = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2()
])

// 全部settle
const results = await Promise.allSettled([
  riskyOperation1(),
  riskyOperation2()
])
\`\`\`

## async/await：同步的写法

async/await 让异步代码看起来像同步代码：

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const user = await getUser(userId)
    const posts = await getUserPosts(user.id)
    const comments = await getPostComments(posts[0].id)
    
    return { user, posts, comments }
  } catch (error) {
    console.error('获取用户数据失败:', error)
    throw error
  }
}
\`\`\`

## 高级模式：异步迭代器

\`\`\`javascript
async function* fetchPages(url) {
  let nextUrl = url
  while (nextUrl) {
    const response = await fetch(nextUrl)
    const data = await response.json()
    nextUrl = data.next
    yield data.results
  }
}

// 使用
for await (const page of fetchPages('/api/items')) {
  console.log('获取到一页数据:', page)
}
\`\`\`

异步编程是 JavaScript 的灵魂，理解其演进历程，才能在实际开发中做出最佳选择。
    `,
    date: '2026-03-01',
    tags: ['JavaScript', '前端', '异步'],
  },
  {
    id: 6,
    slug: 'developer-reading-list',
    title: '2026 年开发者必读书单推荐',
    excerpt: '整理了一份涵盖编程基础、软件架构、个人成长等方面的书单，帮助你在新的一年系统性地提升技术实力。',
    content: `
新的一年，是时候更新你的阅读清单了。以下是我精心挑选的书籍推荐。

## 编程基础

### 《代码整洁之道》— Robert C. Martin

> "写代码就像写文章，首先要让人能读懂。"

这本书教会你如何写出清晰、可维护的代码。即使你已经有多年经验，重读这本书依然会有新的收获。

### 《重构：改善既有代码的设计》— Martin Fowler

重构是每个开发者的必备技能。这本书系统性地介绍了各种重构手法和时机。

## 软件架构

### 《设计数据密集型应用》— Martin Kleppmann

\`\`\`
涵盖内容：
├── 数据模型与查询语言
├── 存储与检索
├── 编码与演化
├── 分布式数据
│   ├── 复制
│   ├── 分区
│   └── 事务
└── 派生数据
    ├── 批处理
    └── 流处理
\`\`\`

这是理解现代分布式系统的最佳入门书籍。

### 《凤凰项目》— Gene Kim

以小说的形式讲述 DevOps 理念，非常适合了解现代软件交付流程。

## 个人成长

### 《深度工作》— Cal Newport

在这个充满干扰的时代，深度工作的能力变得越来越珍贵。

### 《程序员修炼之道》— Andrew Hunt & David Thomas

每一个严肃对待编程的开发者都应该读这本书。它教你如何成为一个真正的匠人。

## 前沿技术

### 《AI 辅助编程实战》

学会与 AI 协作编程，这将是未来几年最重要的开发者技能之一。

## 阅读建议

1. **不要贪多** —— 每月精读一本比泛读五本更有价值
2. **做读书笔记** —— 写下你的理解和思考
3. **实践驱动** —— 读完立刻在项目中尝试
4. **定期回顾** —— 好书值得反复阅读

希望这份书单能帮你在 2026 年有所收获。
    `,
    date: '2026-02-25',
    tags: ['阅读', '成长', '推荐'],
    coverColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  },
]

export default posts

export function getPostBySlug(slug) {
  return posts.find(post => post.slug === slug)
}

export function getPostsByTag(tag) {
  return posts.filter(post => post.tags.includes(tag))
}

export function getAllTags() {
  const tagSet = new Set()
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet)
}
