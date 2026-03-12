import { useState } from 'react'
import posts, { getAllTags } from '../data/posts'
import PostCard from '../components/PostCard'
import { HiOutlineSearch } from 'react-icons/hi'

function Home() {
  const [activeTag, setActiveTag] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const allTags = getAllTags()

  const filteredPosts = posts.filter(post => {
    const matchesTag = !activeTag || post.tags.includes(activeTag)
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-dots" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title">
            <span className="hero-title-line">用文字</span>
            <span className="hero-title-line hero-title-accent">探索极客世界</span>
          </h1>
          <p className="hero-subtitle">
            技术 · 思考 · 创造 — 记录一个开发者的成长旅程
          </p>
          <div className="hero-search">
            <HiOutlineSearch className="hero-search-icon" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="tags-section container">
        <div className="tags-filter">
          <button
            className={`tag-btn ${!activeTag ? 'tag-btn--active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            全部
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-btn ${activeTag === tag ? 'tag-btn--active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="posts-section container">
        {filteredPosts.length > 0 ? (
          <div className="posts-grid">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                featured={index === 0 && !activeTag && !searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <p>没有找到匹配的文章 🔍</p>
            <button className="btn-reset" onClick={() => { setActiveTag(null); setSearchQuery('') }}>
              重置筛选
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
