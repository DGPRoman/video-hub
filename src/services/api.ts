import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.zhyvpyv.km.ua/wp-json/wp/v2'
});

export const fetchProductsData = async ({limit = 10}: { limit?: number }) => {
    try {
        const response = await axiosInstance.get(`/products?&per_page=${limit}&_embed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
