import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const clientesApi = {
  obtenerTodos: () => axios.get(`${BASE_URL}/clientes`),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/clientes/${id}`),
  obtenerActivos: () => axios.get(`${BASE_URL}/clientes/activos`),
  buscar: (texto) => axios.get(`${BASE_URL}/clientes/buscar?texto=${texto}`),
  crear: (cliente) => axios.post(`${BASE_URL}/clientes`, cliente),
  actualizar: (id, cliente) => axios.put(`${BASE_URL}/clientes/${id}`, cliente),
  desactivar: (id) => axios.delete(`${BASE_URL}/clientes/${id}`),
}