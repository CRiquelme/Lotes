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
// import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
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
    { path: "/perfil/:id", component: PerfilUsuario },
    { path: "/perfil-propiedad/:id", component: PerfilPropiedad, name: 'perfilpropiedad' },
    { path: "/publicar/:id", component: Publicar },
    {
      path: "/publicar",
      name: "Publicar",
      component: Publicar,
    },
    {
      path: "/mensajes",
      name: "Mensajes",
      component: Mensajes,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   let usuario = firebase.auth().currentUser;
//   let autorizacion = to.matched.some((record) => record.meta.autentificado);
//   console.log(usuario);
//   if (autorizacion && !usuario) {
//     next({ name: "Login" });
//   } else if (!autorizacion && usuario) {
//     next("Home");
//   } else {
//     next();
//   }
// });
export default router;
