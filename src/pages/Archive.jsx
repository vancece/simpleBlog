import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import posts from '../data/posts'
import { HiOutlineCalendar, HiOutlineTag, HiOutlineArchive } from 'react-icons/hi'

function Archive() {
  // Group posts by year-month
  const groupedPosts = posts.reduce((groups, post) => {
    const yearMonth = dayjs(post.date).format('YYYY 年 M 月')
    if (!groups[yearMonth]) {
      groups[yearMonth] = []
    }
    groups[yearMonth].push(post)
    return groups
  }, {})

  return (
    <div className="archive-page">
      <div className="archive-header">
        <div className="container">
          <h1 className="archive-title">
            <HiOutlineArchive /> 文章归档
          </h1>
          <p className="archive-desc">共 {posts.length} 篇文章，记录每一段思考</p>
        </div>
      </div>

      <div className="archive-content container">
        <div className="timeline">
          {Object.entries(groupedPosts).map(([yearMonth, monthPosts]) => (
            <div key={yearMonth} className="timeline-group">
              <div className="timeline-label">
                <span>{yearMonth}</span>
              </div>
              <div className="timeline-items">
                {monthPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/post/${post.slug}`}
                    className="timeline-item"
                  >
                    <div className="timeline-dot" />
                    <div className="timeline-item-content">
                      <h3 className="timeline-item-title">{post.title}</h3>
                      <div className="timeline-item-meta">
                        <span className="timeline-item-date">
                          <HiOutlineCalendar />
                          {dayjs(post.date).format('M 月 D 日')}
                        </span>
                        <div className="timeline-item-tags">
                          {post.tags.map(tag => (
                            <span key={tag} className="tag tag--small">
                              <HiOutlineTag /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Archive
