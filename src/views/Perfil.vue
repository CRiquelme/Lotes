<template>
  <div class="container mx-auto">
    <h1 class="text-4xl uppercase mt-10 text-blue-800 font-black">Perfil</h1>
    <h2>Datos personales</h2>
  </div>
</template>

<script>
import { db, f } from "../firebase";
import "firebase/auth";
export default {
  name: "Perfil",
  data() {
    return {
      uid: "",
      datosUser: "",
    };
  },
  created: function() {
    // capturar datos de usuario
    var user = f.auth().currentUser;
    let self = this;
    // Comprobar si hay datos de usuario
    if (user != null) {
      self.uid = user.uid;
      this.datosUser = db.collection("user").doc(self.uid);
      // Si no hay datos entonces redirigir al login para no ingresar a esta sección
    } else {
      this.$router.replace("login");
    }
  },
};
</script>

<style></style>
