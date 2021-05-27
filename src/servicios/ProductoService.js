import axios from 'axios'

const apiClient = axios.create({
    baseURL: `https://api-proyecto-productos.herokuapp.com/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
  export default {
    getProductos() {
      return apiClient.get('/api/obtenerProductos') //OK
    },
    getProductosPor(id) {
      return apiClient.get('/Compras/' + id)
    },
    postProducto(producto) {
      return apiClient.post('/api/agregarProducto/', producto) //OK
    },
    postProductos(productos) { //AGREGADO POR MI
      return apiClient.post('/api/agregarProductos/', productos) 
    },
    deleteProducto(id) {
      return apiClient.delete('/api/eliminarProducto/' + id) //OK
    },
    deleteProductos() { //AGREGADO POR MI
      return apiClient.delete('/api/eliminarProductos') 
    },
    putProducto(producto) {
        return apiClient.put('/api/modificarProducto/' + producto.id , producto)
    },
  }
  
  