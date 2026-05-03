import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/public/HomePage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="turnos" element={<div style={{color: 'var(--marfil)'}}>Turnos</div>} />
          <Route path="clientes" element={<div style={{color: 'var(--marfil)'}}>Clientes</div>} />
          <Route path="servicios" element={<div style={{color: 'var(--marfil)'}}>Servicios</div>} />
          <Route path="productos" element={<div style={{color: 'var(--marfil)'}}>Productos</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App