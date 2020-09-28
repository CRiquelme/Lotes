<template>
  <section>
    <div>
      <label class="text-lg" for="area_terreno"
        >¿Cuál es el área del terreno?</label
      >
      <input
        type="number"
        step="0.1"
        min="0.1"
        class="uk-input"
        v-model="area_terreno"
        name="area_terreno"
        id="area_terreno"
        placeholder="En metros cuadrados o hectareas"
      />
    </div>

    <div class="mt-5">
      <label class="text-lg" for="frente_terreno"
        >¿Cuál es la medida del frente del terreno?</label
      >
      <input
        type="text"
        class="uk-input"
        v-model="medida_frente_terreno"
        name="medida_frente_terreno"
        id="medida_frente_terreno"
        placeholder="En metros"
      />
    </div>

    <div class="mt-5">
      <label for="" class="text-lg">¿Con qué contarán tus clientes?</label>
      <div class="uk-form-controls uk-column-1-2">
        <label
          v-for="(cco, index) in contaran_clientes_options"
          :key="index"
          class="block "
          ><input
            class="uk-checkbox"
            type="checkbox"
            v-model="contaran_clientes"
            :value="cco"
          />
          {{ cco }}</label
        >
      </div>
    </div>

    <div class="mt-5">
      <label class="uk-form-label uk-text-large uk-text-center" for=""
        >Marca en la imagen, como es el frente del terreno, en relación al
        acceso:
        <span v-if="frente_terreno_acceso != 'null'">
          {{ frente_terreno_acceso }}</span
        ></label
      >
      <div class="uk-inline uk-light">
        <img src="/images/frente_terreno.jpeg" />
        <a
          v-for="marcador in marcadores"
          :key="marcador.index"
          class="uk-position-absolute uk-transform-center"
          :class="{
            active_frente_terreno: frente_terreno_acceso_id === marcador.id,
          }"
          :style="marcador.estilo"
          uk-marker
          @click="frenteTerreno(marcador.id)"
        ></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      area_terreno: "",
      medida_frente_terreno: "",
      contaran_clientes: [],
      frente_terreno_acceso: "",
      frente_terreno_acceso_id: "",
      contaran_clientes_options: [
        "Acera",
        "Cordón y caño",
        "Alumbrado público",
        "Teléfono",
        "Electricidad",
        "Cañería de agua potable",
        "Cobertura celular",
        "Cable TV",
        "Fibra optica",
        "Internet",
        "Alcantarillado sanitario",
        "Aseo y recolección basura",
        "Facilidades comunales",
        "Edificios comerciales",
        "Escuela primaria",
        "Educación secundaria",
        "Tempo católico y otras",
        "Servicios privados, municipales, comerciales y financieros",
        "Servicios de salud",
        "Áreas recreativas",
        "Planta de tratamiento aguas residuales cercanas",
        "Riesgo de inundación o deslizamiento",
        "Afectado por alta tensión",
        "Transporte público (frente a vía publica)",
      ],
      marcadores: [
        { id: 0, estilo: "left: 30%; top: 22%" },
        { id: 1, estilo: "left: 49%; top: 29%" },
        { id: 2, estilo: "left: 29%; top: 45%" },
        { id: 3, estilo: "left: 36%; top: 45%" },
        { id: 4, estilo: "left: 48%; top: 42%" },
        { id: 5, estilo: "left: 37%; top: 57%" },
        { id: 6, estilo: "left: 40%; top: 68%" },
        { id: 7, estilo: "left: 72%; top: 58%" },
      ],
    };
  },
  methods: {
    frenteTerreno(dato) {
      var frente_de_terreno = [
        "Lote esquinero",
        "Lote cabecero",
        "Lote medianero",
        "Lote en callejón fondo",
        "Lote callejón lateral",
        "Lote medianero 2 frentes",
        "Lote cabecero",
        "Lote manzanero",
      ];
      this.frente_terreno_acceso_id = dato;
      this.frente_terreno_acceso = frente_de_terreno[dato];
    },
  },
};
</script>

<style>
.active_frente_terreno {
  color: #2b0707 !important;
  background-color: #eac111 !important;
}
</style>
