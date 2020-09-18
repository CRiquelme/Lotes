<template>
  <div
    v-if="uid"
    class="text-sm text-gray-600 flex items-center cursor-pointer"
    @click="claseFavorito"
  >
    <span v-if="!isActive">
      <i class="far fa-heart mr-2"></i> Agregar a favoritos
    </span>
    <span v-else>
      <i :class="{active: isActive}" class="fas fa-heart mr-2"></i> Quitar de favoritos
    </span>
  </div>
  <div v-else class="text-sm text-gray-600 flex items-center">
    <svg
      class="fill-current text-gray-500 w-3 h-3 mr-2 text-red-800"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
      />
    </svg>
    ¿Quieres más información? ...
    <router-link to="/login">Login</router-link>/
    <router-link to="/registro">Regístrate</router-link>
  </div>
</template>

<script>
export default {
  name: "AgregarFavorito",
  props: ["uid"],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    claseFavorito: function () {
      this.isActive = !this.isActive;
      //console.log(this.isActive);
      // Manejo con la base de datos:
      // Si es true al hacer click se quitará
      // Si es false al hacer click se agregará
    },
  },
};
</script>

<style>
.active {
  color: red;
}
</style>
