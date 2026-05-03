import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const turnosApi = {
  obtenerTodos: () => axios.get(`${BASE_URL}/turnos`),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/turnos/${id}`),
  obtenerPorEstado: (estado) => axios.get(`${BASE_URL}/turnos/estado/${estado}`),
  obtenerPorCliente: (clienteId) => axios.get(`${BASE_URL}/turnos/cliente/${clienteId}`),
  crear: (turno) => axios.post(`${BASE_URL}/turnos`, turno),
  actualizar: (id, turno) => axios.put(`${BASE_URL}/turnos/${id}`, turno),
  actualizarEstado: (id, estado) => axios.patch(`${BASE_URL}/turnos/${id}/estado?estado=${estado}`),
  cancelar: (id) => axios.delete(`${BASE_URL}/turnos/${id}`),
}