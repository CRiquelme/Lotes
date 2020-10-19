<template>
    
    <div class="container flex flex-col p-4 m-auto rounded-lg ">
            <!-- historial de chats -->
            <div class="w-full bg-gray-200 overflow-x-hidden overflow-y-scroll" style="height:500px">
                <!-- mensaje -->
                <div class="flex h-20 m-2" v-for="(m,i) in messagesList" :key="i">
                    <div class="h-20 w-1/3" v-if="m[1].fromEmail==fromEmail"></div>
                    <div class="h-20 w-2/3 bg-gray-300 rounded-lg p-2">
                        {{ m[1].message }}
                    </div>
                </div>
            </div>
            <!-- botón y texto -->
            <div class="w-full h-20 flex items-center mt-2">
                <textarea name="" id="" cols="20" rows="4" class="w-full h-full p-1 mr-2 rounded-lg border-solid border-2 border-gray-400" style="resize:none" v-model="newMessageText"></textarea>
                <button class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg " 
                @click="sendMessage">
                    Enviar
                </button>
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
                fromEmail:"",
                toEmail:"",
                idToPropiedad:"",
                newMessageText:"",
                messagesList:[],
            }
        },
        async created(){ 
            this.fromEmail=await f.auth().currentUser.email
            this.idToPropiedad = this.$route.params.id;

            db.collection("propiedades")
            .doc(this.idToPropiedad).get()
            .then(propData=>
                {
                    const userID=propData.data().uid
                    db.collection("users").doc(userID).get()
                    .then(userData=>
                        this.toEmail= userData.data().email
                        )
                })
            
            //lista de mensajes donde quien envía es el usuario activo
            await db.collection("mensajes").where("fromEmail","==",this.fromEmail).where("idToPropiedad","==",this.idToPropiedad).get()
            .then((mensajes)=>{
                mensajes.forEach(m => {
                    this.messagesList.push([
                        m.id, 
                        m.data()])
                });
            }) 
            console.log(this.messagesList)
        },
        methods: {
            sendMessage(){
                if ( !this.newMessageText){return}
                const newMessage={
                    fromEmail:this.fromEmail,
                    idToPropiedad:this.idToPropiedad,
                    message:this.newMessageText,
                    date:firebase.firestore.FieldValue.serverTimestamp()
                }
                 db.collection("mensajes").add(newMessage)
                .then(()=>{
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