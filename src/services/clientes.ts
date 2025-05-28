import { AxiosError } from 'axios';
import { api } from "./api";
import { Cliente } from '../types/transacao';

export const criarCliente = async (dados: Omit<Cliente, 'id'>) => {
  try {
    const response = await api.post<Cliente>('/clientes', dados);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao criar cliente:", error.response?.data);
      return error.response?.data;
    }
    throw error;
  }
};

export const editarCliente = async (id: number, dados: Cliente) => {
  try {
    const response = await api.put(`/clientes/${id}`, dados);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao editar cliente:", error.response?.data);
      return error.response?.data;
    }
    throw error;
  }
};

export const removerCliente = async (id: number) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao remover cliente:", error.response?.data);
      return error.response?.data;
    }
    throw error;
  }
};

export const buscarClientes = async () => {
  try {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao buscar clientes:", error.response?.data);
      return error.response?.data;
    }
    throw error;
  }
};

export const buscarClientePorId = async (id: number) => {
  try {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao buscar cliente por ID:", error.response?.data);
      return error.response?.data;
    }
    throw error;
  }
};
