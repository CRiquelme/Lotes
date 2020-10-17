 <template>
    <div class="">
        <div class="container m-auto">
            <!-- selección de provincia, cantón y distrito -->
            <div class="m-4 inline">
                    <div class="flex flex-col rounded border px-2">
                        <span class="text-xl mb-8 ">Selecciona dónde quieres hacer la busqueda de inmuebles: </span>
                        <!-- provincia -->
                        <span class="m-2 text-xl">
                            Provincia:
                            <select 
                                @change="ProvinciaChange"
                                name="Provincia"
                                id="selectPrv" >
                                <option 
                                    v-for="pr in provincias" 
                                    :key="pr.key"
                                    :value="pr.key" >{{pr.value}}</option>
                            </select>
                        </span>
                        <!-- cantón -->
                        <span class="m-2 text-xl">
                            Cantón:
                            <select 
                                v-if="cantones"
                                @change="CantonChange" 
                                name="Cantones"
                                id="selectCtn" >
                                <option 
                                    v-for="ct in cantones" 
                                    :key="ct.key"
                                    :value="ct.key" >{{ct.value}}</option>
                            </select>
                        </span>
                        <!-- distrito -->
                        <span class="m-2 text-xl">
                            Distrito:
                            <select 
                                v-if="distritos"
                                @change="DistritoChange" 
                                name="Distritos"
                                id="selectDtt" >
                                
                                <option 
                                    v-for="dt in distritos" 
                                    :key="dt.key"
                                    :value="dt.key" >{{dt.value}}</option>
                            </select>
                        </span>
                    </div>
            </div>
            <!-- selección de tipo de inmueble -->
            <div class="flex flex-col rounded border px-2">
                <span class="text-xl m-2 ">Selecciona el tipo de inmueble (puedes seleccionar varios): </span>
                <div class="flex justify-around">
                    <span class="text-xl m-2 flex flex-col items-center">
                        <input 
                            class="m-1"
                            type="checkbox" 
                            name="Lote" 
                            id="cbxLote"
                            v-model="CbxLote">
                            <img src="images/country_48px.png" alt="Lote">
                            Lote
                    </span>
                    <span class="text-xl m-2 flex flex-col items-center">
                        <input 
                            class="m-1"
                            type="checkbox" 
                            name="Apartamento" 
                            id="cbxApartamento"
                            v-model="CbxApartamento">
                                <img src="images/building_40px.png" alt="apartamento">
                                Apartamento
                    </span>
                    <span class="text-xl m-2 flex flex-col items-center ">
                        <input 
                            class="m-1"
                            type="checkbox" 
                            name="Casa" 
                            id="cbxCasa"
                            v-model="CbxCasa">
                            <img src="images/house_48px.png" alt="casa">
                            Casa
                    </span>

                </div>
            </div>
            <!-- botón -->
            <div class="m-2 w-full flex justify-center">
                <input type="button" value="BUSCAR EN ESTA ÁREA" class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg m-2 " @click="Buscar">
            </div>
            <!-- mapa -->
            <GmapMap
                :center="selectedCenter"
                :zoom="selectedZoom"
                mapTypeControl= "false"
                streetViewControl= "false"
                class="w-full h-64"
                ref='mapRef'>
                    <GmapMarker
                        :key="index"
                        v-for="(p, index) in propiedades"
                        :position={lat:p.lat,lng:p.lng}
                        @click="SelecetPropiedad()"
                        />
            </GmapMap>
            <!-- cards -->
            <div class="w-full inline">

                <div class="rounded overflow-hidden shadow-lg m-2 w-11/12 md:w-1/2 lg:w-1/3"
                    v-for="prop in propiedades"
                    :key="prop.id">
                    <img class="w-full" src="https://i.picsum.photos/id/894/600/600.jpg?hmac=wJg2bcsTpfgAb0eYMLFbhzwiEUMTMBwtBf-yvdY491k" alt="Sunset in the mountains">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{{ prop.titulo }}</div>
                        <p class="text-gray-700 text-base">
                            {{ prop.descripcion }}
                        </p>
                        <span> Código propiedad {{ prop.id }}</span>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span v-for="(comodidad,n) in prop.contaran_clientes" :key=n class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ comodidad }}</span>
                    </div>
                </div>
            </div>
            <!-- aviso de sin nada que mostrar -->
            <div v-if="propiedades==false"  class="bg-gray-200 text-3xl m-4 w-full h-20 flex justify-center items-center">
                Ups! Nada que mostrar. <br> Pulsa el botón BUSCAR EN ESTA ÁREA o cambia el área en el mapa. 
            </div>
        </div>
   </div>
 </template>

 <script>
    import Vue from "vue";
    import { db } from "../firebase";
    import "firebase/auth";
    export default {
        name:"Home",
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
                minLat:0
            }
        },
        
        created(){
            //llena lista desplegable de provincias
            this.provincias.push("")
            fetch('https://ubicaciones.paginasweb.cr/provincias.json')
            .then(prvs=>prvs.json())
            .then(ps=>Object.entries(ps).forEach(([key,value])=>(this.provincias.push({key,value}))))

            //llena con 5 propiedades
            db.collection('propiedades')
            .limit(3)
            .get()
            .then((props)=>{props.forEach(prop=>{
                this.propiedades.push(prop.data())
            })})
        },
        
        updated () {
            this.$refs.mapRef.$mapPromise
            .then((map) => this.map=map);
        },
        
        methods:{
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
                } )
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
                                this.propiedades.push(prop.data())
                                console.log(prop.data())
                        }                        
                    })})
                }
            },
            
            SelecetPropiedad(){

            },
        },

    }
 </script>
