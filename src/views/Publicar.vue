<template>
  <section class="container mx-auto py-5">
    <h1>Publicar en CR-Lotes</h1>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content px-4 py-4">
      <!-- {{ steps[current].content }} -->
      <div v-show="steps[current].title === 'Paso 1'">
        <!-- <Paso1></Paso1> -->
      </div>
      <div v-show="steps[current].title === 'Paso 2'">
        <Paso2></Paso2>
      </div>
      <div v-show="steps[current].title === 'Paso 3'">
        <Paso3></Paso3>
      </div>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Siguiente
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Publicar
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Anterior
      </a-button>
    </div>
  </section>
</template>

<script>
import Paso2 from "./../components/publicar/Paso2";
import Paso3 from "./../components/publicar/Paso3";
export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "Paso 1",
        },
        {
          title: "Paso 2",
        },
        {
          title: "Paso 3",
        },
      ],
    };
  },
  components: {
    Paso2,
    Paso3,
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
  },
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
}

.steps-action {
  margin-top: 24px;
}
</style>
