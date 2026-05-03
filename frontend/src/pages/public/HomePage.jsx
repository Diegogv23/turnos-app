import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { serviciosApi } from "../../api/servicios";
import axios from "axios";

function HomePage() {
  const heroRef = useRef(null);
  const nosotrosRef = useRef(null);
  const reservarRef = useRef(null);

  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    tratamientoId: "",
    fechaHora: "",
    notas: "",
  });

  useEffect(() => {
    serviciosApi
      .obtenerActivos()
      .then((res) => setServicios(res.data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const handleReservar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    try {
      const clienteRes = await axios.post(
        "http://localhost:8080/api/clientes",
        {
          nombre: formulario.nombre.split(" ")[0],
          apellido: formulario.nombre.split(" ").slice(1).join(" ") || "-",
          tipoDocumento: "CC",
          documento: formulario.documento,
          telefono: formulario.telefono,
          correo: "-",
          direccion: "-",
          contactoEmergencia: "-",
          edad: 0,
        },
      );
      const clienteId = clienteRes.data.id;

      await axios.post("http://localhost:8080/api/turnos", {
        clienteId,
        tratamientoId: formulario.tratamientoId,
        profesionalId: "por-asignar",
        sede: "Sede Principal",
        fechaHora: formulario.fechaHora,
        notas: formulario.notas,
      });

      setMensaje({
        tipo: "exito",
        texto: "¡Reserva confirmada! Te contactaremos pronto.",
      });
      setFormulario({
        nombre: "",
        documento: "",
        telefono: "",
        tratamientoId: "",
        fechaHora: "",
        notas: "",
      });
    } catch (err) {
      const texto =
        err.response?.status === 409
          ? "Ya tienes una cuenta registrada. Tu reserva fue agendada."
          : "Hubo un error. Por favor intenta nuevamente.";
      setMensaje({
        tipo: err.response?.status === 409 ? "exito" : "error",
        texto,
      });

      if (err.response?.status === 409) {
        try {
          const clienteExistente = await axios.get(
            `http://localhost:8080/api/clientes/documento/${formulario.documento}`,
          );
          await axios.post("http://localhost:8080/api/turnos", {
            clienteId: clienteExistente.data.id,
            tratamientoId: formulario.tratamientoId,
            profesionalId: "por-asignar",
            sede: "Sede Principal",
            fechaHora: formulario.fechaHora,
            notas: formulario.notas,
          });
          setMensaje({
            tipo: "exito",
            texto: "¡Reserva confirmada! Te contactaremos pronto.",
          });
        } catch {
          setMensaje({
            tipo: "error",
            texto: "Hubo un error al agendar. Intenta nuevamente.",
          });
        }
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
      if (nosotrosRef.current) {
        const section = nosotrosRef.current.closest(".nosotros");
        const offset = section.getBoundingClientRect().top;
        nosotrosRef.current.style.transform = `translateY(${offset * -0.15}px)`;
      }
      if (reservarRef.current) {
        const section = reservarRef.current.closest(".reservar");
        const offset = section.getBoundingClientRect().top;
        reservarRef.current.style.transform = `translateY(${offset * -0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            Donde la ciencia y el arte se encuentran
            <br />
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
      {/* Nosotros Section */}
      <section className="nosotros" id="nosotros">
        <div className="nosotros__content">
          <p className="nosotros__pretitle">Nuestra Historia</p>
          <h2 className="nosotros__title">Excelencia en cada procedimiento</h2>
          <div className="nosotros__divider" />
          <p className="nosotros__texto">
            En Lumière combinamos tecnología de vanguardia con el arte de la
            cirugía estética para ofrecerte resultados naturales y duraderos.
            Nuestro equipo de especialistas certificados se dedica a realzar tu
            belleza con los más altos estándares de seguridad y precisión.
          </p>
          <div className="nosotros__stats">
            <div className="nosotros__stat">
              <span className="nosotros__stat-num">12+</span>
              <span className="nosotros__stat-label">Años de experiencia</span>
            </div>
            <div className="nosotros__stat">
              <span className="nosotros__stat-num">5.000+</span>
              <span className="nosotros__stat-label">
                Pacientes satisfechos
              </span>
            </div>
            <div className="nosotros__stat">
              <span className="nosotros__stat-num">98%</span>
              <span className="nosotros__stat-label">Tasa de satisfacción</span>
            </div>
          </div>
        </div>
        <div className="nosotros__imagen-wrapper">
          <div className="nosotros__imagen" ref={nosotrosRef} />
        </div>
      </section>

      {/* Servicios Section */}
      <section className="servicios" id="servicios">
        <div className="servicios__header">
          <p className="servicios__pretitle">Lo que ofrecemos</p>
          <h2 className="servicios__title">Nuestros Servicios</h2>
          <div className="servicios__divider" />
        </div>
        <div className="servicios__grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="servicio-card">
              <div className="servicio-card__categoria">
                {servicio.categoria}
              </div>
              <h3 className="servicio-card__nombre">{servicio.nombre}</h3>
              <p className="servicio-card__descripcion">
                {servicio.descripcion}
              </p>
              <div className="servicio-card__footer">
                <span className="servicio-card__duracion">
                  {servicio.duracionMinutos} min
                </span>
                <span className="servicio-card__precio">
                  ${servicio.precio.toLocaleString("es-CO")}
                </span>
              </div>
              <div className="servicio-card__linea" />
            </div>
          ))}
        </div>
      </section>

      {/* Reservar Section */}
      <section className="reservar" id="reservar">
        <div className="reservar__parallax" ref={reservarRef} />
        <div className="reservar__overlay" />
        <div className="reservar__contenido">
          <div className="reservar__info">
            <p className="reservar__pretitle">Agenda tu cita</p>
            <h2 className="reservar__title">Reserva tu consulta</h2>
            <div className="reservar__divider" />
            <p className="reservar__texto">
              Da el primer paso hacia tu transformación. Nuestro equipo de
              especialistas te acompañará en cada etapa del proceso.
            </p>
          </div>
          <form className="reservar__form" onSubmit={handleReservar}>
            <div className="form__grupo">
              <input
                className="form__input"
                type="text"
                placeholder="Tu nombre completo"
                value={formulario.nombre}
                onChange={(e) =>
                  setFormulario({ ...formulario, nombre: e.target.value })
                }
                required
              />
            </div>
            <div className="form__grupo">
              <input
                className="form__input"
                type="text"
                placeholder="Número de documento"
                value={formulario.documento}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, "").slice(0, 12);
                  setFormulario({ ...formulario, documento: valor });
                }}
                maxLength={12}
                required
              />
            </div>
            <div className="form__grupo">
              <input
                className="form__input"
                type="tel"
                placeholder="Whatsapp"
                value={formulario.telefono}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormulario({ ...formulario, telefono: valor });
                }}
                maxLength={10}
                required
              />
            </div>
            <div className="form__grupo">
              <select
                className="form__input form__select"
                value={formulario.tratamientoId}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    tratamientoId: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__grupo">
              <input
                className="form__input"
                type="datetime-local"
                value={formulario.fechaHora}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormulario({ ...formulario, fechaHora: e.target.value })
                }
                required
              />
            </div>
            <div className="form__grupo">
              <textarea
                className="form__input form__textarea"
                placeholder="Notas adicionales (opcional)"
                value={formulario.notas}
                onChange={(e) =>
                  setFormulario({ ...formulario, notas: e.target.value })
                }
              />
            </div>
            {mensaje && (
              <p className={`form__mensaje ${mensaje.tipo}`}>{mensaje.texto}</p>
            )}
            <button type="submit" className="form__btn" disabled={cargando}>
              {cargando ? "Enviando..." : "Confirmar Reserva"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
