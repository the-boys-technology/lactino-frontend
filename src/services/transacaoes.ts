import { AxiosError } from "axios";
import { api } from "./api";
import { Transacao } from "../types/transacao";

export const criarTransacao = async (dados: Omit<Transacao, "id">) => {
  try {
    const res = await api.post<Transacao>("/transacoes", dados);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const buscarTransacoes = async (tipo?: string) => {
  try {
    const res = await api.get<Transacao[]>(`/transacoes${tipo ? `?tipo=${tipo}` : ""}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const buscarTransacaoPorId = async (id: number) => {
  try {
    const res = await api.get<Transacao>(`/transacoes/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const editarTransacao = async (id: number, dados: Transacao) => {
  try {
    const res = await api.put(`/transacoes/${id}`, dados);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};

export const removerTransacao = async (id: number) => {
  try {
    const res = await api.delete(`/transacoes/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
};
