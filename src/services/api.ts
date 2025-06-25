import axios, { AxiosRequestConfig } from 'axios'

const isProduction = import.meta.env.PROD;

export const api = axios.create({
  baseURL: isProduction
    ? 'https://lactino-backend-render.onrender.com/api'
    : '/api', 
});

export const api_ibge = axios.create({
  baseURL: 'http://servicodados.ibge.gov.br/api/v1/localidades',
})

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));




