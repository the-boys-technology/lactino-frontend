import { api } from './api'

export const registrarLeite = (dados: any) => api.post('/leites', dados);
export const editarLeite = (id: string, dados: any) => api.put(`/leites/${id}`, dados);
export const removerLeite = (id: string) => api.delete(`/leites/${id}`);
export const buscarLeites = () => api.get('/leites');
export const buscarLeitePorId = (id: string) => api.get(`/leites/${id}`);

// RESTA /api/leites/vencendo0
// RESTA PATCH /api/leites/{id}

export const registrarLaticinio = (dados: any) => api.post('/laticinios', dados);
export const editarLaticinio = (id: string, dados: any) => api.put(`/laticinios/${id}`, dados);
export const removerLaticinio = (id: string) => api.delete(`/laticinios/${id}`);
export const buscarLaticinios = () => api.get('/laticinios');
export const buscarLaticinioPorId = (id: string) => api.get(`/laticinios/${id}`);

// RESTA /api/laticinios/vencendo
