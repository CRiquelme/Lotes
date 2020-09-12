import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Registro from "./views/Registro.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
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
  ],
});
