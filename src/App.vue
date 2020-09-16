<template>
  <!-- Estoy es un ejemplo... hay que modificarlo luego -->
  <!-- Lo hice así solo para probar, quería dejar la parte funcional activa -->
  <div id="app">
    <section v-if="uid" id="nav">
      <header class="bg-gray-200 py-2">
        <div class="container mx-auto flex items-center justify-between pt-5">
          <div class="flex">
            <router-link to="/home" class="inline-block">
              <h2 id="titulo" class="text-3xl text-blue-800">CR-Lotes</h2>
            </router-link>
          </div>
          <div>
            <ul class="flex">
              <li>
                <router-link to="/home" class="inline-block py-1 px-5">
                  <i class="fas fa-home text-blue-800"></i>
                  <span class="inline-block py-1 px-3 text-blue-800 text-base">Home</span>
                </router-link>
              </li>
              <li>
                <vk-button class="text-center px-5" type="text">
                  <i class="fas fa-user-circle text-blue-800"></i>
                  <span
                    class="inline-block py-2 px-3 text-blue-800 text-base capitalize"
                  >{{ datosUser.nombre }}</span>
                </vk-button>
                <vk-dropdown>
                  <vk-nav-dropdown>
                    <li>
                      <router-link to="/perfil">Perfil</router-link>
                    </li>
                    <vk-nav-item title="Item"></vk-nav-item>
                    <vk-nav-item-divider></vk-nav-item-divider>
                    <vk-nav-item-header title="Sección 2"></vk-nav-item-header>
                    <vk-nav-item title="Item"></vk-nav-item>
                    <vk-nav-item-divider></vk-nav-item-divider>
                    <vk-nav-item title="Salir" @click="logout"></vk-nav-item>
                  </vk-nav-dropdown>
                </vk-dropdown>
              </li>

              <li class="py-1 px-3">
                <vk-button @click="show = true" type="text">
                  <i class="fas fa-bars text-blue-800 pt-2"></i>
                </vk-button>
                <vk-offcanvas-content class="bg-gray-200">
                  <vk-offcanvas flipped :show.sync="show">
                    <vk-offcanvas-close @click="show = false"></vk-offcanvas-close>
                    <h3 class="text-2xl">Menú de navegación</h3>
                    <vk-nav>
                      <vk-nav-item-header title="Header"></vk-nav-item-header>
                      <vk-nav-item href="#" title="Item"></vk-nav-item>
                      <vk-nav-item href="#" title="Item"></vk-nav-item>
                      <vk-nav-item-divider></vk-nav-item-divider>
                      <vk-nav-item title="Salir" @click="logout"></vk-nav-item>
                    </vk-nav>
                  </vk-offcanvas>
                </vk-offcanvas-content>
              </li>

              <!-- <li class="mr-6">
        <router-link
        to="/perfil"
        class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
        >Perfil</router-link>
              </li>-->
            </ul>
          </div>
        </div>
      </header>
    </section>
    <section v-else id="nav">
      <router-link to="/login">Login</router-link>
      <router-link to="/registro">Registro</router-link>
      <router-link to="/perfil">Perfil</router-link>
    </section>
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
      show: false,
    };
  },
  created: function () {
    var user = f.auth().currentUser;
    let self = this;
    if (user != null) {
      self.uid = user.uid;
      let dUser = db.collection("users").doc(user.uid);
      dUser.get().then(function (doc) {
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

<style>
#titulo {
  font-family: "Montserrat", sans-serif;
}
</style>
