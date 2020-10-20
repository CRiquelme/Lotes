 <template>
    <main class="pb-10">
        <!-- Filtros y mapa -->
        <div class="flex flex-col md:flex md:flex-row shadow-lg">
            <!-- Filtros -->
            <section class="bg-gray-900 px-2">
                <div class="lg:container lg:mx-auto px-10 py-10 flex flex-col ">
                    <!-- Provincia -->
                    <div class="px-2 mb-2">
                        <label class="text-blue-100" for="selectPrv">Provincia</label>
                            <select
                            class="w-full h-8"
                            @change="ProvinciaChange"
                            name="Provincia"
                            id="selectPrv" >
                                <option
                                v-for="pr in provincias"
                                :key="pr.key"
                                :value="pr.key" >{{pr.value}}
                                </option>
                            </select>
                    </div>
                    <!-- Cantón -->
                    <div class="px-2 mb-2">
                        <label class="text-blue-100" for="selectCtn">Cantón</label>
                        <select
                            class="w-full h-8"
                            @change="CantonChange"
                            name="Cantones"
                            id="selectCtn" 
                        >
                            <option
                            v-for="ct in cantones"
                            :key="ct.key"
                            :value="ct.key" >{{ct.value}}</option>
                        </select>
                    </div>
                    <!-- Distrito -->
                    <div class="px-2 mb-2">
                        <label class="text-blue-100" for="selectDtt">Distrito</label>
                        <select
                            class="w-full h-8"
                            @change="DistritoChange"
                            name="Distritos"
                            id="selectDtt" 
                        >
                            <option
                            v-for="dt in distritos"
                            :key="dt.key"
                            :value="dt.key" >{{dt.value}}</option>
                        </select>
                    </div>
                    <!-- Tipo de inmueble -->
                    <div>
                        <div class="flex justify-around justify-between content-center flex-wrap h-16">
                        <label class="mx-2 items-center text-gray-200">
                            <input
                            class="text-base"
                            type="checkbox"
                            name="Lote"
                            id="cbxLote"
                            v-model="CbxLote">
                            <!-- <img src="images/country_48px.png" alt="Lote"> -->
                            Lote
                        </label>
                        <label class="mx-2 items-center text-gray-200">
                            <input
                            class="text-base"
                            type="checkbox"
                            name="Apartamento"
                            id="cbxApartamento"
                            v-model="CbxApartamento">
                            <!-- <img src="images/building_40px.png" alt="apartamento"> -->
                            Apartamento
                        </label>
                        <label class="mx-2 items-center text-gray-200">
                            <input
                            class="text-base"
                            type="checkbox"
                            name="Casa"
                            id="cbxCasa"
                            v-model="CbxCasa">
                            <!-- <img src="images/house_48px.png" alt="casa"> -->
                            Casa
                        </label>
                        
                        </div>
                    </div>
                    <!-- Botón -->
                    <div>
                        <button class="bg-gray-800 hover:bg-blue-800 text-gray-200 font-bold py-2 px-4 border border-gray-700 rounded text-md m-2 " @click="Buscar"><i class="fas fa-search-location"></i> Buscar</button>
                        <button class="bg-gray-800 hover:bg-blue-800 text-gray-200 font-bold py-2 px-4 border border-gray-700 rounded text-md m-2 " @click="Buscar"><i class="fas fa-eraser"></i> Limpiar</button>
                    </div>
                </div>
            </section>
            <!-- mapa -->
            <section class="flex-1 md:flex-1">
                <GmapMap
                    :center="selectedCenter"
                    :zoom="selectedZoom"
                    mapTypeControl= "false"
                    streetViewControl= "false"
                    class="w-full h-full"
                    ref='mapRef'>
                    <GmapMarker
                    :key="index"
                    v-for="(p, index) in propiedades"
                    :position={lat:p.lat,lng:p.lng}
                    @click="SelecetPropiedad()"
                />
                </GmapMap>
            </section>
        </div>

        <div class="container m-auto pt-5">
            <h2 class="font-poppins text-3xl font-bold text-gray-800 py-5 text-center uppercase tracking-widest">Propiedades</h2>
            <hr class="w-10 mb-8 mx-auto bg-gray-800 border-4">
            <!-- cards -->
                <div class="w-full" uk-slider>
                    <div class="uk-position-relative">
                        <div class="uk-slider-container uk-dark">
                            <ul class="uk-slider-items uk-child-width-1-2@s  uk-child-width-1-3@m uk-child-width-1-1@">
                                <li v-for="(propiedad, n) in propiedades" :key="n" class="ml-2">
                                    <Card  :propiedad="propiedad"></Card>
                                </li>
                            </ul>
                        </div>
                        <div class="uk-hidden@s uk-light">
                            <a class="uk-position-center-left uk-position-small" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                            <a class="uk-position-center-right uk-position-small" href="#" uk-slidenav-next uk-slider-item="next"></a>
                        </div>

                        <div class="uk-visible@s">
                            <a class="uk-position-center-left-out uk-position-small" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                            <a class="uk-position-center-right-out uk-position-small" href="#" uk-slidenav-next uk-slider-item="next"></a>
                        </div>

                    </div>
                    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
                </div>
            
            <!-- avisos -->
            <Cargando v-show="showCargando"></Cargando>

            <div v-if="propiedades==false"  class="bg-gray-200 text-3xl m-4 w-full h-20 flex justify-center items-center">
                Ups! Nada que mostrar. <br> Pulsa el botón BUSCAR EN ESTA ÁREA o cambia el área en el mapa. 
            </div>
        </div>
   </main>
 </template>

 <script>
    import Vue from "vue";
    import { db } from "../firebase";
    import "firebase/auth";

    import Cargando from "@/components/Cargando";
    import Card from "@/components/Card";
    export default {
        name:"Home",
        components:{ Card, Cargando },
        data(){
            return{
                propiedades:[],
                provincias:[],
                cantones:[],
                distritos:[],
                selectedZoom:7,
                selectedCenter:{lat:10,lng:-84},
                CbxApartamento:true,
                CbxCasa:true,
                CbxLote:true,
                minLat:0,
                showCargando:false
            }
        },
        
        created(){
            let self = this
            //llena lista desplegable de provincias
            this.provincias.push("")
            fetch('https://ubicaciones.paginasweb.cr/provincias.json')
            .then(prvs=>prvs.json())
            .then(ps=>Object.entries(ps).forEach(([key,value])=>(this.provincias.push({key,value}))))
            
            //llena con 3 propiedades
            db.collection('propiedades')
            //.limit(3)
            .get()
            .then((props)=>{props.forEach(prop=>{
                let data = { ...prop.data(), propid: prop.id };
                self.propiedades.push(data)
            })})
        },
        
        updated () {
            this.$refs.mapRef.$mapPromise
            .then((map) => this.map=map);
        },
        
        methods:{
            selectPropiedad(id){
                this.$router.replace("/perfil-propiedad/" +id)
            },
            ProvinciaChange(){
                //limpia datos
                this.propiedades=[]
                //recupera coordenadas
                const selectedCity=document.getElementById('selectPrv').selectedOptions[0].outerText
                var addressObj = {
                    address_line_1: '',
                    address_line_2: '',
                    city:selectedCity,
                    state:'',          
                    zip_code:'',     
                    country:'Costa Rica'
                }
                Vue.$geocoder.send(addressObj, x => {
                    this.selectedCenter={
                        lat:x.results[0].geometry.location.lat,
                        lng:x.results[0].geometry.location.lng
                    }
                })

                //llena lista desplegable de cantones
                this.cantones=[]
                this.distritos=[]
                const link="https://ubicaciones.paginasweb.cr/provincia/" + document.getElementById('selectPrv').value + "/cantones.json"
                
                this.cantones.push("")
                fetch(link)
                .then(ctns=>ctns.json())
                .then(ctn=>Object.entries(ctn).forEach(([key,value])=>(this.cantones.push({key,value}))))
                this.selectedZoom=12
            },
            
            CantonChange(){
                //limpia datos
                this.propiedades=[]
                //recupera coordenadas
                const selectedCanton=document.getElementById('selectCtn').selectedOptions[0].outerText
                const selectedCity=document.getElementById('selectPrv').selectedOptions[0].outerText
                var addressObj = {
                    city:selectedCity,
                    state:selectedCanton,
                    zip_code:'',
                    country:'Costa Rica'
                }
                Vue.$geocoder.send(addressObj, x => {
                    this.selectedCenter={
                        lat:x.results[0].geometry.location.lat,
                        lng:x.results[0].geometry.location.lng
                    }
                })

                //llena lista desplegable de Distritos
                this.distritos=[]
                const link="https://ubicaciones.paginasweb.cr/provincia/" + document.getElementById('selectPrv').value + "/canton/" + document.getElementById('selectCtn').value + "/distritos.json"
                
                this.distritos.push("")
                fetch(link)
                .then(dtrs=>dtrs.json())
                .then(dtr=>Object.entries(dtr).forEach(([key,value])=>(this.distritos.push({key,value}))))

                this.selectedZoom=12
            },

            DistritoChange(){
                //limpia datos
                this.propiedades=[]
                //recupera coordenadas
                const selectedDistrito=document.getElementById('selectDtt').selectedOptions[0].outerText
                const selectedCanton=document.getElementById('selectCtn').selectedOptions[0].outerText
                const selectedCity=document.getElementById('selectPrv').selectedOptions[0].outerText
                var addressObj = {
                    city:selectedCity,
                    state:selectedCanton,         
                    zip_code:selectedDistrito,     
                    country:'Costa Rica'
                }
                Vue.$geocoder.send(addressObj, x => {
                    this.selectedCenter={
                        lat:x.results[0].geometry.location.lat,
                        lng:x.results[0].geometry.location.lng
                    }
                })
                this.selectedZoom=15
            },
            
            Buscar(){
                this.showCargando=true
                this.propiedades=[]
                this.$refs.mapRef.$mapPromise
                .then(map=>{
                    
                    const minLat=map.getBounds().Ya.i
                    const maxLat=map.getBounds().Ya.j
                    const minLng=map.getBounds().Sa.i
                    const maxLng=map.getBounds().Sa.j
   
                    this.QueryFirebase(this.CbxApartamento,"Apartamento",minLat,maxLat,minLng,maxLng)
                    this.QueryFirebase(this.CbxCasa,"Casa",minLat,maxLat,minLng,maxLng)
                    this.QueryFirebase(this.CbxLote,"Lote",minLat,maxLat,minLng,maxLng)
                    this.showCargando=false
                })
                
            },
            
            QueryFirebase(chkbx,t,minLat,maxLat,minLng,maxLng){
                if(chkbx){
                    db.collection('propiedades')
                    .where("tipo","==",t)
                    .get()
                    .then((props)=>{props.forEach(prop=>{
                        const propLat=prop.data().lat
                        const propLng=prop.data().lng
                        if (propLat > minLat && 
                            propLat < maxLat && 
                            propLng > minLng &&
                            propLng < maxLng){
                                const newPropiedad=prop.data()
                                Object.assign(newPropiedad, {id: prop.id})

                                this.propiedades.push(newPropiedad)
                        }                        
                    })})
                }
            },
            
            SelecetPropiedad(){

            },
        },

    }
 </script>
 

