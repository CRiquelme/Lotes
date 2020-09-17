 <template>
  <section
    class="registro grid grid-cols-1 sm:grid-cols-4 container place-content-center lg:mt-20 mx-auto"
  >
    <!-- Contenido izquierda -->
    <div class="col-span-1 mr-5 px-4 py-4">
      <h2 class="font-bold text-3xl uppercase">Filtros</h2>
      <label for="provincia" class="font-bold">Provincias</label>
      <select
        name="provincia"
        v-model="filterProvincia"
        class="w-full border-solid border-2 border-gray-200 px-4 py-1"
      >
        <option v-for="provincia in provincias" v-bind:key="provincia">{{provincia}}</option>
      </select>

      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-5"
      >
        <i class="fas fa-broom"></i>
        <span class="ml-3" @click="limpiarFiltros">Limpiar filtros</span>
      </button>
    </div>

    <!-- Contenido derecha -->
    <div class="col-span-1 md:col-span-3">
      {{filterProvincia}}
      <!-- 1 -->
      <div class="max-w-sm w-full lg:max-w-full lg:flex mb-5">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style="background-image: url('https://source.unsplash.com/user/erondu/480x480/?costarica,nature')"
          title="titulo"
        ></div>
        <div
          class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">Título de la propiedad</div>
            <p
              class="text-gray-700 text-base"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
          </div>
          <p v-if="!uid" class="text-sm text-gray-600 flex items-center">
            <svg
              class="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
              />
            </svg>
            ¿Quieres más información? ...
            <router-link to="/registro">Regístrate</router-link>
          </p>
          <p
            v-if="uid"
            class="text-sm text-gray-600 flex items-center"
          >Solo los logeados pueden ver esto...</p>
        </div>
      </div>

      <!-- 2 -->
      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style="background-image: url('https://source.unsplash.com/user/erondu/480x480/?costarica,nature')"
          title="título"
        ></div>
        <div
          class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">Título de la propiedad</div>
            <p
              class="text-gray-700 text-base"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
          </div>
          <p v-if="!uid" class="text-sm text-gray-600 flex items-center">
            <svg
              class="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
              />
            </svg>
            ¿Quieres más información? ...
            <router-link to="/registro">Regístrate</router-link>
          </p>
          <p
            v-if="uid"
            class="text-sm text-gray-600 flex items-center"
          >Solo los logeados pueden ver esto...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db, f } from "../firebase";
import "firebase/auth";
export default {
  name: "Registro",

  data() {
    return {
      uid: "",
      datosUser: "",
      filterProvincia: "",
      provincias: [
        "San José",
        "Alajuela",
        "Cartago",
        "Heredia",
        "Guanacaste",
        "Puntarenas",
        "Limón",
      ],
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
        }
      });
    }
  },
  methods: {
    limpiarFiltros() {
      this.filterProvincia = "";
    },
  },
};
</script>

 
 