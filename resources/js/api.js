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

    // Редирект, если не авторизован
    if (error.response.status === 500 || error.response.status === 401) {
        router.push({name: 'user.login'})
    }
})

// Конечный ответ
export default api;
