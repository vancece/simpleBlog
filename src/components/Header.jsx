import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">我的文字极客</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            首页
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            归档
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            关于
          </NavLink>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="切换菜单"
        >
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
