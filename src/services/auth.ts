import { api } from './api';

export const cadastrarConta = (dados: any) => api.post('/auth/registrar', dados);
export const fazerLogin = (dados: any) => api.post('/auth/login', dados);
export const verDados = () => api.get('/auth/ver-dados');