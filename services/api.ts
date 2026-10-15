import { API_CONFIG } from '@/config/api.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api =  axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    }
})

// iNTERCEPTORS PARA ADICIONAR O TOKEN EM TODAS AS REQUISIÇÕES
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("@token:PizzariaMobile");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


// Aqui é opcional, ele vai interceptar o erro de token expirado e deletar o token do AsyncStorage
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401) {
            await AsyncStorage.removeItem("@token:PizzariaMobile");
        }

        return Promise.reject(error);
    }
)