<template>

  <tr > <!-- este vif no deberia estar pero sino no funciona bien -->
    <th scope="row">{{user.name}}</th>
    <td>{{user.email}}</td>
    <td>{{user.telefono}}</td>
    <td>{{user.direccion}}</td>
    <td>{{user.admin}}</td>
   <td> <button class="btn btn-danger btn-sm" @click="borrar()">Borrar</button></td>
  <td> <button class="btn btn-secondary btn-sm" @click="editar()">Editar</button></td>

  </tr>
  
</template>

<script>
import UserService from '../servicios/UserService'
import {mapMutations,mapState} from 'vuex'

export default {
  props: ['user','desdeModificar'],
  computed: {
    ...mapState(['usuarios'])
  },
  methods: {
      ...mapMutations(['borrarUsuario','modificarUsuario']),
      async borrar(){
        try {
          const res = await UserService.deleteUsuario(this.user.email) //HACE UN GET POR DEFECTO
          const usuario = await res.data
          console.log("USUARIO BORRADO: " + JSON.stringify(usuario))
          this.borrarUsuario(usuario)
        } catch (error) {
          console.log(error)
        }
      },

      async editar(){
        
      let esAdmin=document.getElementById("chkbox").checked;

      console.log("ES ADMIN?== "+ this.user.admin);
        if(this.user != null){
          if(this.desdeModificar.name != "") {
            this.user.name = this.desdeModificar.name
          }
          if(this.desdeModificar.email != "") {
            this.user.email = this.desdeModificar.email
          }
          if(this.desdeModificar.password != "") {
            this.user.password = this.desdeModificar.password
          }
          if(this.desdeModificar.telefono != "") {
            this.user.telefono = this.desdeModificar.telefono
          }
          if(this.desdeModificar.direccion != "") {
            this.user.direccion = this.desdeModificar.direccion
          }
          if(esAdmin == false) {
            this.user.admin = false
          } else {
            this.user.admin = true
          }
        }else{
          return
        }

        try {
          console.log("MODIFICANDO.......: " + JSON.stringify(this.user))
          const res = await UserService.putUsuario(this.user) 
          console.log("OBJETO RECIBIDO COMO RESPUESTA AL PUT PARA LA MODIFICACION: "+ JSON.stringify(res))
          //const productos = await res.data
          this.modificarUsuario(this.user)
        } catch (error) {
          console.log(error)
        }

      },
  }
}
</script>

<style>

</style>