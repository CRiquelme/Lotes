<template>
    <div class="container flex mx-auto mt-4 mb-4 h-full rounded-lg">
        <!-- mensajes -->
        <div class="w-2/3 h-full p-4 flex flex-col pb-8 " >
            <!-- historial de chats -->
            <div class="w-full h-full bg-gray-200">
                <!-- mensaje -->
                <div class="flex h-20 m-2" v-for="(m,i) in messagesList" :key="i">
                    <div class="h-20 w-1/3" v-if="m[1].fromEmail==fromEmail"></div>
                    <div class="h-20 w-2/3 bg-gray-300 rounded-lg p-2">
                        {{ m[1].message }}
                    </div>
                </div>
            </div>
            <!-- botón y texto -->
            <div class="w-full h-20 flex items-center mt-1">
                <textarea name="" id="" cols="20" rows="4" class="w-full h-full p-1 mr-2 rounded-lg border-solid border-2 border-gray-400" style="resize:none" v-model="newMessageText"></textarea>
                <button class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg " 
                @click="sendMessage">
                    Enviar
                </button>
            </div>
        </div>
        <!-- lista de conversaciones -->
        <div class="w-1/3 h-full bg-blue-500">
            <div class="" v-for="(conversacion,i) in conversaciones" :key="i">
                {{ conversacion[1].fromEmail }}
                {{ conversacion[1].date }}
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import { db, f } from "@/firebase";
    export default {
        name:"Mensajes",
        data(){
            return{
                fromID:"",
                fromEmail:"",
                toEmail:"dariojosearrietadeavila@gmail.com",
                toID:"2uwu4Px6ZPM4AeKp9bBpwM81Hha2",
                newMessageText:"",
                messagesList:[],
            }
        },
        async created(){
            //datos del usario activo
            this.fromEmail=await f.auth().currentUser.email
            this.fromID=f.auth().currentUser.uid
            
            //lista de conversaciones a mostrar donde quien envía es el usuario activo
            let mensajesAux=[];
            await db.collection("mensajes").where("fromID","==",this.fromID).get()
            .then((mensajes)=>{
                mensajes.forEach(m => {
                    mensajesAux.push([
                        m.id, 
                        m.data()])
                });
            })
            //lista de mensajes a mostrar donde a quien envía es el usuario activo.
            await db.collection("mensajes").where("toID","==",this.toID).get()
            .then((mensajes)=>{
                mensajes.forEach(m => {
                    mensajesAux.push([
                        m.id, 
                        m.data()])
                });
            })
            //Elimina repetidos
            mensajesAux.forEach(m=>{
                let exist=false
                this.messagesList.forEach(n=>{
                    if(n[0]===m[0]){exist=true}
                })
                if(!exist){this.messagesList.push(m) } 
            })
        },
        computed:{
            conversaciones(){
                return this.messagesList
            }
        },
        methods: {
            sendMessage(){
                db.collection("mensajes").add({
                    fromID:this.fromID,
                    fromEmail:this.fromEmail,
                    toID:this.toID,
                    toEmail:this.toEmail,
                    message:this.newMessageText,
                    date:firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    //notifica por correo usando LoadScript en main.js y smtpjs.com
                    window.Email.send({
                        SecureToken : "15b50171-a11e-4dbf-a5d6-9525e51cff72",
                        To : this.toEmail,
                        From : "notificacioneswebapp@gmail.com",
                        Subject : "CR-Lotes: TIENES UN NUEVO MENSAJE SIN LEER📧",
                        Body : "Tienes un nuevo mensaje sin leer en CR-Lotes. Ve a revisar dando click acá http://localhost:8080/mensajes"
                })
                }).catch(err=>console.error(err))
            },
            },
    }
</script>