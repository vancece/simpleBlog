import { HiOutlineHeart } from 'react-icons/hi'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-content">
          <p className="footer-text">
            用文字记录极客生活 <HiOutlineHeart className="footer-heart" />
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} 我的文字极客. All rights reserved.
          </p>
          <p className="footer-icp">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              粤ICP备2026023643号
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
