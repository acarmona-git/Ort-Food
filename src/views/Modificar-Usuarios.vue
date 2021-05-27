<template>
    <div>

    <ContenedorUsuarios :desdeModificar="user" />

    <h4>Agregar usuario al sistema</h4> <br>
              <form class="border" style="padding: 3em">
    <td> Nombre: <input type="text" v-model="user.name" v-bind:placeholder="user.name" required> </td> 
    <td> Email: <input type="text" v-model="user.email" v-bind:placeholder="user.email" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"> </td>
    <td> Password: <input type="text" v-model="user.password" v-bind:placeholder="user.password" required> </td>
    <td> Telefono: <input  type="text" v-model="user.telefono" v-bind:placeholder="user.telefono" required> </td>
    <td> Direccion: <input type="text" v-model="user.direccion" v-bind:placeholder="user.direccion" required> </td>
    <td> Root <div class="checkbox"> 
    <label><input type="checkbox" id="chkbox" value=true /></label> 
    </div>
    </td>
 

    
    <td><button style="margin-top: 3.4em; margin-left: 3px" class="btn btn-info btn-sm" v-on:click="capturar(),register(user)" >Agregar</button></td>
    
    </form>

          <br><br>
  </div>


</template>

<script>
import ContenedorUsuarios from "./ContenedorUsuarios.vue";
import UserService from "../servicios/UserService"
import {mapMutations, mapActions} from "vuex"

export default {
  components: { ContenedorUsuarios },
  data: function () {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        telefono: "",
        direccion: "",
        admin: false
      },
    };
  },
  created() {
    this.getUsuarios();
  },

  methods: {
    ...mapActions(['register']),
    ...mapMutations(['setUsuario']),
    capturar(){
      this.user.admin=document.getElementById("chkbox").checked;
    },
    
    async getUsuarios() {
      try {
        const res = await UserService.getUsuarios();
        const usuarios = await res.data;
        console.log(
          "USUARIOS OBTENIDOS DEL GET API: " + JSON.stringify(usuarios)
        );
        //this.setUsuarios(usuarios); //LLAMA DIRECTO A LA MUTACION
        this.$store.commit("setUsuarios", usuarios);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>