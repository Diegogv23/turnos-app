import { useEffect, useState } from "react";
import { turnosApi } from "../../api/turnos";
import { clientesApi } from "../../api/clientes";
import { serviciosApi } from "../../api/servicios";
import "./Turnos.css";

const ESTADOS = ["TODOS", "PENDIENTE", "CONFIRMADO", "COMPLETADO", "CANCELADO"];

function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [turnosRes, clientesRes, serviciosRes] = await Promise.all([
        turnosApi.obtenerTodos(),
        clientesApi.obtenerTodos(),
        serviciosApi.obtenerTodos(),
      ]);
      setTurnos(turnosRes.data || []);
      setClientes(clientesRes.data || []);
      setServicios(serviciosRes.data || []);
    } catch (err) {
      console.error("Error cargando turnos:", err);
    } finally {
      setCargando(false);
    }
  };

  const getCliente = (clienteId) =>
    clientes.find((c) => c.id === clienteId);

  const getNombreServicio = (tratamientoId) => {
    const s = servicios.find((s) => s.id === tratamientoId);
    return s ? s.nombre : "Sin asignar";
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await turnosApi.actualizarEstado(id, nuevoEstado);
      await cargarDatos();
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };

  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este turno?")) return;
    try {
      await fetch(`http://localhost:8080/api/turnos/${id}/eliminar`, {
        method: "DELETE",
      });
      await cargarDatos();
    } catch (err) {
      console.error("Error eliminando turno:", err);
    }
  };

  const turnosFiltrados = filtro === "TODOS"
    ? turnos
    : turnos.filter((t) => t.estado === filtro);

  if (cargando) return <div className="turnos__cargando">Cargando...</div>;

  return (
    <div className="turnos">
      <div className="turnos__header">
        <div>
          <p className="turnos__pretitle">Gestión</p>
          <h1 className="turnos__title">Turnos</h1>
          <div className="turnos__divider" />
        </div>
        <div className="turnos__contador">
          <span className="turnos__contador-num">{turnosFiltrados.length}</span>
          <span className="turnos__contador-label">turnos</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="turnos__filtros">
        {ESTADOS.map((estado) => (
          <button
            key={estado}
            className={`filtro__btn ${filtro === estado ? "filtro__btn--active" : ""}`}
            onClick={() => setFiltro(estado)}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="turnos__tabla">
        <div className="turnos__tabla-header">
          <span>Cliente</span>
          <span>Teléfono</span>
          <span>Tratamiento</span>
          <span>Fecha</span>
          <span>Notas</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {turnosFiltrados.length === 0 && (
          <div className="turnos__vacio">
            No hay turnos {filtro !== "TODOS" ? `con estado ${filtro}` : ""}
          </div>
        )}

        {turnosFiltrados.map((turno) => {
          const cliente = getCliente(turno.clienteId);
          return (
            <div key={turno.id} className="turnos__fila">
              <span className="turnos__cell">
                {cliente ? `${cliente.nombre} ${cliente.apellido}` : "Sin asignar"}
              </span>
              <span className="turnos__cell">
                {cliente?.telefono || "-"}
              </span>
              <span className="turnos__cell">
                {getNombreServicio(turno.tratamientoId)}
              </span>
              <span className="turnos__cell">
                {new Date(turno.fechaHora).toLocaleDateString("es-CO")}
                <br />
                <small>{new Date(turno.fechaHora).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}</small>
              </span>
              <span className="turnos__cell turnos__cell--notas">
                {turno.notas || "-"}
              </span>
              <span className={`turno__estado turno__estado--${turno.estado?.toLowerCase()}`}>
                {turno.estado}
              </span>
              <div className="turnos__acciones">
                {turno.estado === "PENDIENTE" && (
                  <button
                    className="accion__btn accion__btn--confirmar"
                    onClick={() => cambiarEstado(turno.id, "CONFIRMADO")}
                  >
                    Confirmar
                  </button>
                )}
                {turno.estado === "CONFIRMADO" && (
                  <button
                    className="accion__btn accion__btn--completar"
                    onClick={() => cambiarEstado(turno.id, "COMPLETADO")}
                  >
                    Completar
                  </button>
                )}
                {turno.estado !== "CANCELADO" && turno.estado !== "COMPLETADO" && (
                  <button
                    className="accion__btn accion__btn--cancelar"
                    onClick={() => cambiarEstado(turno.id, "CANCELADO")}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  className="accion__btn accion__btn--eliminar"
                  onClick={() => eliminarTurno(turno.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Turnos;