import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import './AdminLayout.css'
import { LayoutDashboard, Calendar, Users, Sparkles, Package } from 'lucide-react'

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '⊞' },
  { path: '/admin/turnos', label: 'Turnos', icon: '⊙' },
  { path: '/admin/clientes', label: 'Clientes', icon: '⊚' },
  { path: '/admin/servicios', label: 'Servicios', icon: '✦' },
  { path: '/admin/productos', label: 'Productos', icon: '⊡' },
]

function AdminLayout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`admin ${collapsed ? 'admin--collapsed' : ''}`}>
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <Link to="/" className="admin__logo">LUMIÈRE</Link>
          <button
            className="admin__toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>
        <nav className="admin__nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin__nav-item ${
                location.pathname === item.path ? 'admin__nav-item--active' : ''
              }`}
            >
              <span className="admin__nav-icon">{item.icon}</span>
              <span className="admin__nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin__sidebar-footer">
          <Link to="/" className="admin__back">
            ← Volver al sitio
          </Link>
        </div>
      </aside>
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout