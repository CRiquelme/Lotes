<template>
  <div class="registro grid place-content-center">
    <h2 class="text-4xl uppercase mt-10 text-blue-800 font-black">Ingresar</h2>
    <form
      @submit.prevent="login"
      class="w-full max-w-lg text-left bg-gray-100 shadow-md rounded px-10 pt-10 pb-10 mb-4"
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="form-group w-full  px-3 mb-6 md:mb-0">
          <!-- email -->
          <div>
            <label
              :class="{
                'label-error': $v.email.$error,
                label: !$v.email.$error,
              }"
              for="email"
            >
              Correo
            </label>
            <input
              :class="{
                'input-error': $v.email.$error,
                input: !$v.email.$error,
              }"
              v-model.trim="$v.email.$model"
              id="email"
              type="text"
              placeholder="Correo"
            />
            <div
              v-if="!$v.email.required"
              :class="{
                'mensaje-error': $v.email.$error,
                hidden: !$v.email.$error,
              }"
            >
              Es requerido
            </div>
          </div>
          <!-- contrasena -->
          <div>
            <label
              :class="{
                'label-error': $v.contrasena.$error,
                label: !$v.contrasena.$error,
              }"
              for="contrasena"
            >
              Contraseña
            </label>
            <input
              :class="{
                'input-error': $v.contrasena.$error,
                input: !$v.contrasena.$error,
              }"
              v-model.trim="$v.contrasena.$model"
              id="contrasena"
              type="password"
              placeholder="******************"
            />
            <div
              v-if="!$v.contrasena.required"
              :class="{
                'mensaje-error': $v.contrasena.$error,
                hidden: !$v.contrasena.$error,
              }"
            >
              Es requerido
            </div>
            <input
              type="submit"
              value="Ingresar a CR-Lotes"
              class="bg-blue-800 hover:bg-blue-300 text-blue-100 hover:text-blue-800 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { f } from "../firebase";
import "firebase/auth";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      contrasena: "",
    };
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        f.auth()
          .signInWithEmailAndPassword(this.email, this.contrasena)
          .then(
            () => this.$router.replace("home"),
            (error) => console.log(error)
          )
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
    },
  },
  validations: {
    contrasena: {
      required,
      minLength: minLength(6),
    },
    email: {
      email,
      required,
    },
  },
};
</script>

<style></style>
