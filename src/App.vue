<template>
  <!-- Estoy es un ejemplo... hay que modificarlo luego -->
  <!-- Lo hice así solo para probar, quería dejar la parte funcional activa -->
  <div id="app">
    <div v-if="uid" id="nav">
      <ul class="flex">
        <li class="mr-6">
          <span
            class="inline-block border border-gray-200 rounded py-1 px-3 bg-gray-200 text-blue-800 text-2xl"
            >Hola... {{ datosUser.nombre }} {{ datosUser.apellido }}</span
          >
        </li>
        <li class="mr-6">
          <router-link
            to="/home"
            class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
            >Home</router-link
          >
        </li>
        <li class="mr-6">
          <router-link
            to="/perfil"
            class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
            >Perfil</router-link
          >
        </li>
        <li class="mr-6">
          <a
            href="#"
            @click="logout"
            class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
            >Cerra Sesion</a
          >
        </li>
      </ul>
    </div>
    <div v-else id="nav">
      <router-link to="/login">Login</router-link>
      <router-link to="/registro">Registro</router-link>
      <router-link to="/perfil">Perfil</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { db, f } from "@/firebase";
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
    var user = f.auth().currentUser;
    let self = this;
    if (user != null) {
      self.uid = user.uid;
      let dUser = db.collection("users").doc(user.uid);
      dUser.get().then(function(doc) {
        if (doc.exists) {
          self.datosUser = doc.data();
          console.log(self.datosUser);
        }
      });
    }
  },
  methods: {
    logout() {
      f.auth()
        .signOut()
        .then(() => this.$router.replace("Login"));
    },
  },
};
</script>
