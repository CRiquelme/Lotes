<template>
    <div class="container flex mx-auto mt-4 mb-4 h-full rounded-lg">
        <!-- mensajes -->
        <div class="w-11/12 h-full p-4 flex flex-col pb-8 items-center" >
            <div class=" w-full flex justify-between">
                <span class="font-semibold"> {{toEmail}}</span>
                <button class="bg-blue-500      hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded text-lg " @click="showHideConversaciones"> > </button>
            </div>

            <!-- historial de chats -->
            <div class="w-full h-full bg-gray-200">
                <!-- mensaje -->
                <div class="flex h-20 m-2" v-for="(m,i) in convSelected" :key="i">
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
        <div class="w-auto h-full" v-if="showConversaciones">
            <div class="bg-gray-400 rounded my-2 p-4 overflow-hidden cursor-pointer" 
            v-for="(conversacion,i) in conversaciones"
            :key="i"
            @click="selectConv(i)">
                {{ conversacion.toEmail }}
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
                toEmail:"",
                toID:"2uwu4Px6ZPM4AeKp9bBpwM81Hha2",
                newMessageText:"",
                messagesList:[],
                showConversaciones:true,
            }
        },
        async created(){
            //datos del usario activo
            this.fromEmail=await f.auth().currentUser.email
            this.fromID=f.auth().currentUser.uid
            
            //lista de mensajes donde quien envía es el usuario activo
            let mensajesAux=[];
            await db.collection("mensajes").where("fromID","==",this.fromID).get()
            .then((mensajes)=>{
                mensajes.forEach(m => {
                    mensajesAux.push([
                        m.id, 
                        m.data()])
                });
            })
            //lista de mensajes donde a quien envía es el usuario activo.
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
            this.messagesList.sort(function(a,b){
                return (a[1].date-b[1].date)
            })
        },
        computed:{
            conversaciones: function(){
                //arma lista de conversaciones con repetidos
                let convRep=[]
                this.messagesList.forEach(m=>{
                    if (m[1].fromEmail===this.fromEmail){
                        convRep.push({
                            toEmail:m[1].toEmail,
                            date:m[1].date
                        })
                    }else if(m[1].toEmail===this.fromEmail){
                        convRep.push({
                            toEmail:m[1].fromEmail,
                            date:m[1].date
                        })
                    }
                })
                //elimina repetidos
                let conv=[]
                convRep.forEach(m=>{
                    let exist=false
                    conv.forEach(n=>{
                        if(n.toEmail===m.toEmail ){exist=true}
                    })
                    if(!exist && this.fromEmail!=m.toEmail){conv.push(m) } 
                })
                return conv
            },
            convSelected: function(){
                //cambia vector de mensajes a mostrar
                var mList=[];
                if(this.toEmail){
                    this.messagesList.forEach(m=>{
                        if(m[1].fromEmail===this.toEmail || m[1].toEmail===this.toEmail)
                            mList.push(m)
                    })
                }
                return mList
            }
        },
        methods: {
            sendMessage(){
                const newMessage={
                    fromID:this.fromID,
                    fromEmail:this.fromEmail,
                    toID:this.toID,
                    toEmail:this.toEmail,
                    message:this.newMessageText,
                    date:firebase.firestore.FieldValue.serverTimestamp()
                }
                db.collection("mensajes").add(newMessage)
                .then((docID)=>{
                    //cambia el modelo local
                    this.messagesList.push([docID,newMessage])
                    this.newMessageText=""
                    
                })
                .then(()=>{
                    //notifica por correo usando LoadScript en main.js y smtpjs.com
                    window.Email.send({
                        SecureToken : "15b50171-a11e-4dbf-a5d6-9525e51cff72",
                        To : this.toEmail,
                        From : "notificacioneswebapp@gmail.com",
                        Subject : "CR-Lotes: TIENES UN NUEVO MENSAJE SIN LEER📧",
                        Body : "Tienes un nuevo mensaje sin leer en CR-Lotes. Ve a revisar dando click acá http://localhost:8080/mensajes"
                })
                })
                .catch(err=>console.error(err))
            },
            showHideConversaciones(){
                this.showConversaciones=!this.showConversaciones
            },
            selectConv(convIndex){
                this.toEmail= this.conversaciones[convIndex].toEmail
            }
        },
    }
</script>