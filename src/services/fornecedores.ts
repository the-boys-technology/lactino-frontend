import { AxiosError } from "axios";
import api from "./api";
import { Fornecedor } from "../types/transacao";

export const criarFornecedor = async (dados: Omit<Fornecedor, "id">) => {
  try {
    const res = await api.post<Fornecedor>("/fornecedores", dados);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const buscarFornecedores = async () => {
  try {
    const res = await api.get<Fornecedor[]>("/fornecedores");
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const buscarFornecedorPorId = async (id: number) => {
  try {
    const res = await api.get<Fornecedor>(`/fornecedores/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const editarFornecedor = async (id: number, dados: Fornecedor) => {
  try {
    const res = await api.put<Fornecedor>(`/fornecedores/${id}`, dados);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const removerFornecedor = async (id: number) => {
  try {
    const res = await api.delete(`/fornecedores/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};
