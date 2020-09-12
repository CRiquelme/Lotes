import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home"
import firebase from 'firebase'

Vue.use(Router);

const router= new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta:{
        autentificado:true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {

  let usuario=firebase.auth().currentUser;
  let autorizacion=to.matched.some(record=>record.meta.autentificado)
  console.log(usuario)
  if (autorizacion && !usuario) {
    next({ name: 'Login' })
  }else if(!autorizacion && usuario) {
    next('Home')
  }else{
    next()
  }
})
export default router;
