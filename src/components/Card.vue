<template>


  <div>
    <b-col> <!-- probar el style en 20 que queda mejor -->
    <b-card  
      :title="producto.title"
      :img-src="producto.thumbnailUrl"
      :img-alt="producto.title"
      img-top
      tag="article"
      style="max-width: 16rem" 
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <div v-if="desdeModificar">
          <button class="btn btn-outline-info btn-sm" @click="borrarProducto(producto.id)">Borrar producto</button>
          <button class="btn btn-outline-info btn-sm" @click="modificarProducto(producto.id)">Modificar producto</button>
      </div>

      <b-button href="#" variant="primary" v-else @click="agregar(producto)">Comprar</b-button>
    </b-card>
    </b-col>


  </div>
</template>

<script>
import ProductoService from '../servicios/ProductoService'
import { mapState } from 'vuex';

export default {
    props: ['producto','desdeModificar','productoDesdeElPadre'],
    data: function(){
      return {
          precio: "",
      }
    },
    computed: {
        ...mapState(['productos']),
    },
    methods: {
      agregar(producto) {
        this.$store.dispatch('agregarAlCarrito',producto);

        

      },
      async modificarProducto(id){
        
        let productoModificar = this.productos.find((prod) => prod.id == id)

        if(productoModificar!=null){
            if(this.productoDesdeElPadre.title != ""){
              productoModificar.title = this.productoDesdeElPadre.title
            }
            if(this.productoDesdeElPadre.precio != 0){
              productoModificar.precio =  this.productoDesdeElPadre.precio
            }
            if(this.productoDesdeElPadre.thumbnailUrl != ""){
              productoModificar.thumbnailUrl = this.productoDesdeElPadre.thumbnailUrl
            }
        }

        try {

          const res = await ProductoService.putProducto(productoModificar) 
          console.log("OBJETO RECIBIDO COMO RESPUESTA AL PUT PARA LA MODIFICACION: "+ JSON.stringify(res))
          //const productos = await res.data
          
        } catch (error) {
          console.log(error)
        }

      },
      async borrarProducto(id){
        try {
          const res = await ProductoService.deleteProducto(id) //HACE UN GET POR DEFECTO
          const productos = await res.data
          console.log("PRODUCTO BORRADO: " + JSON.stringify(productos))
          this.reordenarIds(id)
        } catch (error) {
          console.log(error)
        }
      },
      async reordenarIds(id){

        let arrayAux = this.productos;
        let indice = arrayAux.findIndex((prod)=>{return prod.id == id})

        arrayAux.splice(indice,1)

        for(let i=0; i<arrayAux.length; i++){
            arrayAux[i].id=i+1
        }

        try {
            await ProductoService.deleteProductos();
            await ProductoService.postProductos(arrayAux);
        } catch (error) {
          console.log(error)
        }
        
      }
    }

}
</script>