import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Compras from '../components/Compras.vue'
import ModificarStock from '../views/Modificar-Stock.vue'
import ModificarUsuarios from '../views/Modificar-Usuarios.vue'
import Perfil from '../views/Perfil.vue'
import Historial from '../views/Historial.vue'
import {store} from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home 
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: Perfil 
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/Compras',
    name: 'Compras',
    component: Compras,
    meta: {rutaProtegida: true},
  },
  {
    path: '/Modificar-Stock',
    name: 'Modificar-Stock',
    component: ModificarStock,
    meta: {rutaProtegida: true, rutaEsAdmin: true},
  },
  {
    path: '/Modificar-Usuarios',
    name: 'Modificar-Usuarios',
    component: ModificarUsuarios,
    meta: {rutaProtegida: true, rutaEsAdmin: true},
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: Historial 
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaEsProtegida = to.matched.some(item => item.meta.rutaProtegida) //recorro los obj de las rutas
  const rutaAdmin = to.matched.some(item => item.meta.rutaEsAdmin)

  if(rutaEsProtegida && store.state.token === null){
      console.log("EL TOKEN OBTENIDO PARA PODER ACCEDER A LA RUTA ES: " + store.state.token)
      next('/')
  } else {

    if(rutaEsProtegida && rutaAdmin){
      console.log("ES ADMIN????? " +  store.state.esAdmin)
      console.log("TOKEN????? " +  store.state.token)
      if(store.state.token === null || store.state.esAdmin === false){
        console.log("ENTRO AQUI :c")
        next('/')
      }else{
        console.log("TESTEEEEEEEEEEO")
        next()
      }
    } 
      next()
  }
})

export default router
