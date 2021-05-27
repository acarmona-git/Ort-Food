<template>

  <tr v-if=prod.cantidad> <!-- este vif no deberia estar pero sino no funciona bien -->
    <th scope="row">{{prod.id}}</th>
    <td>{{prod.title}}</td>
    <td>{{prod.cantidad}}</td>
    <td>
        <button class="btn btn-info btn-sm" @click="aumentar(prod.id)">
            +
        </button>
        <button class="btn btn-danger btn-sm" @click="disminuir(prod.id)">
            -
        </button>
    </td>
    <td>${{prod.precio * prod.cantidad}}</td>
  </tr>
  
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  props: ['prod'],
  methods: {
    ...mapMutations(['aumentar','disminuir']),
  }
}
</script>

<style>

</style>