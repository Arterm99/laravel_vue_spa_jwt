<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            <!--       v-for - это  foreach во Вью     -->
            <tr v-for="fruit in fruits">
                <th scope="row">{{ fruit.id }}</th>
                <td>{{ fruit.name }}</td>
                <td>{{ fruit.price }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from "../../api";
export default {
    name: "Index",

    data() {
        return {
            fruits: null,
        }
    },

    // mounted - Запуск метода
    mounted() {
        this.getFruits()
    },

    methods: {
        getFruits() {

            // Достаем токен из файла api.js и открываем страницу, иначе перекидываем обратно на страницу Логина
            api.get(`/api/auth/fruits`, {})
                .then(res => {
                    this.fruits = res.data.data
                })
        },

    }
}
</script>

<style scoped>

</style>
