<template>
  <div class="container mx-auto md:mt-5">
    <vk-breadcrumb>
      <li>
        <router-link to="/home" class="inline-block">
          <i class="fas fa-home"></i>
          <span class="inline-block px-3 text-base">Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/perfil" class="inline-block">
          <span class="inline-block px-3 text-base">Perfil</span>
        </router-link>
      </li>
      <vk-breadcrumb-item>Datos personales</vk-breadcrumb-item>
    </vk-breadcrumb>

    <div class="flex items-center px-8 lg:px-0">
      <h1 class="text-4xl uppercase mt-10 text-black font-black">Perfil</h1>
      <vk-button @click="show = true" type="text">
        <i class="fas fa-bars text-red-800"></i>
      </vk-button>
    </div>
    <vk-offcanvas-content id="menu_perfil">
      <vk-offcanvas flipped :show.sync="show">
        <vk-offcanvas-close @click="show = false"></vk-offcanvas-close>
        <vk-nav>
          <li class="text-2xl uppercase text-blue-800 font-medium">Perfil personal</li>
          <li class="text-blue-800 text-lg">
            <router-link to="/perfil">Datos personales</router-link>
          </li>
          <!-- <vk-nav-item href="#" title="Item"></vk-nav-item> -->
        </vk-nav>
      </vk-offcanvas>
    </vk-offcanvas-content>

    <form
      class="bg-white shadow-md rounded px-8 md:pt-6 pb-8 mb-4"
      @submit.prevent="actualizarPerfil"
    >
      <h2 class="text-blue-800 font-bold uppercase md:mt-10">Datos personales</h2>
      <div class="md:flex md:items-center mb-6 mt-10">
        <div class="md:w-1/2 pr-4 mb-6 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre"
            v-model="datosUser.nombre"
          />
        </div>
        <div class="md:w-1/2 pr-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="apellido">Apellido</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apellido"
            type="text"
            placeholder="apellido"
            v-model="datosUser.apellido"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-10">
        <div class="md:w-1/2 pr-4 mb-6 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Correo electrónico</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            v-model="datosUser.email"
          />
        </div>
        <div class="md:w-1/2 pr-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="telefono">Teléfono</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefono"
            type="text"
            placeholder="Teléfono"
            v-model="datosUser.telefono"
          />
        </div>
      </div>
      <div class="text-center text-lg lg:text-xl mb-10">
        <input
          type="submit"
          value="Actualizar datos personales"
          class="bg-blue-800 hover:bg-blue-300 text-blue-100 hover:text-blue-800 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { db, f } from "../firebase";
import "firebase/auth";
import Swal from "sweetalert2";
export default {
  name: "Perfil",
  data() {
    return {
      uid: "",
      datosUser: "",
      show: false,
    };
  },
  created: function () {
    // capturar datos de usuario
    var user = f.auth().currentUser;
    let self = this;
    // Comprobar si hay datos de usuario
    if (user != null) {
      self.uid = user.uid;
      let dUser = db.collection("users").doc(user.uid);
      dUser.get().then(function (doc) {
        if (doc.exists) {
          self.datosUser = doc.data();
          // console.log(self.datosUser);
        }
      });
      // Si no hay datos entonces redirigir al login para no ingresar a esta sección
    } else {
      this.$router.replace("login");
    }
  },
  methods: {
    actualizarPerfil() {
      let user = f.auth().currentUser;
      let self = this;
      db.collection("users")
        .doc(user.uid)
        .update({
          nombre: self.datosUser.nombre,
          apellido: self.datosUser.apellido,
          email: self.datosUser.email,
          telefono: self.datosUser.telefono,
        })
        .then(function () {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Datos actualizados",
            text: "Los datos personales fueron actualizados.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ups!",
            text: "Los datos personales no se actualizaron.",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

<style>
#menu_perfil .uk-offcanvas-bar {
  background: #e7e7e7 !important;
}
</style>
