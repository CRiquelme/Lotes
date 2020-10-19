<template>
  <main>
    <!-- Migas de pan -->
    <section class="container mx-auto mt-5">
      <vk-breadcrumb>
        <li>
          <router-link to="/" class="inline-block">
            <i class="fas fa-home"></i>
            <span class="inline-block px-3 text-base">Home</span>
          </router-link>
        </li>
        <li>
            <router-link :to="'/perfil-usuario/'+publicado.idUser" v-for="(publicado, ipublicado) in info.publicadoPor" :key="ipublicado">
              <span class="inline-block px-3 text-base"> Perfil del vendedor</span>
            </router-link>
        </li>
        <li>{{ info.titulo }}</li>
      </vk-breadcrumb>
    </section>
    <section class="lg:flex my-5 container m-auto">
      <!-- Fotos -->
      <div id="fotos" class="lg:w-3/6 object-center">
        <div uk-slideshow="animation: pull">
          <div class="uk-position-relative uk-visible-toggle uk-dark" tabindex="-1"  uk-slideshow="autoplay: true;">
          <ul class="uk-slideshow-items" id="slideshowFotos">
            <li v-for="foto in info.fotos" :key="foto">
              <img
              class="w-full object-scale-down"
              :src="foto"
              :alt="foto"
              />
            </li>
          </ul>
          <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
          <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
          </div>
          <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
        </div>
      </div>
      <div class="lg:w-3/6 lg:ml-10">
        <div class="rounded overflow-hidden shadow-lg px-10 py-10">
          
          <h1 class="text-lg uppercase">{{ info.titulo }}</h1>
          <p>{{ info.descripcion }}</p>
          <p>
            <span class="block"><b>Provincia:</b> {{ info.provincia }}</span> 
            <span class="block"><b>Cantón:</b> {{ info.canton }}</span>
            <span class="block"><b>Distrito:</b> {{ info.distrito }}</span>
            <span class="block"><b>Dirección:</b> {{ info.direccionPropiedad }}</span>
            <span class="block"><b>Precio:</b> {{ info.precio | precio }}</span>
            <span><b>Publicado por:</b></span>
            <span v-for="(publicado, ipublicado) in info.publicadoPor" :key="ipublicado">
              <router-link :to="'/perfil-usuario/'+publicado.idUser"> {{ publicado.nombre }}
              </router-link>
            </span>
          </p>
          <h3 class="block text-lg">Esta propiedad cuenta con:</h3>
          <div class="flex flex-column">
            <span class="rounded-full h-8 px-2 mr-1 bg-gray-200 flex items-center justify-center" v-for="contaran in info.contaran_clientes" :key="contaran">
              {{contaran}}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- mapa -->
    <section class="container mx-auto mt-10">
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
                :draggable="false"
                ref="GoogleMrkr"
              />
            </GmapMap>
    </section>

    <!-- Detalles -->
    <section class="container mx-auto mt-10">
      <ul uk-tab>
        <li class="uk-active"><a href="">Detalles</a></li>
        <li><a href="">Documentos</a></li>
      </ul>
      <ul class="uk-switcher uk-margin">
        <li class="uk-active">
          <table class="uk-table uk-table-striped">
            <tbody>
                <tr v-if="info.tipo">
                    <td class="font-bold">Tipo de propiedad:</td>
                    <td>{{info.tipo}}</td>
                </tr>
                <tr v-if="info.provincia">
                    <td class="font-bold">Provincia</td>
                    <td>{{info.provincia}}</td>
                </tr>
                <tr v-if="info.distrito">
                    <td class="font-bold">Distrito</td>
                    <td>{{info.distrito}}</td>
                </tr>
                <tr  v-if="info.canton">
                    <td class="font-bold">Cantón</td>
                    <td>{{info.canton}}</td>
                </tr>
                <tr v-if="info.area_terreno">
                  <td class="font-bold">Área de terreno</td>
                  <td>{{info.area_terreno}} {{ info.tipo_medida }}</td>
                </tr>
                <tr v-if="info.contaran_clientes">
                  <td class="font-bold">La propiedad cuenta con:</td>
                  <td>
                    <ul class="pl-0">
                      <li v-for="cuenta in info.contaran_clientes" :key="cuenta">{{ cuenta }}</li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="info.topografia">
                  <td class="font-bold">Inclinación del terreno:</td>
                  <td>
                    <img class="h-40 bg-white" :src="'/images/'+info.topografia+'.png'" />
                  </td>
                </tr>
            </tbody>
        </table>
        </li>
        <li>
          <table class="uk-table uk-table-striped">
            <tbody>
              <tr v-if="ver_uso_de_suelo">
                <td class="font-bold">
                  Disponibilidad de agua
                </td>
                <td>
                  <a class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-5 rounded" target="_blank" :href="ver_disponibilidad_de_agua">Ver documento</a>
                </td>
              </tr>
              <tr v-if="ver_disponibilidad_electrica">
                <td class="font-bold">
                  Disponibilidad eléctrica
                </td>
                <td>
                  <a class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-5 rounded" target="_blank" :href="ver_disponibilidad_electrica">Ver documento</a>
                </td>
              </tr>
              <tr v-if="ver_plano_catastro">
                <td class="font-bold">
                  Plano de catastro
                </td>
                <td>
                  <a class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-5 rounded" target="_blank" :href="ver_plano_catastro">Ver documento</a>
                </td>
              </tr>
              <tr v-if="ver_uso_de_suelo">
                <td class="font-bold">
                  Uso de suelo
                </td>
                <td>
                  <a class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-5 rounded" target="_blank" :href="ver_uso_de_suelo">Ver documento</a>
                </td>
              </tr>
              <tr v-if="ver_visado_municipal">
                <td class="font-bold">
                  Visado municipal
                </td>
                <td>
                  <a class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-5 rounded" target="_blank" :href="ver_visado_municipal">Ver documento</a>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { db, f } from "../firebase";
