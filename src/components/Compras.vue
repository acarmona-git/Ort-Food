<template>
    <div>
        <!-- <h1>Ruta Protegida</h1>
        {{token}} -->

        <img src="../assets/compra.png">



    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default{
    computed: {
        ...mapState(['token']),
    },
    methods: { //SE PUEDE MANDAR AL STORE MEJOR, la cuestion es que desde aca si le mando el token me manda la info que necesito ver
        async datosProtegidos(){
            try{
                const res = await axios.get('https://jwt-proyecto-api.herokuapp.com/api/admin', {
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': this.token
                                }
                            });

            const respuestaDB = await res.data
            console.log("Respuesta desde el metodo datos protegidos: " + JSON.stringify(respuestaDB));

            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.datosProtegidos();
    }
}

</script>
