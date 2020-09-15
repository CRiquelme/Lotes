<template>
  <div class="registro grid place-content-center">
    <h2 class="text-center text-4xl uppercase mt-10 text-blue-800 font-black">Ingresar</h2>
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
            <div class="flex flex-col"> 
              <input
                type="submit"
                value="Ingresar a CR-Lotes"
                class="bg-blue-800 hover:bg-blue-300 text-blue-100 hover:text-blue-800 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded "
              />
              <div class="mt-4">
                Necesitas una cuenta? 
                <router-link
                  to="/registro">
                    Registrarse
                </router-link> 
              </div>
              <a @click="resetPass">Olvidé mi contraseña</a>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { f,db } from "../firebase";
import "firebase/auth";
import { required, minLength, email } from "vuelidate/lib/validators";
import Swal from 'sweetalert2';
/* import Swal from 'sweetalert2'; */

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
          .then(() => this.$router.replace("home"))
          .then(()=>{
              const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Haz ingresado satisfactoriamente.'
            })
          })
          .catch(function(error) {
            //console.log(error.code)
            if(error.code=="auth/user-not-found"){
              Swal.fire({
                icon:"error",
                title:"El usuario ingresado no existe",
              })
            }
            if(error.code=="auth/wrong-password"){
              Swal.fire({
                icon:"error",
                title:"Contraseña incorrecta"
              })
            }

          });
      }
    },
    async resetPass(){
      const { value: email } = await Swal.fire({
        title: 'Recuperación de contraseña',
        text:"Coloca la dirección de tu correo electrónico que usas normalmente en CR-Lotes.",
        input: 'email',
        inputPlaceholder: 'Coloca acá tu email',
      })
      if(email){
        const u=db.collection('users').where("email","==",email)
        u.get()
        .then(()=>(f.auth().sendPasswordResetEmail(email)))
        .then(function() {
          Swal.fire({
            icon: 'info',
            title: 'Confirmación',
            text: 'Hemos enviado un mensaje a tu correo para recuperar tu contraseña.',
          })
        })
        .catch(function(error) {
          console.log(error.code)
          if (error.code=="auth/user-not-found"){
            Swal.fire({
              icon: 'error',
              title: 'Confirmación',
              text: 'El correo ingresado no está registrado.',
            })
          }
        });
      }
    }
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
