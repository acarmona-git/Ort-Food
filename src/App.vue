<template>
  <div id="app">
    
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">Ort Food</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item b-link to="/"> Home </b-nav-item>
            <b-nav-item b-link to="/Login"> Login </b-nav-item>
            <b-nav-item v-if="token" b-link to="/Perfil"> Perfil </b-nav-item>
            <button class="btn btn-outline-info btn-sm" v-if="token" @click="cerrarSesion()">Log Out</button>
            <!--<b-nav-item v-if="!esAdmin" b-link to="/Compras"> Compras </b-nav-item> -->
            <b-nav-item v-if="esAdmin" b-link to="/Modificar-Stock"> Modificar Stock </b-nav-item>
            <b-nav-item v-if="esAdmin" b-link to="/Modificar-Usuarios"> Modificar Usuarios </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <b-row class="vh-100 text-center" align-v="center">
        <!-- <b-col> -->
          <router-view />
        <!--</b-col> -->
      </b-row> 
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['obtenerToken','obtenerRol','obtenerUsuario','cerrarSesion'])
  },
  created() {
    this.obtenerToken();
    this.obtenerRol();
    this.obtenerUsuario();
  },
  computed: {
    ...mapState(['token','esAdmin']), //NOSE SI CARRITO FUNCIONE BIEN
  },
}

</script>
