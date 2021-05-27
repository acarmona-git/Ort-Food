<template>

  <div > <!-- este vif no deberia estar pero sino no funciona bien -->

        <table class="table">
            


            <thead>
            <tr>
                <th scope="col"># ID Prod</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
             
            </tr>
            </thead>
            
        
        <ItemHistorial 
            v-for="item in arrayHistorial" :key="item.id"
            :historico="item" :contador="aumentarContador()"
        />
    

        </table>

    <!--
    <th scope="row">{{user.name}}</th>
    <td>{{user.email}}</td>
    <td>{{user.telefono}}</td>
    <td>{{user.direccion}}</td>
    <td>{{user.admin}}</td>-->

   <td> <button class="btn btn-danger btn-sm" @click="obtenerHistorial()">CargarHistorial</button></td>

  </div>
  
</template>

<script>
import HistorialService from '../servicios/HistorialService'
import ItemHistorial from "../components/ItemHistorial"



export default {
    data: function(){
    return {
        arrayHistorial: [],
        cont: 0
    }
    },
    components: {
        ItemHistorial,
    },
    methods: {
        aumentarContador(){
            this.cont++;
            return this.cont;
        },
        async obtenerHistorial() {

            try {
                const res = await HistorialService.getHistorial();
                
                this.arrayHistorial = res.data;
            
      
            } catch(error){
                 console.log(error)
            }
        }
    }
}
</script>

<style>

</style>