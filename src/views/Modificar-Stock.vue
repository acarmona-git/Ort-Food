<template>
  <div>

    <br>
    <form>
      Title: <input type="text" v-model="prod.title" v-bind:placeholder="prod.title" required>
      Precio: <input type="text" v-model="prod.precio" required>
      Url: <input type="text" v-model="prod.thumbnailUrl" v-bind:placeholder="prod.thumbnailUrl" required>
      <button class=" btn-info btn-sm " style="margin: 10px" v-on:click="agregar()">Agregar Producto</button>
    </form>

    <br>

    <b-row>
      <Card :desdeModificar="true" :productoDesdeElPadre="prod"
        v-for="producto of productos"
        :key="producto.id"
        :producto="producto"
      />
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from "../components/Card.vue";
import ProductoService from '../servicios/ProductoService'

export default {
    name: "modificarStock",
    components: {
        Card,
    },
    data: function(){
      return {
        prod: {
            id: 0,
            precio: "",
            title: "",
            thumbnailUrl: "",
        }
      }
    },
    
    created() {
      this.$store.dispatch("getProductos");
    },
    methods: {
      async agregar(){ 

        this.prod.id = this.productos[this.productos.length-1].id+1;

        try {
          const res = await ProductoService.postProducto(this.prod) 
          const productos = await res.data

          this.$store.commit("agregarProducto",this.prod);

          console.log("SE HIZO UN POST DEL PRODUCTO: " + JSON.stringify(productos))

          this.$store.dispatch("getProductos");

        } catch (error) {
          console.log(error)
        }
      },
    },
    computed: {
        ...mapState(['productos']),
    },
}
</script>
