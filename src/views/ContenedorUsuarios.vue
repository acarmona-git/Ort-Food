<template>
  <div class="my-5">
    <h4>Listado de usuarios</h4> <br>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Telefono</th>
          <th scope="col">Direccion</th>
          <th scope="col">Admin</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody id="usuarios">
        <Usuario :desdeModificar="desdeModificar"
            v-for="user in usuarios" :key="user._id"
            :user="user"
        />
      </tbody>

      <tfoot>
        <tr id="footer-carrito">
          <th scope="row" colspan="7" v-if="usuarios.length === 0">No se encontraron usuarios registrados!</th> 
          <th scope="row" colspan="7"></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>

import Usuario from "../components/Usuario.vue";
import {  mapState } from "vuex";

export default {
  props: ['desdeModificar'],
  methods: {
  },
  components: {
    Usuario,
  },
  computed: {
    ...mapState(['usuarios']),
  },

};
</script>