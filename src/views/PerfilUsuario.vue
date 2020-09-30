<template>
  <section>
    <div class="bg-gray-700 h-40"></div>
    <div class="container mx-auto md:py-5 grid grid-cols-5 gap-4 md:-mt-20">
      <div class="col-span-2">
        <h1 class="text-3xl uppercase font-bold text-white">
          {{ nombreCompleto }}
        </h1>
        <div class="max-w-sm rounded overflow-hidden shadow-lg md:my-10">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Datos de contacto</div>
            <div class="text-gray-700 text-base">
              <div v-if="datosUser.email">
                <i class="fas fa-envelope"></i> {{ datosUser.email }}
              </div>
              <div v-if="datosUser.telefono">
                <i class="fas fa-phone-square-alt"></i> {{ datosUser.telefono }}
              </div>
            </div>
          </div>
        </div>
        <div>Chat...</div>
      </div>
      <div class="col-span-3 md:-mt-10 grid grid-cols-2 gap-4">
        <!-- card de propiedad -->
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
            <div class="font-bold text-xl mb-2">Título de propiedad</div>
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
  </section>
</template>

<script>
import { db } from "@/firebase";
import "firebase/auth";
export default {
  name: "PerfilUsuario",
  data() {
    return {
      uid: "",
      datosUser: "",
      propiedades: [],
    };
  },
  created: function () {
    // var user = f.auth().currentUser;
    let self = this;
    const getId = this.$route.params.id;

    let dUser = db.collection("users").doc(getId);
    dUser.get().then(function (doc) {
      if (doc.exists) {
        self.datosUser = doc.data();
        // console.log(self.datosUser);
      }
    });

    console.log(getId);
    let prop = db.collection("propiedades").where("uid", "==", getId);
    prop
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          self.propiedades.push(doc.data());
          console.log(self.propiedades);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
  computed: {
    nombreCompleto: function () {
      return `${this.datosUser.nombre} ${this.datosUser.apellido}`;
    },
  },
};
</script>

<style>
</style>