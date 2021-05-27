import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ProductoService from '../servicios/ProductoService'
import UserService from '../servicios/UserService'
import router from '../router/index'

export const store = new Vuex.Store({
  state: {
    // -------------------  STORE SOBRE USUARIOS -------------------  
    usuarios: [],
    usuarioActual: {},
    esAdmin: false,
    token: null,
    error: "",
    
    // ------------------- STORE SOBRE PRODUCTOS  -------------------  
    productos: [],
    carrito: {}
  },
  
  // -------------------  MUTATIONS SOBRE USUARIOS  -------------------  
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setRol(state, payload) {
      state.esAdmin = payload;
    },
    setUsuarios(state, payload) {
      state.usuarios = payload
      console.log(state.usuarios)
    },
    setUsuarioActual(state, payload) {
      state.usuarioActual = payload
      console.log(state.usuarioActual)
    },
    agregarUsuario(state, payload){
      state.usuarios.push(payload)
    },
    borrarUsuario(state, payload){
      let index = state.usuarios.findIndex((user)=>user.email == payload.email)
      state.usuarios.splice(index,1)
    },
    modificarUsuario(state, payload){
      let index = state.usuarios.findIndex((user)=>user.email == payload.email)
      state.usuarios[index] = payload
    },

    // -------------------  MUTATIONS SOBRE PRODUCTOS  -------------------  
    agregarProducto(state, payload){
      state.productos.push(payload)
    },
    setProductos(state, payload) {
      state.productos = payload
      console.log(state.productos)
    },
    setCarrito(state, payload) {
      state.carrito[payload.id] = { ...payload }  //{ ?  }
      state.carrito = { ...state.carrito }
      console.log(state.carrito)
    },
    borrarProd(state,payload){
      let index = state.productos.findIndex((prod)=>prod.id == payload.id)
      state.productos.splice(index,1)
    },
    setVaciar(state) {
      state.carrito = {}
    },
    aumentar(state, payloadID) {
      state.carrito[payloadID].cantidad = state.carrito[payloadID].cantidad + 1
    },
    disminuir(state, payloadID) {
      state.carrito[payloadID].cantidad = state.carrito[payloadID].cantidad - 1

      if (state.carrito[payloadID].cantidad === 0) {
        delete state.carrito[payloadID]
      }
    }
  },
  actions: {

    // -------------------   ACTIONS SOBRE USUARIOS  -------------------  
    obtenerToken({ commit }) {
      if (localStorage.getItem('token')!=null) {
        commit('setToken', localStorage.getItem('token'))
      } else {
          commit('setToken', null)
      }
    },
    obtenerUsuario({ commit }) {
      if (localStorage.getItem('usuarioActual')!=null) {
        commit('setUsuarioActual', localStorage.getItem('usuarioActual'))
      } else {
          commit('setUsuarioActual', null)
      }
    },
    obtenerRol({ commit }) {
      if (localStorage.getItem('esAdmin')!=false) {
        commit('setRol', localStorage.getItem('esAdmin'))
      } else {
          commit('setRol', false)
      }
    },
    cerrarSesion({ commit }) {
      localStorage.removeItem('token')
      commit('setToken', null)
      commit('setRol', false)
      commit('setUsuarioActual', null)
      router.push('/')
    },
    async login({ commit }, usuario) {
      try {

        const res = await UserService.postUsuarios(usuario)

        const respuestaDB = await res.data

        console.log("RESPUESTA DE LA API TOKEN AL LOGEARSE: " + JSON.stringify(respuestaDB));

        commit('setToken', respuestaDB.data.token)
        commit('setRol', respuestaDB.data2.esAdmin)
        commit('setUsuarioActual', usuario)
        console.log("MOSTRANDO ROL DESDE VUEX: " + respuestaDB.data2.esAdmin )
        localStorage.setItem('token', respuestaDB.data.token)
        localStorage.setItem('esAdmin', respuestaDB.data2.esAdmin)
        localStorage.setItem('usuarioActual', usuario)

        router.push('/')

        commit('setError', null)

      } catch (error) {
        commit('setError', error)
        console.log('error: ', error)
      }
    },
    async register({ commit }, usuario) {
      try {
      const res = await UserService.postUsuariosRegistro(usuario)
      const respuestaDB = await res.data
      console.log("RESPUESTA DE LA API TOKEN AL REGISTRARSE: " + JSON.stringify(respuestaDB));
      commit('agregarUsuario',usuario)
    } catch (error) {
      console.log('error: ', error)
    }
  },

    // -------------------  ACTIONS SOBRE PRODUCTOS    -------------------  
    async getProductos({ commit }) {
      try {
        const res = await ProductoService.getProductos() 
        const productos = await res.data
        console.log("PRODUCTOS OBTENIDOS DEL GET API: " + JSON.stringify(productos))
        commit('setProductos', productos)
      } catch (error) {
        console.log(error)
      }
    },
    agregarAlCarrito({ commit, state }, producto) { 

      if (state.carrito[producto.id]) {  //{}  { id <- producto.id}  
        producto.cantidad = state.carrito[producto.id].cantidad + 1;
      }
      else {
        producto.cantidad = 1;   
      }
      commit('setCarrito', producto);
    }

  },
  getters: {
    totalCantidad(state) {
      return Object.values(state.carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)  
    },
    totalPrecio(state) {
      return Object.values(state.carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    }
  }
})
