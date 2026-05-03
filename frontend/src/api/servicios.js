import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const serviciosApi = {
  obtenerActivos: () => axios.get(`${BASE_URL}/servicios/activos`),
  obtenerTodos: () => axios.get(`${BASE_URL}/servicios`),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/servicios/${id}`),
  crear: (servicio) => axios.post(`${BASE_URL}/servicios`, servicio),
  actualizar: (id, servicio) => axios.put(`${BASE_URL}/servicios/${id}`, servicio),
  desactivar: (id) => axios.delete(`${BASE_URL}/servicios/${id}`),
}