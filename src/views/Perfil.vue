<template>
  <section>
    <div class="container mx-auto md:pt-5">
      <!-- Migas de pan -->
      <vk-breadcrumb>
        <li>
          <router-link to="/home" class="inline-block">
            <i class="fas fa-home"></i>
            <span class="inline-block px-3 text-base">Home</span>
          </router-link>
        </li>
        <vk-breadcrumb-item>Perfil</vk-breadcrumb-item>
      </vk-breadcrumb>

      <!-- Título -->
      <div class="flex items-center px-8 lg:px-0">
        <h1 class="text-4xl uppercase mt-10 text-black font-black">Perfil</h1>
      </div>

      <form
        class="bg-white shadow-md rounded px-8 md:pt-6 pb-8 mb-4"
        @submit.prevent="actualizarPerfil"
      >
        <h2 class="text-blue-800 font-bold uppercase md:mt-10">
          Datos personales
        </h2>
        <div class="md:flex md:items-center mb-6 mt-10">
          <div class="md:w-1/2 pr-4 mb-6 md:mb-0">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="nombre"
              >Nombre</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre"
              v-model="datosUser.nombre"
            />
          </div>
          <div class="md:w-1/2 pr-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="apellido"
              >Apellido</label
            >
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
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
              >Correo electrónico</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              v-model="datosUser.email"
            />
          </div>
          <div class="md:w-1/2 pr-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="telefono"
              >WhatsApp (recuerda agregar el prefijo)</label
            >
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
    <div class="bg-gray-200 md:mt-10">
      <!-- Lista de propiedades -->
      <div class="px-8 md:pt-6 pb-8 container mx-auto md:pt-5">
        <h2 class="text-blue-800 font-bold uppercase md:mt-10">
          Tus propiedades a la venta
        </h2>
        <div class="col-span-3 grid grid-cols-4 gap-4 my-5">
          <div
            v-for="propiedad in propiedades"
            :key="propiedad.id"
            class="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <img
              class="w-full"
              src="https://source.unsplash.com/random"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                <router-link :to="'/PerfilPropiedad/' + propiedad.propid">
                  {{ propiedad.tipo }} - Provincia
                </router-link>
              </div>
              <p class="text-gray-700 text-base">Acá irá la descripción....</p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ propiedad.tipo }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      propiedades: [],
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
        }
      });
      // Si no hay datos entonces redirigir al login para no ingresar a esta sección
    } else {
      this.$router.replace("login");
    }

    let prop = db.collection("propiedades").where("uid", "==", user.uid);
    prop
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let data = { ...doc.data(), propid: doc.id };
          self.propiedades.push(data);
          console.log(self.propiedades);
          console.log(doc.id);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
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
  background: #fefff7 !important;
}

#menu_perfil .uk-nav-default > li > a {
  color: rgb(73, 71, 71);
}
</style>
