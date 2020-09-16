<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import { db, f } from "@/firebase";
import "firebase/auth";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
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
          console.log(self.datosUser);
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
#titulo {
  font-family: "Montserrat", sans-serif;
}
</style>
