import api from './api';

export const criarFornecedor = (dados: { nome: string; email?: string; localizacao?: string }) =>
  api.post('/fornecedores', dados);

export const buscarFornecedores = () => api.get('/fornecedores');
export const buscarFornecedorPorId = (id: number) => api.get(`/fornecedores/${id}`);
export const editarFornecedor = (id: number, dados: any) => api.put(`/fornecedores/${id}`, dados);
export const removerFornecedor = (id: number) => api.delete(`/fornecedores/${id}`);
