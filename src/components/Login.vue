<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="usuario" type="text" placeholder="Usuario" />
      <input v-model="contrasena" type="text" placeholder="Contraseña" />
      <input type="submit" value="Acceder" />
    </form>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
import { f } from "../firebase";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },
  methods: {
    login() {
      f.auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          () => alert(`Conectado`),
          (error) => console.log(error)
        )
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
  },
};
</script>

<style></style>
