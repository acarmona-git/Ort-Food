<template>

   <tbody id="compras">

        <p> Compra N°{{contador}}  </p>
        <tr v-for="item in historicoActual" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }} </td>
          <td>{{ item.cantidad }} </td>
          <td>{{ item.precio }} </td>
       </tr>

    </tbody> 
  
</template>

<script>
export default {
  props: ['historico','contador'],

  data: function(){
    return {
        historicoActual: Object.values(this.historico)
    }
  }

}
</script>
