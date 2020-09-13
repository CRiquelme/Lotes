 <template>
   <div>
        <GmapMap
        :center="{lat:11,lng:-74}"
        :zoom="15"
        class="w-full h-screen"
        ref='mapRef'>
            <GmapMarker
                :key="index"
                v-for="(p, index) in position"
                :position="p"
                clickable="true"/>
            </GmapMap>
   </div>
 </template>

 <script>
    export default {
        data(){
            return{
                position:[
                    {lat:11,lng:-74},{lat:10,lng:-74},
                    {lat:10,lng:-74}
                ]
            }
        },
        updated () {
            this.$refs.mapRef.$mapPromise
            .then((map) => this.map=map);
            
        }
    }
 </script>
 