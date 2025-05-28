import axios, { AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

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




