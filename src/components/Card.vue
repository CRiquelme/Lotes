<template>
    <div class="w-full overflow-hidden rounded-lg border">
        <div uk-slideshow="autoplay: true">
            <ul class="uk-slideshow-items">
                <li v-for="foto in fotos" :key="foto">
                    <img
                        class="w-full md:h-48 object-cover object-center"
                        :src="foto"
                        :alt="foto"
                    />
                    <div class="uk-position-top-right mt-4 mr-2">
                        <p class="bg-orange-600 px-4 rounded-lg text-white shadow-lg shadow-inner">
                            {{ propiedad.tipo }}
                        </p>
                    </div>
                    <div class="uk-position-bottom-left mt-4 ml-2">
                        <p class="px-5 rounded-lg py-1 text-white font-bold">
                            <i class="fas fa-map-marked-alt"></i> {{ propiedad.provincia }} - {{ propiedad.canton }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="px-6 py-4">
            <p class="font-bold text-md mb-2 uppercase">
                {{ propiedad.titulo }}
            </p>
            <p class="font-medium text-md text-orange-600 mb-2">
                {{ propiedad.precio | precio }}
            </p>
            <p class="text-gray-700 text-xs">
                {{ propiedad.descripcion.substring(0,110)+"..." }}
            </p>
            <div class="flex justify-between">
                <p>
                    <i class="fas fa-ruler-combined"></i> {{propiedad.area_terreno}} {{propiedad.tipo_medida}}
                </p>
                <router-link :to="'/perfil-propiedad/'+propiedad.propid" class="bg-orange-600 px-3 rounded-md text-white hover:text-white h-6">Detalles</router-link>
            </div>
            <hr>
            <div class="flex justify-between">
                <p v-if="infoVendedor.nombre && infoVendedor.apellido">
                    <router-link :to="'/perfil-usuario/'+propiedad.uid" class="text-gray-900 hover:text-orange-700">
                        <i class="fas fa-user"></i> {{infoVendedor.nombre}} {{infoVendedor.apellido}}
                    </router-link>
                </p>
                <div>
                    <a :href="'https://api.whatsapp.com/send?text=CR-Lotes%20https://localhost:8080/perfil-propiedad/'+propiedad.propid" class="text-gray-900 hover:text-orange-700" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>

        <!-- Botón Detalles -->
        <!-- <div class="m-2 w-full flex justify-center">
            <input type="button" value="VER DETALLES" class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg m-2">
        </div> -->

        <!-- Tags -->
        <!-- <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.provincia }}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.canton }}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.distrito }}</span>
        </div> -->
    </div>
</template>
<script>
import { db, f } from "../firebase";
export default {
    name:"Card",
    props:{
        propiedad:{ type: Object, required: true },
    },
    data(){
        return {
            fotos: [],
            infoVendedor: ''
        }
    },
    mounted: function () {
        let self = this
        let tituloFotos = [
          self.propiedad.mejor_vista, 
          self.propiedad.acceso,
          self.propiedad.frente, 
          self.propiedad.arriba
        ];
        tituloFotos.forEach((titulo) => {
          if(titulo) {
            f.storage()
              .ref("fotos/" + self.propiedad.propid + "/" + titulo)
              .getDownloadURL()
              .then((imgUrl) => {
                self.fotos.push(imgUrl);
              });
          }
        });

        let vendedor = db.collection("users").doc(self.propiedad.uid);
        vendedor
            .get()
            .then(function (infoVendedor) {
                self.infoVendedor = infoVendedor.data()
            });
    },
    filters: {
        precio: function(value){
        let precioFormateado = new Intl.NumberFormat().format(value)
        return precioFormateado + "₡"
    }
  },
}
</script>>