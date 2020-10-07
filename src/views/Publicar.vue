<template>
  <section>
    <div class="container mx-auto md:py-10 mb-10 px-5">
      <h1 class="font-black uppercase text-2xl my-10">Publicar en CR-Lotes</h1>

      <!-- Pasos -->
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>

      <!-- Contenido de pasos -->
      <div class="steps-content px-4 py-4">
        <!-- Paso 1 -->
        <div
          v-show="steps[current].title === 'Paso 1'"
          class="flex flex-col md:flex-row flex-wrap"
        >
          <!-- Listas -->
          <div class="w-full mb-5 md:w-1/2 flex flex-col md:pr-10">
            <div class="md:flex md:items-center">
              <div class="md:w-1/5">
                <label class="text-lg" for="selectPrv">Provincia: </label>
              </div>
              <div class="md:w-4/5">
                <select
                  name="Provincia"
                  id="selectPrv"
                  @change="ProvinciaChange"
                  class="uk-select"
                >
                  <option
                    v-for="pr in provincias"
                    :key="pr.key"
                    :value="pr.key"
                  >
                    {{ pr.value }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Provincia -->

            <div class="md:flex md:items-center mt-5">
              <div class="md:w-1/5">
                <label class="text-lg" for="selectCtn">Cantón: </label>
              </div>
              <div class="md:w-4/5">
                <select
                  v-if="cantones"
                  @change="CantonChange"
                  name="Cantones"
                  id="selectCtn"
                  class="uk-select"
                >
                  <option v-for="ct in cantones" :key="ct.key" :value="ct.key">
                    {{ ct.value }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Cantón -->

            <div class="md:flex md:items-center mt-5">
              <div class="md:w-1/5">
                <label class="text-lg" for="selectDtt">Distrito: </label>
              </div>
              <div class="md:w-4/5">
                <select
                  v-if="distritos"
                  @change="DistritoChange"
                  name="Distritos"
                  id="selectDtt"
                  class="uk-select"
                >
                  <option v-for="dt in distritos" :key="dt.key" :value="dt.key">
                    {{ dt.value }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Distrito -->

            <div class="md:flex md:items-center mt-5">
              <div class="md:w-1/5">
                <label class="text-lg" for="lat">Latitud: </label>
              </div>
              <div class="md:w-4/5">
                <input
                  type="text"
                  id="lat"
                  class="uk-input"
                  v-model="lat"
                  disabled
                />
              </div>
            </div>
            <!-- Latitud -->

            <div class="md:flex md:items-center mt-5">
              <div class="md:w-1/5">
                <label class="text-lg" for="lng">Longitud: </label>
              </div>
              <div class="md:w-4/5">
                <input
                  type="text"
                  id="lng"
                  class="uk-input"
                  v-model="lng"
                  disabled
                />
              </div>
            </div>
            <!-- Longitud -->

            <!-- tipoPropiedad -->
          </div>

          <!-- Mapa -->
          <div class="w-full md:w-1/2">
            <button
              type="button"
              class="uk-button uk-button-secondary uk-width-1-1 leading-4"
              @click="locatorButtonPressed"
            >
              <i class="fas fa-map-marked"></i> Buscar ubicación cerca de tu
              posición actual
            </button>
            <GmapMap
              :center="selectedCenter"
              :zoom="selectedZoom"
              mapTypeControl="false"
              streetViewControl="false"
              class="w-full h-64"
              ref="mapRef"
            >
              <GmapMarker
                :position="selectedCenter"
                :draggable="true"
                @dragend="coordenadasManuales($event.latLng)"
                ref="GoogleMrkr"
              />
            </GmapMap>
          </div>
        </div>

        <!-- Paso 2 -->
        <div v-show="steps[current].title === 'Paso 2'">
          <section id="paso2">
            <!-- Pregunta 1 -->
            <div class="md:flex">
              <!-- ¿Cuál es el área del terreno? -->
              <div class="flex md:items-center w-full md:w-2/3">
                <div class="md:w-2/5">
                  <label class="text-lg" for="area_terreno"
                    >¿Cuál es el área del terreno?</label
                  >
                </div>
                <div class="md:w-3/5">
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
              </div>
              <!-- Tipo de medida -->
              <div class="uk-form-controls md:ml-5 w-full md:w-2/3">
                <label
                  class="block"
                  v-for="(tipoMedida, itipoMedida) in tipoMedida"
                  :key="itipoMedida"
                  ><input
                    class="uk-radio"
                    type="radio"
                    name="tipo_medida"
                    :value="tipoMedida.titulo"
                    v-model="tipo_medida"
                  />
                  {{ tipoMedida.titulo }}</label
                >
              </div>
            </div>

            <!-- Pregunta 2 -->
            <div class="mt-5">
              <label for="" class="text-lg"
                >¿Con qué contarán tus clientes?</label
              >
              <div class="uk-form-controls uk-column-1-2">
                <label
                  v-for="(cco, index) in contaran_clientes_options"
                  :key="index"
                  class="block"
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

            <!-- Pregunta 3 -->
            <div class="mt-5 grid">
              <label class="uk-form-label uk-text-large" for=""
                >Marca en la imagen, como es el frente del terreno, en relación
                al acceso:
                <span v-if="frente_terreno_acceso != 'null'" class="font-bold">
                  {{ frente_terreno_acceso }}</span
                ></label
              >
              <div
                class="uk-inline uk-light w-1/1 md:w-2/3 justify-self-center"
              >
                <img
                  src="/images/frente_terreno.jpeg"
                  class="justify-self-center"
                />
                <a
                  v-for="marcador in marcadores"
                  :key="marcador.index"
                  class="uk-position-absolute uk-transform-center"
                  :class="{
                    active_frente_terreno:
                      frente_terreno_acceso_id === marcador.id,
                  }"
                  :style="marcador.estilo"
                  uk-marker
                  @click="frenteTerreno(marcador.id)"
                ></a>
              </div>
            </div>
          </section>
        </div>

        <!-- Paso 3 -->
        <div v-show="steps[current].title === 'Paso 3'">
          <section id="paso3">
            <!-- Pregunta 1 -->
            <div class="clearfix">
              <label class="text-lg">
                Te recomendamos subir fotografías de: La mejor vista, el acceso,
                de frente y desde arriba
              </label>
              <div class="uk-child-width-1-4@m mt-5">
                <div class="uk-form-custom px-10 input_images">
                  <label for="">La mejor vista</label>
                  <input
                    type="file"
                    ref="file"
                    id="blahfile1"
                    @change="previewFile(1)"
                    class="uk-width-1-1"
                    accept="image/png, image/jpeg"
                  />
                  <input
                    class="uk-input uk-form-width-medium uk-width-1-1"
                    type="text"
                    placeholder="Seleccione la fotografía"
                    disabled
                  />
                  <img
                    id="blah1"
                    src="https://via.placeholder.com/250x150/000000/ffffff ?text=Mejor vista"
                    alt="your image"
                    class="preview_foto"
                  />
                </div>
                <div class="uk-form-custom px-10 input_images">
                  <label for="">El acceso</label>
                  <input
                    type="file"
                    ref="file2"
                    id="blahfile2"
                    @change="previewFile(2)"
                    class="uk-width-1-1"
                    accept="image/png, image/jpeg"
                  />
                  <input
                    class="uk-input uk-form-width-medium uk-width-1-1"
                    type="text"
                    placeholder="Seleccione la fotografía"
                    disabled
                  />
                  <img
                    id="blah2"
                    src="https://via.placeholder.com/250x150/000000/ffffff ?text=El acceso"
                    alt="your image"
                    class="preview_foto"
                  />
                </div>
                <div class="uk-form-custom px-10 input_images">
                  <label for="">De frente</label>
                  <input
                    type="file"
                    ref="file3"
                    id="blahfile3"
                    @change="previewFile(3)"
                    class="uk-width-1-1"
                    accept="image/png, image/jpeg"
                  />
                  <input
                    class="uk-input uk-form-width-medium uk-width-1-1"
                    type="text"
                    placeholder="Seleccione la fotografía"
                    disabled
                  />
                  <img
                    id="blah3"
                    src="https://via.placeholder.com/250x150/000000/ffffff ?text=De frente"
                    alt="your image"
                    class="preview_foto"
                  />
                </div>
                <div class="uk-form-custom px-10 input_images">
                  <label for="">Desde arriba</label>
                  <input
                    type="file"
                    ref="file4"
                    id="blahfile4"
                    @change="previewFile(4)"
                    class="uk-width-1-1"
                    accept="image/png, image/jpeg"
                  />
                  <input
                    class="uk-input uk-form-width-medium uk-width-1-1"
                    type="text"
                    placeholder="Seleccione la fotografía"
                    disabled
                  />
                  <img
                    id="blah4"
                    src="https://via.placeholder.com/250x150/000000/ffffff ?text=Desde arriba"
                    alt="your image"
                    class="preview_foto"
                  />
                </div>
              </div>
            </div>

            <!-- Pregunta 2 -->
            <div class="my-4 mt-20">
              <label class="text-lg">La mayoría del terreno está:</label>
              <div class="flex flex-col md:flex-row hiddenradiosimple mt-5">
                <label
                  v-for="nivel in nivelCalle"
                  :key="nivel.titulo"
                  class="flex-auto place-self-center"
                >
                  <input
                    class="uk-radio place-self-center"
                    type="radio"
                    name="nivel_terreno"
                    :value="nivel.titulo"
                    v-model="nivel_terreno"
                  />
                  {{ nivel.titulo }}
                  <img :src="nivel.img" class="place-self-center" />
                </label>
              </div>
            </div>

            <!-- Pregunta 3 -->
            <div class="my-4 mt-20">
              <label for="" class="text-lg mb-5"
                >Mira que fácil... podremos decirle a los compradores la
                topografía predominante de tu terreno, solo mira en la imagen la
                posición de la rodilla</label
              >
              <div
                class="uk-grid-large uk-child-width-1-6@s uk-child-width-1-6@m uk-flex-center uk-text-left hiddenradio"
                uk-grid
              >
                <label v-for="it in imagenesTopografia" :key="it.valor">
                  <input
                    class="uk-radio"
                    type="radio"
                    v-model="topografia"
                    :value="it.valor"
                  />
                  <img :src="it.img" />
                </label>
              </div>
            </div>

            <!-- Pregunta 4 -->
            <div class="py-4 mt-20">
              <p class="text-lg mb-5">
                Opcional pero muy "Importante"... puedes adjuntar aquí
                documentos del terreno, que sean públicos... "Eso si, te
                advierto"... Si alguien se pone en contacto contigo y hace
                mención de estos documentos casi seguro que estas bastante cerca
                de vender.
              </p>
              <div
                v-for="archivo in archivos"
                :key="archivo.id"
                class="md:flex md:items-center"
              >
                <div class="md:w-1/5">
                  <label :for="archivo.id">{{ archivo.titulo }}</label>
                </div>
                <div class="md:w-4/5">
                  <input
                    type="file"
                    :id="archivo.id"
                    ref="archivo.id"
                    @change="archivosASubir(archivo.id)"
                    accept="application/pdf"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Acción de pasos -->
      <div class="steps-action flex justify-between">
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          Anterior
        </a-button>
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          Siguiente
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="guardarForm"
        >
          <!-- <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('¡Proceso completo!')"
        > -->
          Publicar
        </a-button>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { db, f } from "@/firebase";
import "firebase/auth";
import Swal from "sweetalert2";
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
      area_terreno: "",
      medida_frente_terreno: "",
      tipo_medida: "",
      contaran_clientes: [],
      frente_terreno_acceso: "",
      frente_terreno_acceso_id: "",
      nivel_terreno: "",
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
      imagenesTopografia: [
        { valor: "plano-0-a-5", img: "/images/plano-0-a-5.png" },
        {
          valor: "plana_ondulada_de_5_a_15",
          img: "/images/plana_ondulada_de_5_a_15.png",
        },
        {
          valor: "accidentada_de_15_a_30",
          img: "/images/accidentada_de_15_a_30.png",
        },
        {
          valor: "muy_accidentada_de_30_a_45",
          img: "/images/muy_accidentada_de_30_a_45.png",
        },
        {
          valor: "quebrada_de_45_a_60",
          img: "/images/quebrada_de_45_a_60.png",
        },
        {
          valor: "muy_quebrada_mayor_a_60",
          img: "/images/muy_quebrada_mayor_a_60.png",
        },
      ],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      headers: {
        authorization: "authorization-text",
      },
      topografia: "",
      archivos: [
        { titulo: "Plano de catastro", id: "file_plano_de_catastro" },
        { titulo: "Uso de suelo", id: "file_uso_de_suelo" },
        { titulo: "Disponibilidad de agua", id: "file_disponibilidad_de_agua" },
        {
          titulo: "Disponibilidad eléctrica",
          id: "file_disponibilidad_electrica",
        },
        {
          titulo: "Visado municipal",
          id: "file_visado_municipal",
        },
      ],
      nivelCalle: [
        {
          titulo: "Bajo nivel de calle",
          img: "/images/bajo_nivel_de_calle.png",
        },
        {
          titulo: "Sobre nivel de la calle",
          img: "/images/sobre_nivel_de_la_calle.png",
        },
        {
          titulo: "A nivel de la calle",
          img: "/images/a_nivel_de_la_calle.png",
        },
      ],
      tipoMedida: [{ titulo: "Metros cuadrados" }, { titulo: "Héctareas" }],
      tipoPropiedad: [
        { titulo: "Lote" },
        { titulo: "Apartamento" },
        { titulo: "Casa" },
      ],
      mejor_vista: "",
      mejor_vista_url: "",
      acceso: "",
      acceso_url: "",
      frente: "",
      frente_url: "",
      arriba: "",
      arriba_url: "",
      fotos: [],
      archivosSubir: [],
      provincias: [],
      cantones: [],
      distritos: [],
      file_plano_de_catastro: "",
      file_uso_de_suelo: "",
      file_disponibilidad_de_agua: "",
      file_disponibilidad_electrica: "",
      file_visado_municipal: "",
      selectedCenter: { lat: 10, lng: -84 },
      selectedZoom: 7,

      lat: 10,
      lng: -84,
    };
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
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
    ProvinciaChange() {
      //recupera coordenadas
      const selectedCity = document.getElementById("selectPrv") .selectedOptions[0].outerText;
      var addressObj = {
        address_line_1: "",
        address_line_2: "",
        city: selectedCity,
        state: "",
        zip_code: "",
        country: "Costa Rica",
      };
      Vue.$geocoder.send(addressObj, (x) => {
        this.selectedCenter = {
          lat: x.results[0].geometry.location.lat,
          lng: x.results[0].geometry.location.lng,
        };
        this.lat = x.results[0].geometry.location.lat;
        this.lng = x.results[0].geometry.location.lng;
      });

      //llena lista desplegable de cantones
      this.cantones = [];
      this.distritos = [];
      const link =
        "https://ubicaciones.paginasweb.cr/provincia/" +
        document.getElementById("selectPrv").value +
        "/cantones.json";

      fetch(link)
        .then((ctns) => ctns.json())
        .then((ctn) =>
          Object.entries(ctn).forEach(([key, value]) =>
            this.cantones.push({ key, value })
          )
        );
      this.selectedZoom = 12;
    },
    CantonChange() {
      //recupera coordenadas
      const selectedCanton = document.getElementById("selectCtn")
        .selectedOptions[0].outerText;
      const selectedCity = document.getElementById("selectPrv")
        .selectedOptions[0].outerText;
      var addressObj = {
        city: selectedCity,
        state: selectedCanton,
        zip_code: "",
        country: "Costa Rica",
      };
      Vue.$geocoder.send(addressObj, (x) => {
        this.selectedCenter = {
          lat: x.results[0].geometry.location.lat,
          lng: x.results[0].geometry.location.lng,
        };
        this.lat = x.results[0].geometry.location.lat;
        this.lng = x.results[0].geometry.location.lng;
      });

      //llena lista desplegable de Distritos
      this.distritos = [];
      const link =
        "https://ubicaciones.paginasweb.cr/provincia/" +
        document.getElementById("selectPrv").value +
        "/canton/" +
        document.getElementById("selectCtn").value +
        "/distritos.json";

      fetch(link)
        .then((dtrs) => dtrs.json())
        .then((dtr) =>
          Object.entries(dtr).forEach(([key, value]) =>
            this.distritos.push({ key, value })
          )
        );

      this.selectedZoom = 12;
    },
    DistritoChange() {
      //recupera coordenadas
      const selectedDistrito = document.getElementById("selectDtt")
        .selectedOptions[0].outerText;
      const selectedCanton = document.getElementById("selectCtn")
        .selectedOptions[0].outerText;
      const selectedCity = document.getElementById("selectPrv")
        .selectedOptions[0].outerText;
      var addressObj = {
        city: selectedCity,
        state: selectedCanton,
        zip_code: selectedDistrito,
        country: "Costa Rica",
      };
      Vue.$geocoder.send(addressObj, (x) => {
        this.selectedCenter = {
          lat: x.results[0].geometry.location.lat,
          lng: x.results[0].geometry.location.lng,
        };
        this.lat = x.results[0].geometry.location.lat;
        this.lng = x.results[0].geometry.location.lng;
      });
      this.selectedZoom = 15;
    },

    coordenadasManuales(evnt) {
      let self = this;
      self.lat = evnt.lat();
      self.lng = evnt.lng();
    },

    locatorButtonPressed() {
      let self = this;
      navigator.geolocation.getCurrentPosition((pos) => {
        self.lng = pos.coords.longitude;
        self.lat = pos.coords.latitude;
      });
      Vue.$geocoder.send(() => {
        self.selectedCenter = {
          lat: self.lat,
          lng: self.lng,
        };
      });
      this.selectedZoom = 15;
    },

    // Guardar formulario
    previewFile(id) {
      let sizeFotoFlag = false;
      let typeFotoFlag = false;
      let self = this;
      let file = document.getElementById("blahfile" + id).files[0];
      let reader = new FileReader();
      let preview = document.getElementById("blah" + id);
      let sizeFoto = file.size / 1024 / 1024;

      // Validación de tamaño
      if (sizeFoto <= 1) {
        sizeFotoFlag = true;
      } else {
        Swal.fire({
          title: "Error",
          text: "Estás intentanto subir una fotografía superior a 1mb",
          position: "top-end",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Validación de formato
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        typeFotoFlag = true;
      } else {
        Swal.fire({
          title: "Error",
          text:
            "Estás intentanto subir un formato no permitido, se permite .jpg, .jpeg y .png",
          position: "top-end",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Cuando pase el filtro del tipo y del tamaño de foto
      if (typeFotoFlag && sizeFotoFlag) {
        reader.onloadend = function () {
          preview.src = reader.result;
        };
      }

      if (file) {
        reader.readAsDataURL(file);
        if (id == 1) {
          self.mejor_vista = self.$refs.file.files[0].name;
          self.fotos.push(self.$refs.file.files[0]); // fotos array que se recorre en guardarForm
        }
        if (id == 2) {
          self.acceso = self.$refs.file2.files[0].name;
          self.fotos.push(self.$refs.file2.files[0]); // fotos array que se recorre en guardarForm
        }
        if (id == 3) {
          self.frente = self.$refs.file3.files[0].name;
          self.fotos.push(self.$refs.file3.files[0]); // fotos array que se recorre en guardarForm
        }
        if (id == 4) {
          self.arriba = self.$refs.file4.files[0].name;
          self.fotos.push(self.$refs.file4.files[0]); // fotos array que se recorre en guardarForm
        }
      } else {
        preview.src = "";
      }
    },

    archivosASubir(idArchivo) {
      // Los documentos
      let self = this;
      let fileDoc = document.getElementById(idArchivo).files[0];
      let reader = new FileReader();

      if (fileDoc) {
        reader.readAsDataURL(fileDoc);
        if (idArchivo === "file_plano_de_catastro") {
          if (fileDoc.type === "application/pdf") {
            self.file_plano_de_catastro = fileDoc.name;
            self.archivosSubir.push(fileDoc);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "Estás intentanto subir un formato no permitido, se permite .pdf",
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById(idArchivo).value = null;
          }
        }
        if (idArchivo === "file_uso_de_suelo") {
          if (fileDoc.type === "application/pdf") {
            self.file_uso_de_suelo = fileDoc.name;
            self.archivosSubir.push(fileDoc);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "Estás intentanto subir un formato no permitido, se permite .pdf",
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById(idArchivo).value = null;
          }
        }
        if (idArchivo === "file_disponibilidad_de_agua") {
          if (fileDoc.type === "application/pdf") {
            self.file_disponibilidad_de_agua = fileDoc.name;
            self.archivosSubir.push(fileDoc);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "Estás intentanto subir un formato no permitido, se permite .pdf",
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById(idArchivo).value = null;
          }
        }
        if (idArchivo === "file_disponibilidad_electrica") {
          if (fileDoc.type === "application/pdf") {
            self.file_disponibilidad_electrica = fileDoc.name;
            self.archivosSubir.push(fileDoc);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "Estás intentanto subir un formato no permitido, se permite .pdf",
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById(idArchivo).value = null;
          }
        }
        if (idArchivo === "file_visado_municipal") {
          if (fileDoc.type === "application/pdf") {
            self.file_visado_municipal = fileDoc.name;
            self.archivosSubir.push(fileDoc);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "Estás intentanto subir un formato no permitido, se permite .pdf",
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById(idArchivo).value = null;
          }
        }
      }
    },

    guardarForm() {
      let self = this;
      var user = f.auth().currentUser;
      const selectedDistrito = document.getElementById("selectDtt")
        .selectedOptions[0].outerText;
      const selectedCanton = document.getElementById("selectCtn")
        .selectedOptions[0].outerText;
      const selectedCity = document.getElementById("selectPrv")
        .selectedOptions[0].outerText;

      db.collection("propiedades")
        .add({
          uid: user.uid,
          tipo:"Lote",
          provincia: selectedCity,
          canton:selectedCanton,
          distrito:selectedDistrito,
          lat: self.lat,
          lng: self.lng,
          area_terreno: self.area_terreno,
          contaran_clientes: self.contaran_clientes,
          frente_terreno_acceso: self.frente_terreno_acceso,
          frente_terreno_acceso_id: self.frente_terreno_acceso_id,
          mejor_vista: self.mejor_vista,
          acceso: self.acceso,
          frente: self.frente,
          arriba: self.arriba,
          nivel_terreno: self.nivel_terreno,
          topografia: self.topografia,
          file_plano_de_catastro: self.file_plano_de_catastro,
          file_uso_de_suelo: self.file_uso_de_suelo,
          file_disponibilidad_de_agua: self.file_disponibilidad_de_agua,
          file_disponibilidad_electrica: self.file_disponibilidad_electrica,
          file_visado_municipal: self.file_visado_municipal,
        })
        .then(function (docRef) {
          Swal.fire({
            title: "Guardando",
            text:
              "La propiedad se guardó satisfactoriamente. Se redirigirá al perfil de la propiedad.",
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          // forEach para insertar fotos en storage
          self.fotos.forEach(function (foto) {
            const storageRef = f
              .storage()
              .ref(`fotos/${docRef.id}/${foto.name}`)
              .put(foto);
            storageRef.on(
              `state_changed`,
              (snapshot) => {
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                console.log(error.message);
              }
              // () => {
              //   storageRef.snapshot.ref.getDownloadURL().then((url) => {
              //     console.log(url);
              //   });
              // }
            );
          });
          // forEach para insertar documentos en storage
          self.archivosSubir.forEach(function (archivo) {
            const storageRef = f
              .storage()
              .ref(`documentos/${docRef.id}/${archivo.name}`)
              .put(archivo);
            storageRef.on(
              `state_changed`,
              (snapshot) => {
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                console.log(error.message);
              }
            );
          });

          setTimeout(function () {
            self.$router.replace("perfil-propiedad/" + docRef.id);
          }, 1501);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }, // guardarForm
  },
  created() {
    //provincias inicial
    fetch("https://ubicaciones.paginasweb.cr/provincias.json")
      .then((prvs) => prvs.json())
      .then((ps) =>
        Object.entries(ps).forEach(([key, value]) =>
          this.provincias.push({ key, value })
        )
      )
      .then(() => {
        //cantones inicial
        let link =
          "https://ubicaciones.paginasweb.cr/provincia/" +
          document.getElementById("selectPrv").value +
          "/cantones.json";
        fetch(link)
          .then((ctns) => ctns.json())
          .then((ctn) =>
            Object.entries(ctn).forEach(([key, value]) =>
              this.cantones.push({ key, value })
            )
          )
          .then(() => {
            //Distritos inicial
            const link =
              "https://ubicaciones.paginasweb.cr/provincia/" +
              document.getElementById("selectPrv").value +
              "/canton/" +
              document.getElementById("selectCtn").value +
              "/distritos.json";

            fetch(link)
              .then((dtrs) => dtrs.json())
              .then((dtr) =>
                Object.entries(dtr).forEach(([key, value]) =>
                  this.distritos.push({ key, value })
                )
              );
          });
      });
  },
  updated() {
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
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
.active_frente_terreno {
  color: #2b0707 !important;
  background-color: #eac111 !important;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.hiddenradio [type="radio"],
.hiddenradiosimple [type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.hiddenradiosimple [type="radio"] + img {
  position: relative;
  cursor: pointer;
  max-height: 300px;
  height: 90%;
  width: 90%;
  transform: scale(1);
  transition: all 300ms ease;
  z-index: 1;
}
.hiddenradio [type="radio"] + img {
  position: relative;
  cursor: pointer;
  filter: drop-shadow(0px 7px 7px #000);
  max-height: 300px;
  height: 100%;
  width: 100%;
  transform: scale(1);
  transition: all 300ms ease;
  z-index: 1;
}
.hiddenradio [type="radio"] + img:hover {
  transform: scale(1.5);
  filter: drop-shadow(1px 1px 5px rgb(105, 104, 104));
  z-index: 3;
  background-color: white;
}

.hiddenradiosimple [type="radio"] + img:hover {
  transform: scale(1.1);
  z-index: 3;
}
.hiddenradio [type="radio"]:checked + img,
.hiddenradiosimple [type="radio"]:checked + img {
  outline: 1px solid rgb(5, 56, 12);
  filter: drop-shadow(0px 7px 7px #000);
  transform: scale(1);
  filter: none;
}

.input_images img {
  max-width: 250px;
  width: 100%;
  max-height: 150px;
  height: 100%;
}
</style>
