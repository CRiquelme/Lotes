<template>
    <div class="container flex mx-auto mt-4  h-full">

        <!-- mensajes -->
        <div class="w-2/3 h-full bg-red-500 p-4 flex flex-col" >
            <div class="flex flex-col h-2/3 bg-gray-500">
<!--                 <div class="flex">
                    <div class="w-2/3 bg-gray-500 p-2 mt-2 rounded-lg flex flex-col items-end">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quidem reiciendis a perspiciatis, excepturi rerum, nostrum voluptatibus facere saepe, libero harum! Possimus dolore consectetur aspernatur neque deleniti tenetur. Magnam, eligendi.
                        </p>
                        <span class="text-xs">01/02/20</span>
                    </div>
                    <div class="w-1/3"></div>
                </div> -->
            </div>
            <div class="bg-yellow-500 w-full h-1/3">
                acá va el chat
            </div>


        </div>
        <!-- lista de conversaciones -->
        <div class="w-1/3 h-full bg-blue-500">
            <div class="">

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name:"Mensajes",
        data(){
            return{
                
            }
        },
        methods:{
/*             enviarCorreo(){
                    Email.send({
                    Host : "smtp.yourisp.com",
                    Username : "username",
                    Password : "password",
                    To : 'them@website.com',
                    From : "you@isp.com",
                    Subject : "This is the subject",
                    Body : "And this is the body"
                    }).then(
                    message => alert(message)
                    );
            } */

        }
    }
</script>

