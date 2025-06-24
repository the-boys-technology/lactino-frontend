import { AxiosError } from "axios";
import { api } from "./api";
import { Transacao } from "../types/transacao";

type TransacaoSemId = Omit<Transacao, "id">;

export const criarTransacao = async (dados: TransacaoSemId) => {
  try {
    const res = await api.post<Transacao>("/transacoes", dados);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const buscarTransacoes = async (tipo?: string) => {
  try {
    const res = await api.get<Transacao[]>(`/transacoes${tipo ? `?tipo=${tipo}` : ""}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const buscarTransacaoPorId = async (id: string) => {
  try {
    const res = await api.get<Transacao>(`/transacoes/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const editarTransacao = async (id: string, dados: Transacao) => {
  try {
    const res = await api.put<Transacao>(`/transacoes/${id}`, dados);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};

export const removerTransacao = async (id: string) => {
  try {
    const res = await api.delete(`/transacoes/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};
