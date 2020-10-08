 <template>
   <div>
       <div>
            <span>
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
            <span>
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
            <span>
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

        <div>
            <span>
                <input 
                    type="checkbox" 
                    name="Apartamento" 
                    id="cbxApartamento"
                    v-model="CbxApartamento">
                Apartamento
            </span>
            <span>
                <input 
                    type="checkbox" 
                    name="Casa" 
                    id="cbxCasa"
                    v-model="CbxCasa">
                Casa
            </span>
            <span>
                <input 
                    type="checkbox" 
                    name="Lote" 
                    id="cbxLote"
                    v-model="CbxLote">
                Lote
            </span>
        </div>
        <div>
            <input type="button" value="BUSCAR EN ESTA ÁREA" class="h-10 p-2 m-2" @click="Buscar">
        </div>

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
                    :data-id=p.id
                    @click="SelecetPropiedad()"
                    />
        </GmapMap>

        <div class="flex">
            <div class="max-w-sm rounded overflow-hidden shadow-lg m-4"
                v-for="prop in propiedades"
                :key="prop.id">
                <img class="w-full" src="https://i.picsum.photos/id/894/600/600.jpg?hmac=wJg2bcsTpfgAb0eYMLFbhzwiEUMTMBwtBf-yvdY491k" alt="Sunset in the mountains">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{{ prop.tipo }}</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <span> Código propiedad {{ prop.id }}</span>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
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
        },
        updated () {
            this.$refs.mapRef.$mapPromise
            .then((map) => this.map=map);
        },
        methods:{
            ProvinciaChange(){
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
                        }                        
                    })})
                }
            },
            SelecetPropiedad(){

            },
        },

    }
 </script>
