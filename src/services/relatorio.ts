import { AxiosError } from "axios";
import { api } from "./api";
import { RelatorioPedidoTipo } from "../types/relatorios";
import { ItemTransacao } from "../types/item-transacao";

export const buscarRelatorioPedido = async (id: string) => {
  try {
    const res = await api.get<RelatorioPedidoTipo>(`/relatorios/pedidos/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao buscar relatório:", error);
      throw new Error(`Erro ao buscar relatório: ${error.message}`);
    }
    throw error;
  }
};

export const baixarRelatorioPDF = async (id: string) => {
  try {
    const res = await api.get(`/relatorios/pedidos/imprimir/${id}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `relatorio-pedido-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    if (error instanceof AxiosError) throw new Error("Erro ao baixar PDF: " + error.message);
    throw error;
  }
};

export const buscarRelatorioItens = async (params?: {
  transacaoId?: string;
  produtoId?: string;
  categoria?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.transacaoId) queryParams.append("transacaoId", params.transacaoId);
    if (params?.produtoId) queryParams.append("produtoId", params.produtoId);
    if (params?.categoria) queryParams.append("categoria", params.categoria);

    const res = await api.get<ItemTransacao[]>(
      `/itens-transacoes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error("Erro ao buscar itens do relatório: " + error.message);
    throw error;
  }
};
