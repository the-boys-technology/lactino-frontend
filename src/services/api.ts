import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export const api_ibge = axios.create({
  baseURL: 'http://servicodados.ibge.gov.br/api/v1/localidades',
});

// Interceptor de requisição para adicionar o token JWT
api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor de resposta para lidar com erro 403 (token inválido ou expirado)
// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 403) {
//       sessionStorage.removeItem("access_token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
