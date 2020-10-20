<template>
    <div class="w-full overflow-hidden rounded-lg border">
        <!-- Fotos -->
        <div uk-slideshow="autoplay: true">
            <ul class="uk-slideshow-items">
                <li v-for="foto in fotos" :key="foto">
                    <img
                        v-if="foto"
                        class="w-full md:h-48 object-scale-down object-center bg-gray-800"
                        :src="foto"
                        :alt="foto"
                    />
                    <div class="uk-position-top-right mt-4 mr-2">
                        <p class="bg-blue-800 px-4 rounded-lg text-blue-100 shadow-lg shadow-inner">
                            {{ propiedad.tipo }}
                        </p>
                    </div>
                    <div class="uk-position-bottom-left mt-4 pl-2 pt-2 bg-gradient-to-r from-blue-900 via-blue-700 w-full">
                        <p class="px-5 rounded-lg text-white font-poppins">
                            <i class="fas fa-map-marked-alt"></i> {{ propiedad.provincia }} - {{ propiedad.canton }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- Detalles -->
        <div class="px-6 py-2 bg-white">
            <p class="font-bold text-md mb-2 uppercase">
                {{ propiedad.titulo }}
            </p>
            <p class="font-medium text-md text-orange-600 mb-2">
                {{ propiedad.precio | precio }}
            </p>
            <p class="text-gray-700 text-xs">
                {{ propiedad.descripcion.substring(0,100)+"..." }}
            </p>
            <div class="flex justify-between mt-5">
                <p>
                    <i class="fas fa-ruler-combined"></i> {{propiedad.area_terreno}} {{propiedad.tipo_medida}}
                </p>
                <router-link :to="'/perfil-propiedad/'+propiedad.propid" class="bg-orange-600 px-3 rounded-md text-white hover:text-white h-6">Detalles</router-link>
            </div>
        </div>

        <!-- info vendedor  -->
        <div class="px-6 py-1 bg-white">
            <hr class="mx-auto w-20 border-2">
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

        <!-- footer -->
        <div
            v-if="idUser === infoVendedor.id"
            class="flex justify-between"
        >
            <router-link :to="'/publicar/'+propiedad.propid" class="bg-orange-600 px-3 rounded-md text-white hover:text-white h-6">Editar</router-link>
        </div>
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
            infoVendedor: '',
            idUser: ''
        }
    },
    mounted: function () {
        let self = this
        self.idUser = f.auth().currentUser;
        let idPropiedad = ''

        if(self.propiedad.propid) { idPropiedad = self.propiedad.propid }
        if(self.propiedad.id) { idPropiedad = self.propiedad.id }

        let tituloFotos = [
          self.propiedad.mejor_vista, 
          self.propiedad.acceso,
          self.propiedad.frente, 
          self.propiedad.arriba
        ];
        tituloFotos.forEach((titulo) => {
          if(titulo) {
            f.storage()
              .ref("fotos/" + idPropiedad + "/" + titulo)
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