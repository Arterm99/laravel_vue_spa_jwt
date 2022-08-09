<template>
    <div>
<!--   v-if="!accessToken" - аналог if в php (если токена не существует, открывай страницу)  -->
        <router-link :to="{ name: 'fruit.index' }">Fruit</router-link>
        <router-link v-if="!accessToken" :to="{ name: 'user.login' }">Login</router-link>
        <router-link v-if="!accessToken" :to="{ name: 'user.registration' }">Registration</router-link>
        <router-link v-if="accessToken" :to="{ name: 'user.personal' }">Personal</router-link>
        <a v-if="accessToken" href="#" @click.prevent="logout">Logout</a>
        <router-view></router-view>
    </div>
</template>

<script>
// Прокидываем созданный в api.js токен
import api from "../api";


export default {
    name: "Index",

    data() {
        return {
            accessToken: null
        }
    },

    mounted() {
        this.getAccessToken()
    },

    // Обновляем страницу после входа, что бы высветились ссылки, которые закрыли v-if
    updated() {
        this.getAccessToken()
    },

    methods: {
        getAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },

        logout() {
            api.post('/api/auth/logout')
            .then( res => {
                localStorage.removeItem('access_token')
                this.$router.push({name: 'user.login'})
            })
        }
    }
}
</script>

<style scoped>

</style>
