import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.zhyvpyv.km.ua/wp-json/wp/v2'
});

export default axiosInstance;
