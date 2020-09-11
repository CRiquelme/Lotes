<template>
  <div class="home">
    <Login></Login>
    <vk-offcanvas-content>
      <vk-button @click="show = !show" class="uk-margin-small-right"
        >Open</vk-button
      >
      <a @click="show = !show">Open</a>

      <vk-offcanvas :show.sync="show">
        <vk-offcanvas-close @click="show = false"></vk-offcanvas-close>
        <h3>Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </vk-offcanvas>
    </vk-offcanvas-content>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "home",
  data() {
    return {
      show: false,
    };
  },

  components: {
    Login,
  },
};
</script>

<style></style>
