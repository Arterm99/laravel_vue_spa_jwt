<template>
    <div>
        <div class="w-25">
            <input v-model="name" type="text" class="form-control mt-3 mb-3" placeholder="name">
            <input v-model="email" type="email" class="form-control mb-3" placeholder="email">
            <input v-model="password" type="password" class="form-control mb-3" placeholder="password">
            <input v-model="password_confirmation" type="password" class="form-control mb-3" placeholder="confirm password">
            <input @click.prevent="store" type="submit" class="btn btn-primary">
            <div v-if="error" class="text-danger"> {{ error }} </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "registration",

    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            error: null,
        }
    },

    mounted() {

    },

    methods: {
        store() {
            axios.post('/api/users', {name: this.name,  email: this.email,  password: this.password, password_confirmation: this.password_confirmation})
            .then( res => {

                // Получаем токен из Бэка , файл - StoreController
                localStorage.setItem('access_token', res.data.access_token)
                this.$router.push({name: 'user.personal'})
            })

                // Ошибку передаем с StoreController
                .catch(error => {
                    this.error = error.response.data.error
                })
        }
    }
}
</script>

<style scoped>

</style>
