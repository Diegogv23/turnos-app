import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const productosApi = {
  obtenerTodos: () => axios.get(`${BASE_URL}/productos`),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/productos/${id}`),
  crear: (producto) => axios.post(`${BASE_URL}/productos`, producto),
  actualizar: (id, producto) => axios.put(`${BASE_URL}/productos/${id}`, producto),
  eliminar: (id) => axios.delete(`${BASE_URL}/productos/${id}`),
}