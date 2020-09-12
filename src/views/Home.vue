 <template>
    <div>
        <header>header</header>
        <main> main </main>
        <a href="#" @click="logout">Cerra Sesion</a>
    </div>
 </template>

 <script>
    import firebase from 'firebase';

    export default {
        name:'Home',
        data(){
            return{

            }
        },
        methods:{
            logout(){
                firebase.auth().signOut().then(()=>this.$router.replace('Login'))
            }
        }

    
    }
 </script>

 
 