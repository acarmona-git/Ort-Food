import axios from 'axios'

const apiClient = axios.create({
    baseURL: `https://jwt-proyecto-api.herokuapp.com/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })


  export default {

    getUsuarios() {
      return apiClient.get('/api/user/obtenerUsuarios')
    },
    getUsuariosPorEmail(usuario){
      return apiClient.get('/api/user/obtenerUsuarios/' + usuario.email , usuario)
    },
    postUsuarios(usuario) {
      return apiClient.post('/api/user/login/', usuario)
    },
    postUsuariosRegistro(usuario) {
      return apiClient.post('/api/user/register', usuario)
    },
    deleteUsuario(email) {
      return apiClient.delete('/api/user/eliminarUsuario/' + email)
    },
    putUsuario(usuario) {
        return apiClient.put('/api/user/modificarUsuario/' + usuario.email , usuario)
    },
  }
  