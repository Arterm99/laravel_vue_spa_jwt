<template>
    <div class="w-25">
<!--    v-model Передает данные при вводе в inpit в data()-->
        <input v-model="email" type="email" class="form-control mt-3 mb-3" placeholder="email">
        <input v-model="password" type="password" class="form-control mb-3" placeholder="password">
<!--    prevent - выключает сценарий по умолчанию, который есть у html тегов    -->
        <input @click.prevent="login" type="submit" class="btn btn-primary">
    </div>
</template>

<script>
export default {
    name: "login",

    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            // Через axios передаем данные на бэк
            axios.post('/api/auth/login', {email: this.email, password: this.password})
            .then( res => {
                console.log(res.data.access_token);

                // Помещаем токен в LocalStorage
                localStorage.setItem('access_token', res.data.access_token);

                // После получения токена выполни редирект на 'user.personal'
                this.$router.push({ name: 'user.personal'})
            })
        }
    }
}
</script>

<style scoped>

</style>
