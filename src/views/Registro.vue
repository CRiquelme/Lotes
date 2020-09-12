<template>
  <div class="registro grid place-content-center">
    <h2 class="text-4xl uppercase mt-10 text-blue-800 font-black">
      Registrarse a CR-Lotes
    </h2>
    <form
      @submit.prevent="registro"
      class="w-full max-w-lg text-left bg-gray-100 shadow-md rounded px-10 pt-10 pb-10 mb-4"
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="nombre"
          >
            Nombre
          </label>
          <input
            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nombre"
            type="text"
            placeholder="Nombre"
            v-model="nombre"
          />
          <!-- <p class="text-red-500 text-xs italic">ejemplo de error</p> -->
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="apellido"
          >
            Apellido
          </label>
          <input
            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="apellido"
            type="text"
            placeholder="Apellido"
            v-model="apellido"
          />
        </div>
      </div>

      <div class="mb-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="email"
        >
          Correo electrónico
        </label>
        <input
          class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="email"
          type="text"
          placeholder="Correo electrónico"
          v-model="email"
        />
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="contrasena"
          >
            Contraseña
          </label>
          <input
            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="contrasena"
            type="password"
            placeholder="******************"
            v-model="contrasena"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="confirmar_contrasena"
          >
            Confirmar contraseña
          </label>
          <input
            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="confirmar_contrasena"
            type="password"
            placeholder="******************"
            v-model="confirmar_contrasena"
          />
        </div>
      </div>
      <div class="text-center text-xl">
        <input
          type="submit"
          value="Quiero registrarme en CR-Lotes"
          class="bg-blue-800 hover:bg-blue-300 text-blue-100 hover:text-blue-800 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { db, f } from "../firebase";
import "firebase/auth";

export default {
  name: "Registro",
  data() {
    return {
      email: "",
      contrasena: "",
      confirmar_contrasena: "",
      nombre: "",
      apellido: "",
    };
  },
  methods: {
    registro() {
      let self = this;
      // Comprobar
      if (
        self.nombre != "" &&
        self.apellido != "" &&
        self.email != "" &&
        self.contrasena != "" &&
        self.contrasena != self.confirmar_contrasena
      ) {
        // Si pasa la comprobación
        f.auth()
          .createUserWithEmailAndPassword(this.email, this.contrasena)
          .then(function(data) {
            let uid = data.user.uid;
            db.collection("users")
              .doc(uid)
              .set({
                id: uid,
                email: self.email,
                nombre: self.nombre,
                apellido: self.apellido,
              });
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      } else {
        // Si hay errores
        self.nombre === "" ? console.log("Nombre") : "";
      }
    },
  },
};
</script>

<style></style>
