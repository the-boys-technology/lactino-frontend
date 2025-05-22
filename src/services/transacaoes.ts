import api from './api';
import { Transacao } from '../types/transacao';

export const excluirTransacao = (id: number) => api.delete(`/transacoes/${id}`);
export const editarTransacao = (id: number, dados: Transacao) => api.put(`/transacoes/${id}`, dados);
export const buscarTransacoes = () => api.get('/transacoes');
