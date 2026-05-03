import { useEffect, useState } from "react";
import { turnosApi } from "../../api/turnos";
import { clientesApi } from "../../api/clientes";
import { serviciosApi } from "../../api/servicios";
import { productosApi } from "../../api/productos";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTurnos: 0,
    turnosPendientes: 0,
    turnosHoy: 0,
    totalClientes: 0,
    totalServicios: 0,
    totalProductos: 0,
  });
  const [turnosRecientes, setTurnosRecientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [servicios, setServicios] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [turnos, clientesRes, serviciosRes, productos] = await Promise.all([
          turnosApi.obtenerTodos(),
          clientesApi.obtenerTodos(),
          serviciosApi.obtenerTodos(),
          productosApi.obtenerTodos(),
        ]);

        const turnosData = turnos.data || [];
        const clientesData = clientesRes.data || [];
        const serviciosData = serviciosRes.data || [];
        const productosData = productos.data || [];

        setServicios(serviciosData);
        setClientes(clientesData);

        const hoy = new Date().toISOString().slice(0, 10);
        const turnosHoy = turnosData.filter(
          (t) => t.fechaHora?.slice(0, 10) === hoy
        ).length;

        const turnosPendientes = turnosData.filter(
          (t) => t.estado === "PENDIENTE"
        ).length;

        setStats({
          totalTurnos: turnosData.length,
          turnosPendientes,
          turnosHoy,
          totalClientes: clientesData.length,
          totalServicios: serviciosData.length,
          totalProductos: productosData.length,
        });

        setTurnosRecientes(turnosData.slice(-5).reverse());
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  if (cargando) return <div className="dashboard__cargando">Cargando...</div>;

  const getNombreServicio = (tratamientoId) => {
    const servicio = servicios.find((s) => s.id === tratamientoId);
    return servicio ? servicio.nombre : "Sin asignar";
  };

  const getNombreCliente = (clienteId) => {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : "Sin asignar";
  };

  const getTelefonoCliente = (clienteId) => {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.telefono : "-";
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <p className="dashboard__pretitle">Panel de Control</p>
        <h1 className="dashboard__title">Dashboard</h1>
        <div className="dashboard__divider" />
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__icon">⊙</span>
          <span className="stat-card__num">{stats.totalTurnos}</span>
          <span className="stat-card__label">Total Turnos</span>
        </div>
        <div className="stat-card stat-card--highlight">
          <span className="stat-card__icon">⊙</span>
          <span className="stat-card__num">{stats.turnosPendientes}</span>
          <span className="stat-card__label">Pendientes</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon">⊙</span>
          <span className="stat-card__num">{stats.turnosHoy}</span>
          <span className="stat-card__label">Turnos Hoy</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon">⊚</span>
          <span className="stat-card__num">{stats.totalClientes}</span>
          <span className="stat-card__label">Clientes</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon">✦</span>
          <span className="stat-card__num">{stats.totalServicios}</span>
          <span className="stat-card__label">Servicios</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon">⊡</span>
          <span className="stat-card__num">{stats.totalProductos}</span>
          <span className="stat-card__label">Productos</span>
        </div>
      </div>

      <div className="dashboard__recientes">
        <h2 className="dashboard__subtitle">Últimos Turnos</h2>
        <div className="dashboard__tabla">
          <div className="tabla__header">
            <span>Cliente</span>
            <span>Tratamiento</span>
            <span>Fecha</span>
            <span>Teléfono</span>
            <span>Notas</span>
            <span>Estado</span>
          </div>
          {turnosRecientes.map((turno) => (
            <div key={turno.id} className="tabla__fila">
              <span className="tabla__cell">
                {getNombreCliente(turno.clienteId)}
              </span>
              <span className="tabla__cell">
                {getNombreServicio(turno.tratamientoId)}
              </span>
              <span className="tabla__cell">
                {new Date(turno.fechaHora).toLocaleDateString("es-CO")}
              </span>
              <span className="tabla__cell">
                {getTelefonoCliente(turno.clienteId)}
              </span>
              <span className="tabla__cell tabla__cell--notas">
                {turno.notas || "-"}
              </span>
              <span className={`tabla__estado tabla__estado--${turno.estado?.toLowerCase()}`}>
                {turno.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;