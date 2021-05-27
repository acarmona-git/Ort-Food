<template>

  <div class="container">
    <div class="row gutters">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="account-settings">
              <div class="user-profile">
                <div class="user-avatar">
                  <img
                    src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    alt="Maxwell Admin"
                  />
                </div>
                <h5 class="user-name">{{ userActual.name }}</h5>
                <h6 class="user-email">Email: {{ userActual.email }}</h6>
                <h6 class="user-email">Telefono: {{ userActual.telefono }}</h6>
                <h6 class="user-email">
                  Direccion: {{ userActual.direccion }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 class="mb-3 text-primary">Personal Details</h6>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label for="fullName">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    v-model="userActual.name"
                    :placeholder="userActual.name"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label for="phone">Telefono</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    v-model="userActual.telefono"
                    :placeholder="userActual.telefono"
                  />
                </div>
              </div>
            </div>
            <div class="row gutters">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label for="Street">Direccion</label>
                  <input
                    type="name"
                    class="form-control"
                    id="Street"
                    v-model="userActual.direccion"
                    :placeholder="userActual.direccion"
                    required
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label for="ciTy">Contraseña</label>
                  <input
                    type="name"
                    class="form-control"
                    id="ciTy"
                    v-model="userActual.password"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                
                  <div class="text-right">
                    <button
                      id="submit"
                      name="submit"
                      class="btn btn-info btn-sm"
                      @click="editar()"
                    >
                      Update
                    </button>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import UserService from "../servicios/UserService";

export default {
  data() {
    return {
      userActual: {
        name: "",
        email: "",
        password: "",
        telefono: "Pendiente",
        direccion: "Pendiente",
        admin: null,
      },
    };
  },
  created() {
    this.obtenerUsuario();
  },
  methods: {
    ...mapMutations(["modificarUsuario"]),
    async obtenerUsuario() {
      try {
        console.log("PRUEBAAAAAAAAAAAAAAAAA: " + JSON.stringify(this.usuarioActual))
        const res = await UserService.getUsuariosPorEmail(this.usuarioActual);
        console.log(
          "OBJETO RECIBIDO COMO RESPUESTA AL GET: " + JSON.stringify(res)
        );

        const user = await res.data;
        this.userActual.name = this.mayuscularPrimeraLetra(user.name);
        this.userActual.email = user.email;

        alert(user.password);
        this.userActual.password = user.password;

        if (user.admin == true) this.userActual.admin = true;

        if (user.telefono != null) this.userActual.telefono = user.telefono;

        if (user.direccion != null)
          this.userActual.direccion = this.mayuscularPrimeraLetra(
            user.direccion
          );
      } catch (error) {
        console.log(error);
      }
    },
    mayuscularPrimeraLetra(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async editar() {
      try {
        const res = await UserService.putUsuario(this.userActual);
        console.log(
          "OBJETO RECIBIDO COMO RESPUESTA AL PUT PARA LA MODIFICACION: " +
            JSON.stringify(res)
        );
        //const productos = await res.data
        this.modificarUsuario(this.userActual);
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapState(["usuarioActual", "token"]),
  },
};
</script>

<style>
body {
  margin-top: 20px;
  color: #bcd0f7;
  background: #1a233a;
}
.account-settings .user-profile {
  margin: 0 0 1rem 0;
  padding-bottom: 1rem;
  text-align: center;
}
.account-settings .user-profile .user-avatar {
  margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
  width: 90px;
  height: 90px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
  margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
}
.account-settings .about {
  margin: 1rem 0 0 0;
  font-size: 0.8rem;
  text-align: center;
}
.card {
  background: #272e48;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 0;
  margin-bottom: 1rem;
}
.form-control {
  border: 1px solid #596280;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 0.825rem;
  background: #1a233a;
  color: #bcd0f7;
}
</style>