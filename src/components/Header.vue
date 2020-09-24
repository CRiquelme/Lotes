<template>
  <section id="nav">
    <header class="bg-gray-800 py-2 text-white">
      <div class="container mx-auto flex items-center justify-between pt-5">
        <div class="flex">
          <router-link to="/home" class="inline-block hover:no-underline">
            <h2 id="titulo" class="text-lg lg:text-3xl text-white pl-1 lg:pl-0">
              CR-Lotes
            </h2>
          </router-link>
        </div>
        <div>
          <ul class="flex">
            <li>
              <router-link to="/home" class="inline-block py-1 px-5">
                <i class="fas fa-home text-white"></i>
                <span class="inline-block py-1 px-3 text-white text-base"
                  >Home</span
                >
              </router-link>
            </li>
            <li v-if="uid">
              <vk-button class="text-center px-5" type="text">
                <i class="fas fa-user-circle text-white"></i>
                <span
                  class="inline-block py-2 px-3 text-white text-base capitalize"
                  >{{ datosUser.nombre }}</span
                >
                <i class="fas fa-angle-down text-white mr-1 md:mr-5"></i>
              </vk-button>
              <vk-dropdown>
                <vk-nav-dropdown>
                  <li>
                    <router-link to="/perfil">Perfil</router-link>
                  </li>
                  <vk-nav-item title="Favoritos"></vk-nav-item>
                  <vk-nav-item-divider></vk-nav-item-divider>
                  <vk-nav-item-header title="Propiedades"></vk-nav-item-header>
                  <li>
                    <router-link to="/publicar">Publicar</router-link>
                  </li>
                  <vk-nav-item-divider></vk-nav-item-divider>
                  <vk-nav-item title="Salir" @click="logout"></vk-nav-item>
                </vk-nav-dropdown>
              </vk-dropdown>
            </li>
            <li v-if="!uid">
              <router-link to="/login" class="inline-block py-1 px-5">
                <span class="inline-block py-1 px-3 text-white text-base"
                  >Ingresar</span
                >
              </router-link>
            </li>
            <li v-if="!uid">
              <router-link to="/registro" class="inline-block py-1 px-5">
                <span class="inline-block py-1 px-3 text-white text-base"
                  >Registrarse</span
                >
              </router-link>
            </li>

            <li class="py-1 px-3">
              <vk-button @click="show = true" type="text">
                <i class="fas fa-bars text-white pt-2"></i>
              </vk-button>
              <vk-offcanvas-content>
                <vk-offcanvas flipped :show.sync="show">
                  <vk-offcanvas-close
                    @click="show = false"
                  ></vk-offcanvas-close>
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
          </ul>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import { db, f } from "@/firebase";
import "firebase/auth";

export default {
  name: "Header",
  data() {
    return {
      uid: "",
      datosUser: "",
      show: false,
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
header {
  background-image: linear-gradient(90deg, rgb(33, 33, 33) 0%, transparent 59%),
    repeating-linear-gradient(
      45deg,
      rgba(168, 168, 168, 0.1) 0px,
      rgba(168, 168, 168, 0.1) 1px,
      transparent 1px,
      transparent 13px
    ),
    repeating-linear-gradient(
      135deg,
      rgba(168, 168, 168, 0.1) 0px,
      rgba(168, 168, 168, 0.1) 1px,
      transparent 1px,
      transparent 13px
    ),
    linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33));
}

.uk-offcanvas-bar {
  background: #f7fafc !important;
}
</style>
