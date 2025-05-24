import { AxiosError } from "axios";
import api from "./api";
import { ItemTransacao } from "../types/transacao";

export const buscarItens = async () => {
  try {
    const res = await api.get<ItemTransacao[]>("/itens-transacao");
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const buscarItensPorTransacao = async (transacaoId: number) => {
  try {
    const res = await api.get<ItemTransacao[]>(`/itens-transacao?transacao_id=${transacaoId}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const removerItem = async (id: number) => {
  try {
    const res = await api.delete(`/itens-transacao/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};
