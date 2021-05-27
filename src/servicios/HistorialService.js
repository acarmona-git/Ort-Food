import axios from 'axios'

const apiClient = axios.create({
    baseURL: `https://api-historico.herokuapp.com/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
  export default {
    getHistorial() {
      return apiClient.get('/historico/')
    },
    postCarrito(carrito) {
      return apiClient.post('/historico/', carrito)
    },
  }
  