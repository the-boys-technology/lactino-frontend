import api from './api';
import { Cliente } from '../types/transacao';

export const criarCliente = (dados: Omit<Cliente, 'id'>) => api.post<Cliente>('/clientes', dados);
export const editarCliente = (id: number, dados: Cliente) => api.put(`/clientes/${id}`, dados);
export const removerCliente = (id: number) => api.delete(`/clientes/${id}`);
export const buscarClientes = () => api.get<Cliente[]>('/clientes');
export const buscarClientePorId = (id: number) => api.get<Cliente>(`/clientes/${id}`);