import { useParams, Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { HiOutlineCalendar, HiOutlineTag, HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi'
import { getPostBySlug } from '../data/posts'
import posts from '../data/posts'

function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="not-found container">
        <h1>404</h1>
        <p>文章不存在</p>
        <Link to="/" className="btn-back">返回首页</Link>
      </div>
    )
  }

  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.trim().split('\n')
    const elements = []
    let inCodeBlock = false
    let codeLines = []
    let codeLang = ''
    let key = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={key++} className="code-block">
              <div className="code-block-header">
                <span className="code-lang">{codeLang || 'code'}</span>
              </div>
              <code>{codeLines.join('\n')}</code>
            </pre>
          )
          codeLines = []
          inCodeBlock = false
        } else {
          inCodeBlock = true
          codeLang = line.slice(3).trim()
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty line
      if (line.trim() === '') {
        continue
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(<h3 key={key++} className="post-h3">{line.slice(4)}</h3>)
        continue
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={key++} className="post-h2">{line.slice(3)}</h2>)
        continue
      }
      if (line.startsWith('# ')) {
        elements.push(<h1 key={key++} className="post-h1">{line.slice(2)}</h1>)
        continue
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={key++} className="post-blockquote">
            {line.slice(2)}
          </blockquote>
        )
        continue
      }

      // Table handling
      if (line.includes('|') && line.trim().startsWith('|')) {
        const tableLines = []
        let j = i
        while (j < lines.length && lines[j].includes('|') && lines[j].trim().startsWith('|')) {
          tableLines.push(lines[j])
          j++
        }
        i = j - 1

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim())
          const bodyLines = tableLines.slice(2) // skip separator
          elements.push(
            <div key={key++} className="table-wrapper">
              <table className="post-table">
                <thead>
                  <tr>{headerCells.map((cell, ci) => <th key={ci}>{cell}</th>)}</tr>
                </thead>
                <tbody>
                  {bodyLines.map((bLine, ri) => {
                    const cells = bLine.split('|').filter(c => c.trim()).map(c => c.trim())
                    return (
                      <tr key={ri}>{cells.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
          continue
        }
      }

      // Unordered list
      if (line.match(/^[-*] /)) {
        const listItems = [line.replace(/^[-*] /, '')]
        let j = i + 1
        while (j < lines.length && lines[j].match(/^[-*] /)) {
          listItems.push(lines[j].replace(/^[-*] /, ''))
          j++
        }
        i = j - 1
        elements.push(
          <ul key={key++} className="post-list">
            {listItems.map((item, li) => (
              <li key={li} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        )
        continue
      }

      // Ordered list
      if (line.match(/^\d+\. /)) {
        const listItems = [line.replace(/^\d+\. /, '')]
        let j = i + 1
        while (j < lines.length && lines[j].match(/^\d+\. /)) {
          listItems.push(lines[j].replace(/^\d+\. /, ''))
          j++
        }
        i = j - 1
        elements.push(
          <ol key={key++} className="post-list">
            {listItems.map((item, li) => (
              <li key={li} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        )
        continue
      }

      // Paragraph
      elements.push(
        <p key={key++} className="post-paragraph" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      )
    }

    return elements
  }

  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  return (
    <article className="post-page">
      {/* Post Header */}
      <div className="post-hero">
        <div className="post-hero-overlay" />
        <div className="post-hero-content container">
          <button className="btn-back-hero" onClick={() => navigate(-1)}>
            <HiOutlineArrowLeft /> 返回
          </button>
          <div className="post-hero-meta">
            <span className="post-hero-date">
              <HiOutlineCalendar />
              {dayjs(post.date).format('YYYY 年 M 月 D 日')}
            </span>
            <div className="post-hero-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag tag--light">
                  <HiOutlineTag /> {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="post-hero-title">{post.title}</h1>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content container">
        <div className="post-body">
          {renderContent(post.content)}
        </div>
      </div>

      {/* Post Navigation */}
      <div className="post-nav container">
        <div className="post-nav-inner">
          {prevPost ? (
            <Link to={`/post/${prevPost.slug}`} className="post-nav-link post-nav-prev">
              <span className="post-nav-label"><HiOutlineArrowLeft /> 上一篇</span>
              <span className="post-nav-title">{prevPost.title}</span>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link to={`/post/${nextPost.slug}`} className="post-nav-link post-nav-next">
              <span className="post-nav-label">下一篇 <HiOutlineArrowRight /></span>
              <span className="post-nav-title">{nextPost.title}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </article>
  )
}

export default Post
