import Vue from 'vue'
import VueRouter from "vue-router"; // Подключаем VueRouter

Vue.use(VueRouter) // Подключаем VueRouter во Vue

export default new VueRouter( {   // export - передает значения, при import и router(после components в app.js)
    mode: 'history',

    // Подключечаем файлы
    routes: [
        {
            path: '/fruits',
            // Второй вариант подключения component (Первый на гите:  laravel-vue-route-spa, коммит - first-spa)
            // component: function () {return import('./components/Person/Index')},

            // Третий вариант - сокращенный, стрелочная функция
            component: () => import('./components/Fruit/Index'),
            name: 'fruit.index' // нэйминг для редиректов, ссылок : название папки/название файла
        },
        {
            path: '/users/login',
            component: () => import('./components/User/Login'),
            name: 'user.login'
        },
        {
            path: '/users/registration',
            component: () => import('./components/User/Registration'),
            name: 'user.registration'
        },
        {
            path: '/users/personal',
            component: () => import('./components/User/Personal'),
            name: 'user.personal'
        },

    ]
})
