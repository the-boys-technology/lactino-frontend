import { AxiosError } from "axios";
import { api } from "./api";
import { ItemTransacao } from "../types/transacao";

export const buscarRelatorioItens = async (params?: {
  transacaoId?: number;
  produtoId?: number;
  categoria?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.transacaoId) queryParams.append("transacaoId", params.transacaoId.toString());
    if (params?.produtoId) queryParams.append("produtoId", params.produtoId.toString());
    if (params?.categoria) queryParams.append("categoria", params.categoria);

    const res = await api.get<ItemTransacao[]>(
      `/itens-transacoes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    throw error;
  }
};
