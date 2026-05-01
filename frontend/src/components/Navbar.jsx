import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        LUMIÈRE
      </Link>
      <div className="navbar__links">
        <a href="#nosotros" className="navbar__link">Nosotros</a>
        <a href="#servicios" className="navbar__link">Servicios</a>
        <a href="#reservar" className="navbar__link">Reservar</a>
        <Link to="/admin" className="navbar__admin">Admin</Link>
      </div>
    </nav>
  )
}

export default Navbar