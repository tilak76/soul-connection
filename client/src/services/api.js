import axios from 'axios';

const api = axios.create({
    baseURL: 'https://soulconnection.netlify.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
