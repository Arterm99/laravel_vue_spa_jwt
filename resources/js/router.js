import Vue from 'vue'
import VueRouter from "vue-router"; // Подключаем VueRouter

Vue.use(VueRouter) // Подключаем VueRouter во Vue

const route = new VueRouter({   // export - передает значения, при import и router(после components в app.js)
    mode: 'history',

    // Подключечаем файлы
    routes: [
        {
            path: '/fruits',
            // Второй вариант подключения component (Первый на гите:  laravel-vue-route-spa, коммит - first-spa)
            // component: function () {return import('./components/Person/Index')},

            // Третий вариант - сокращенный, стрелочная функция
            component: () => import('./components/Fruit/Index'),
            name: 'fruit.index' // нэйминг для редиректов, ссылок : название папки/название файла. Просто обозначение
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

        // Переход на любые страницы кроме указанных выше, ведет на страницу Personal
        {
            path: '*',
            component: () => import('./components/User/Personal'),
            name: '404'
        },

    ]
})

// Метод beforeEach -  перед тем как будет подгружен какой либо компонент, мы выполним настройки
// Метод beforeEach примерно = middleware для роутов
// to, from, next - позволяет записывать в консоль страницы по которым ходили
route.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')

    // Если все страницы, кроме user.login и 'user.registration' не имеют access_token (токена), то возвращаем на user.login

    if (!accessToken) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }

    // Если есть токен, то с user.login редирект user.personal
    if (to.name === 'user.login' || to.name === 'user.registration' && accessToken) {
        return next({
            name: 'user.personal'
        })
    }

    next();
})

export default route
