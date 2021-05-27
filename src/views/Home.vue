<template>
  <div>
    <b-row>
      <b-col>
        <Carro />
      </b-col>
    </b-row>

    <b-row>
      <Card
        v-for="producto of productos"
        :key="producto.id"
        :producto="producto"
      />
    </b-row>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Carro from "../components/Carrito.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Card,
    Carro,
  },
  created() {
    //CUANDO SE INICIA EL SERVER, creo que podria usar un mapaccions verificar
    this.$store.dispatch("getProductos");
  },
  computed: {
    ...mapState(["productos"]),
  },
};
</script>
