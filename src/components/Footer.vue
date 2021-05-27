<template>
    <tr>
    <th scope="row" colspan="2">Total productos</th> 
    <td>{{totalCantidad}}</td>
    <td>
        <button class="btn btn-danger btn-sm" id="vaciar-carrito" @click="vaciar"> vaciar todo </button>  
        <button class="btn btn-danger btn-sm" id="confirmar-compra" style="margin: 10px" @click="confirmarCompra()"> Confirmar Compra </button>  
        <!-- <router-link to="/Compras" tag="button" class="btn btn-danger btn-sm" style="margin: 10px">Confirmar compra</router-link> -->
    </td>
    <td class="font-weight-bold">$ <span>{{totalPrecio}}</span></td>
    </tr>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HistorialService from '../servicios/HistorialService.js'
import router from '../router/index'

export default {
    name: 'Footer',
    methods: {
        vaciar() {  //Podria realizar un mapMuttation pero se hace de esta manera por aprendisaje
            this.$store.commit('setVaciar')
        },
        async confirmarCompra() {

           

             try {
                const res = await HistorialService.postCarrito(this.carrito);
                const respuestaDB = await res.data
                console.log("COMPRA PARA EL HISTORIAL " + respuestaDB);
             } catch(error){
                 console.log(error)
             }
            
            
            //console.log("ESTE ES EL TOKEN: " + this.token)
            if(this.token != null){
                if(this.esAdmin == false){
                    router.push('/Compras')
                } else {
                    alert("Los administradores no pueden realizar compras")
                }
            } else {
                router.push('/Login')
            }
        }
    },
    computed: {
        ...mapState(["token","esAdmin","carrito","usuarioActual"]),
        ...mapGetters(['totalCantidad','totalPrecio']), //NOSE SI CARRITO FUNCIONE BIEN
    }
}
</script>

