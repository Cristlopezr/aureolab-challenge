import axios from 'axios';

const eShopApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default eShopApi;
