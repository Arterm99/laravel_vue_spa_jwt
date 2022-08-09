<template>
    <div>
        <router-link :to="{ name: 'fruit.index' }">Fruit</router-link>
        <router-link :to="{ name: 'user.login' }">Login</router-link>
        <router-link :to="{ name: 'user.registration' }">Registration</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped>

</style>
