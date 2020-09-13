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
        <!-- Nombre -->
        <div class="form-group w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            :class="{
              'label-error': $v.nombre.$error,
              label: !$v.nombre.$error,
            }"
            for="nombre"
          >
            Nombre
          </label>
          <input
            :class="{
              'input-error': $v.nombre.$error,
              input: !$v.nombre.$error,
            }"
            id="nombre"
            type="text"
            placeholder="Nombre"
            v-model.trim="$v.nombre.$model"
          />
          <div
            v-if="!$v.nombre.required"
            :class="{
              'mensaje-error': $v.nombre.$error,
              hidden: !$v.nombre.$error,
            }"
          >
            Es requerido
          </div>
          <div
            :class="{ 'mensaje-error': $v.nombre.$error }"
            v-if="!$v.nombre.minLength"
          >
            Debe contener al menos
            {{ $v.nombre.$params.minLength.min }} letras.
          </div>
        </div>
        <!-- apellido -->
        <div class="w-full md:w-1/2 px-3">
          <label
            :class="{
              'label-error': $v.apellido.$error,
              label: !$v.apellido.$error,
            }"
            for="apellido"
          >
            Apellido
          </label>
          <input
            :class="{
              'input-error': $v.apellido.$error,
              input: !$v.apellido.$error,
            }"
            v-model.trim="$v.apellido.$model"
            id="apellido"
            type="text"
            placeholder="Apellido"
          />
          <div
            v-if="!$v.apellido.required"
            :class="{
              'mensaje-error': $v.apellido.$error,
              hidden: !$v.apellido.$error,
            }"
          >
            Es requerido
          </div>
          <div
            :class="{ 'mensaje-error': $v.apellido.$error }"
            v-if="!$v.apellido.minLength"
          >
            Debe contener al menos
            {{ $v.apellido.$params.minLength.min }} letras.
          </div>
        </div>
      </div>

      <!-- email -->
      <div class="mb-4">
        <label
          :class="{
            'label-error': $v.email.$error,
            label: !$v.email.$error,
          }"
          for="email"
        >
          Correo electrónico
        </label>
        <input
          :class="{
            'input-error': $v.email.$error,
            input: !$v.email.$error,
          }"
          v-model.trim="$v.email.$model"
          id="email"
          type="text"
          placeholder="Correo electrónico"
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
        <div
          v-if="!$v.email.email"
          :class="{
            'mensaje-error': $v.email.$error,
            hidden: !$v.email.$error,
          }"
        >
          Debe ser un correo electrónico válido
        </div>
      </div>

      <!-- contraseña -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
          <div
            :class="{ 'mensaje-error': $v.contrasena.$error }"
            v-if="!$v.contrasena.minLength"
          >
            Debe contener al menos
            {{ $v.contrasena.$params.minLength.min }} letras.
          </div>
        </div>

        <!-- confirmación contraseña -->
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            :class="{
              'label-error': $v.confirmacion_contrasena.$error,
              label: !$v.confirmacion_contrasena.$error,
            }"
            for="confirmar_contrasena"
          >
            Confirmar contraseña
          </label>
          <input
            :class="{
              'input-error': $v.confirmacion_contrasena.$error,
              input: !$v.confirmacion_contrasena.$error,
            }"
            v-model.trim="$v.confirmacion_contrasena.$model"
            id="confirmacion_contrasena"
            type="password"
            placeholder="******************"
          />
          <div
            :class="{
              'mensaje-error': !$v.confirmacion_contrasena.sameAsPassword,
            }"
            v-if="!$v.confirmacion_contrasena.sameAsPassword"
          >
            Contraseñas deben ser identicas
          </div>
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
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  name: "Registro",
  data() {
    return {
      errors: [],
      email: "",
      contrasena: "",
      confirmacion_contrasena: "",
      nombre: "",
      apellido: "",
      submitStatus: null,
    };
  },
  methods: {
    registro() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
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
      }
    },
  },
  validations: {
    nombre: {
      required,
      minLength: minLength(3),
    },
    apellido: {
      required,
      minLength: minLength(3),
    },
    contrasena: {
      required,
      minLength: minLength(6),
    },
    confirmacion_contrasena: {
      sameAsPassword: sameAs("contrasena"),
    },
    email: {
      email,
      required,
    },
  },
};
</script>
