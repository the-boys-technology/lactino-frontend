import api from './api'

export const criarInsumo = (dados: any) => api.post('/insumos', dados);
export const editarInsumo = (id: string, dados: any) => api.put(`/insumos/${id}`, dados);
export const removerInsumo = (id: string) => api.delete(`/insumos/${id}`);
export const buscarInsumos = () => api.get('/insumos');
export const buscarInsumoPorId = (id: string) => api.get(`/insumos/${id}`);
