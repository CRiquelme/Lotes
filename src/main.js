import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.css";
import Vuikit from "vuikit";
import { firestorePlugin } from "vuefire";
import VuikitIcons from "@vuikit/icons";
import "@vuikit/theme";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

Vue.use(Vuikit);
Vue.use(VuikitIcons);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
