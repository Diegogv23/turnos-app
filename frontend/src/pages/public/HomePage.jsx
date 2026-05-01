import { useEffect, useRef } from 'react'
import './HomePage.css'

function HomePage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg" ref={heroRef} />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__pretitle">Clínica de Cirugía & Estética</p>
          <h1 className="hero__title">Lumière</h1>
          <p className="hero__subtitle">
            Donde la ciencia y el arte se encuentran<br />
            para revelar tu mejor versión
          </p>
          <div className="hero__divider" />
          <a href="#reservar" className="hero__btn">
            Reservar Consulta
          </a>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>
    </main>
  )
}

export default HomePage