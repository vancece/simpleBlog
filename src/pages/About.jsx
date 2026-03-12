import { HiOutlineMail, HiOutlineGlobe, HiOutlineCode, HiOutlineHeart, HiOutlineLightningBolt, HiOutlineBookOpen } from 'react-icons/hi'

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-content container">
          <div className="about-avatar">
            <span className="about-avatar-emoji">👨‍💻</span>
          </div>
          <h1 className="about-name">文字极客</h1>
          <p className="about-bio">
            一个热爱技术、喜欢用文字记录生活的开发者
          </p>
        </div>
      </div>

      <div className="about-content container">
        <div className="about-grid">
          <section className="about-section">
            <h2 className="about-section-title">
              <HiOutlineBookOpen /> 关于这个博客
            </h2>
            <p>
              "我的文字极客"是一个专注于技术分享和个人成长的博客。这里记录着我在技术道路上的探索、思考和感悟。
            </p>
            <p>
              我相信，在这个快节奏的时代，沉下心来用文字记录和表达，是一种难能可贵的习惯。每一篇文章都是对知识的梳理，对思维的锤炼。
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">
              <HiOutlineCode /> 技术栈
            </h2>
            <div className="skill-tags">
              {['JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Python', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Git'].map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">
              <HiOutlineLightningBolt /> 我的理念
            </h2>
            <div className="principles">
              <div className="principle-card">
                <span className="principle-icon">🎯</span>
                <h3>持续学习</h3>
                <p>技术日新月异，保持好奇心和学习热情是不被淘汰的唯一方式。</p>
              </div>
              <div className="principle-card">
                <span className="principle-icon">✍️</span>
                <h3>分享输出</h3>
                <p>学习的最好方式是教会别人，写作是最好的思考工具。</p>
              </div>
              <div className="principle-card">
                <span className="principle-icon">🛠️</span>
                <h3>实践为王</h3>
                <p>纸上得来终觉浅，绝知此事要躬行。动手实践才是真正的学习。</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">
              <HiOutlineHeart /> 联系我
            </h2>
            <div className="contact-links">
              <a href="mailto:hello@example.com" className="contact-link">
                <HiOutlineMail /> hello@example.com
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <HiOutlineGlobe /> GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
