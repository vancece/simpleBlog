import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { HiOutlineCalendar, HiOutlineTag, HiOutlineArrowRight } from 'react-icons/hi'

function PostCard({ post, featured = false }) {
  return (
    <article className={`post-card ${featured ? 'post-card--featured' : ''}`}>
      <div className="post-card-body">
        <div className="post-card-meta">
          <span className="post-card-date">
            <HiOutlineCalendar />
            {dayjs(post.date).format('YYYY 年 M 月 D 日')}
          </span>
        </div>

        <h2 className="post-card-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <div className="post-card-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">
                <HiOutlineTag />
                {tag}
              </span>
            ))}
          </div>

          <Link to={`/post/${post.slug}`} className="post-card-read-more">
            阅读全文 <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PostCard
