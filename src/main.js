import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.css";
import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";
import "@vuikit/theme";
import firebase from "firebase";
import Vuelidate from "vuelidate";
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;

Vue.use(Vuikit);
Vue.use(VuikitIcons);
Vue.use(Vuelidate);
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAXfjM-ENwQbcfybmC_kSAofPHayGe3rog',
  },
})
