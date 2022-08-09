// Добавляем свой axios
import axios from 'axios';
import router from './router';

const api = axios.create();

// Стартовый запрос
api.interceptors.request.use(config => {

    // Добавляем токен, смотри кавычки (Bearer - тип)
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config
}, error => {
})


// Конечный запрос
// Начальный ответ
api.interceptors.response.use(config => {

    // Добавляем токен, смотри кавычки (Bearer - тип)
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config
}, error => {

    // Если после истечения срока жизни токена мы переходим на страницу с фрутами, то мы обновляем токен
    if (error.response.data.message === 'Token has expired') {
        return axios.post('api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }

        // Добавляем фрукты без перезагрузки
        // .then( - это результат, который мы далее отправляем
        }).then ( res => {
            localStorage.setItem('access_token', res.data.access_token);

            error.config.headers.authorization = `Bearer ${res.data.access_token}`
            return api.request(error.config);
        })
    }

    // Редирект, если не авторизован
    if (error.response.status === 500 || error.response.status === 401) {
        router.push({name: 'user.login'})
    }
})

// Конечный ответ
export default api;
