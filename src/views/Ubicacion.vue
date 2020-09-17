 <template>
   <div>
        <GmapMap
            :center="{lat:11,lng:-74}"
            :zoom="15"
            class="w-full h-20"
            ref='mapRef'>
                <GmapMarker
                    :key="index"
                    v-for="(p, index) in position"
                    :position="p"
                    @click="hola"/>
        </GmapMap>
        <pre>
            {{$data}}
        </pre>
   </div>
 </template>

 <script>
    import { db } from "../firebase";
    import "firebase/auth";
    export default {
        data(){
            return{
                position:[]
            }
        },
        created(){
            db.collection('propiedades').get()
            .then((querySnapHot)=>{querySnapHot.forEach(prop=>{
                this.position.push({
                    lat:prop.data().latitud,
                    lng:prop.data().longitud
                })
            })})
        },
        updated () {
            this.$refs.mapRef.$mapPromise
            .then((map) => this.map=map);
            
        },
        methods:{
            hola(){console.log("hola")}
        }
    }
 </script>
<!--                  position:[
                    {lat:11,lng:-74},{lat:10,lng:-74},
                    {lat:10,lng:-74} -->