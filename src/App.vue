<template>
  <section id="app">
    <Header id="header"></Header>
    <router-view id="contenido" class="bg-gray-100" />
    <div class="bottom-0 right-0 mr-5 mb-5 rounded-full h-10 w-12 md:fixed bg-blue-900 text-blue-200 py-2 text-center">
      <router-link to="/publicar" class="text-blue-200">
        <i class="far fa-edit"></i>
      </router-link>
    </div>
    <Footer id="footer"></Footer>
  </section>
</template>

<script>
import { db, f } from "@/firebase";
import "firebase/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      uid: "",
      datosUser: "",
      show: false,
    };
  },
  created: function () {
    var user = f.auth().currentUser;
    let self = this;
    if (user != null) {
      self.uid = user.uid;
      let dUser = db.collection("users").doc(user.uid);
      dUser.get().then(function (doc) {
        if (doc.exists) {
          self.datosUser = doc.data();
          // console.log(self.datosUser);
        }
      });
    }
  },
  methods: {
    logout() {
      f.auth()
        .signOut()
        .then(() => this.$router.replace("Login"));
    },
  },
};
</script>

<style>
#app {
  display: grid;
  grid-template-areas:
    "header"
    "contenido"
    "footer";
  grid-template: 72px 1fr 100px / 1fr;
  height: 100vh;
}

#titulo {
  font-family: "Montserrat", sans-serif;
}
</style>
