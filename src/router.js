import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Registro from "@/views/Registro";
import Home from "@/views/Home";
import Ubicacion from "@/views/Ubicacion";
// import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/ubicacion",
      name: "Ubicacion",
      component: Ubicacion,
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
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        autentificado: true,
      },
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
