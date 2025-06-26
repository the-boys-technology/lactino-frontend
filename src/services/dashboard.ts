import { api } from './api';
import { Transacao } from '../types/transacao';
import { Insumo } from '../types/insumo';

export const getEstoqueResumo = async (): Promise<{
  total: number;
  porTipo: { tipo: string; quantidade: number }[];
}> => {
  const response = await api.get<{ content: Insumo[] }>('/insumos');
  const lista = response.data.content;

  const totaisPorTipo: Record<string, number> = {};

  lista.forEach(insumo => {
    const tipo = insumo.categoria || 'Outro';
    totaisPorTipo[tipo] = (totaisPorTipo[tipo] || 0) + (insumo.quantidadeTotal ?? 0);
  });

  return {
    total: lista.reduce((sum, item) => sum + (item.quantidadeTotal ?? 0), 0),
    porTipo: Object.entries(totaisPorTipo).map(([tipo, quantidade]) => ({ tipo, quantidade })),
  };
};

export const getUltimasCompras = async (): Promise<Transacao[]> => {
  const response = await api.get<Transacao[]>('/transacoes?tipo=COMPRA');
  return response.data;
};

export const getUltimasVendas = async (): Promise<Transacao[]> => {
  const response = await api.get<Transacao[]>('/transacoes?tipo=VENDA');
  return response.data;
};