import "firebase/auth";
export default {
  name: "PerfilPropiedad",
  data() {
    return {
      uid: "",
      datosUser: "",
      info: [],
      selectedCenter: {lat:0,lng:0},
      selectedZoom: 14,
      ver_uso_de_suelo: '',
      ver_disponibilidad_de_agua: '',
      ver_disponibilidad_electrica: '',
      ver_visado_municipal: '',
      ver_plano_catastro: ''
    };
  },
  filters: {
    precio: function(value){
      let precioFormateado = new Intl.NumberFormat().format(value)
      return precioFormateado + "₡"
    }
  },
  mounted: function () {
    // capturar datos de usuario
    var user = f.auth().currentUser;
    const getId = this.$route.params.id;
    let self = this;
    // Comprobar si hay datos de usuario
    if (user != null) {
      self.uid = user.uid;
      let dUser = db.collection("users").doc(user.uid);
      dUser.get().then(function (doc) {
        if (doc.exists) {
          self.datosUser = doc.data();
        }
      });
    } else {
      this.$router.replace("login");
    }
    let dPropiedad = db.collection("propiedades").doc(getId);
    dPropiedad
    .get()
    .then(function (docProp) {
      let data = { ...docProp.data() };
      let fotos = [];
      let tituloFotos = [
          docProp.data().mejor_vista, 
          docProp.data().acceso,
          docProp.data().frente, 
          docProp.data().arriba
          ];

        tituloFotos.forEach((titulo) => {
          if(titulo) {
            f.storage()
              .ref("fotos/" + getId + "/" + titulo)
              .getDownloadURL()
              .then((imgUrl) => {
                fotos.push(imgUrl);
              });
          }
        });

        // console.log(docProp.data().uid)
        let publicado = db.collection("users").doc(docProp.data().uid);
        let publicadoPor = [];
        let idVendedor = ''
        publicado.get().then(function (infoUsuario) {
          if (infoUsuario.exists) {
            publicadoPor.push({'nombre': infoUsuario.data().nombre + ' ' + infoUsuario.data().apellido, 'idUser': infoUsuario.data().id})
          }
        });
        self.selectedCenter = { lat: docProp.data().lat, lng: docProp.data().lng };
        data = { ...docProp.data(), propid: docProp.id, fotos, publicadoPor, idVendedor: idVendedor };
        self.info = data;
        
        let tituloArchivos = [docProp.data().file_plano_de_catastro, docProp.data().file_uso_de_suelo, docProp.data().file_disponibilidad_de_agua, docProp.data().file_disponibilidad_electrica, docProp.data().file_visado_municipal];
        tituloArchivos.forEach((titulo, index) => {
          if(titulo) {
            f.storage()
              .ref("documentos/" + getId + "/" + titulo)
              .getDownloadURL()
              .then((docUrl) => {
                if(index === 0) self.ver_plano_de_catastro = docUrl
                if(index === 1) self.ver_uso_de_suelo = docUrl
                if(index === 2) self.ver_disponibilidad_de_agua = docUrl
                if(index === 3) self.ver_disponibilidad_electrica = docUrl
                if(index === 4) self.ver_visado_municipal = docUrl
              });
          }
        });
    })
  }
};
</script>

<style>
#slideshowFotos img {
  position: relative;
}

#slideshowFotos:after {
  content: "CR-Lotes";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 80%;
  left: 40%;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2em;
  opacity: 0.7;
}
</style>