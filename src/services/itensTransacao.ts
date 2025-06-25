import { AxiosError } from "axios";
import { api } from "./api";
import { ItemTransacao } from "../types/item-transacao";

export const buscarItens = async () => {
  try {
    const res = await api.get<ItemTransacao[]>("/itens-transacoes");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const buscarItensPorTransacao = async (transacaoId: number) => {
  try {
    const res = await api.get<ItemTransacao[]>(`/itens-transacoes?transacao_id=${transacaoId}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const removerItem = async (id: number) => {
  try {
    const res = await api.delete(`/itens-transacoes/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};
