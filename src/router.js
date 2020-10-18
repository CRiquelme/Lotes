import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Registro from "@/views/Registro";
import Home from "@/views/Home";
import Perfil from "@/views/Perfil";
import Publicar from "@/views/Publicar";
import PerfilUsuario from "@/views/PerfilUsuario";
import PerfilPropiedad from "@/views/PerfilPropiedad";
import Mensajes from "@/views/Mensajes";
 import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [

    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/registro",
      name: "Registro",
      component: Registro,
    },
    {
      path: "*",
      name: "Error",
      component: Error,
    },

    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Perfil",
      name: "Perfil",
      component: Perfil,
      meta: {
        autentificado: true,
      },
    },
    { 
      path: "/perfil/:id", 
      component: PerfilUsuario,
      meta: {
        autentificado: true,
      },
     },
    { 
      path: "/perfil-propiedad/:id", 
      component: PerfilPropiedad, 
      name: 'perfilpropiedad',
      meta: {
        autentificado: true,
      },
    },
    { 
      path: "/publicar/:id", 
      component: Publicar,
      meta: {
        autentificado: true,
      },
    },
    {
      path: "/publicar",
      name: "Publicar",
      component: Publicar,
      meta: {
        autentificado: true,
      },
    },
    {
      path: "/mensajes",
      name: "Mensajes",
      component: Mensajes,
      meta: {
        autentificado: true,
      },
    },
  ],
});

 router.beforeEach((to, from, next) => {
   let usuario = firebase.auth().currentUser;
   let autorizacion = to.matched.some((record) => record.meta.autentificado);

   if (autorizacion && !usuario) {
     next({ name: "Login" });
   } else {
     next();
   }
 });
export default router;
