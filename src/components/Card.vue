<template>
    <div class="w-full max-h-0 m-auto p-4 overflow-hidden shadow">
        <img class="w-full" src="https://i.imgur.com/70aGoZ1.jpg" alt="Sunset in the mountains">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 uppercase">
                {{ propiedad.titulo }}
            </div>
            <p class="text-gray-700 text-base">
                {{ propiedad.descripcion }}
            </p>
        </div>

        <!-- Botón Detalles -->
        <div class="m-2 w-full flex justify-center">
            <input type="button" value="VER DETALLES" class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg m-2"
            @click="selectPropiedad">
        </div>

        <!-- Tags -->
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.provincia }}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.canton }}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ propiedad.distrito }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name:"Card",
        props:{
                propiedad:{type:Object, required:true}
        },
        methods:{
            selectPropiedad(){
                //este es un componente hijo que para mandar información del ID de la propiedad al componente padre tiene que emitir un evento con $emit, así el padre lo podrá escuchar.
                this.$emit('selectPropiedad',this.propiedad.id)
            }
        }
    }
</script>>