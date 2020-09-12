import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.css";
import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";
import "@vuikit/theme";
import firebase from 'firebase'

Vue.config.productionTip = false;

Vue.use(Vuikit);
Vue.use(VuikitIcons);
firebase.auth().onAuthStateChanged(()=>{
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
})

