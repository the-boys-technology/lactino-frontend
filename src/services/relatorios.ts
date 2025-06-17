import { RelatorioPedidoTipo } from "../types/relatorios";
import { api } from "./api";

export const buscarRelatorioPedido = async (id: string) => {
  const res = await api.get<RelatorioPedidoTipo>(`/relatorios/pedidos/${id}`);
  return res.data;
};

export const baixarRelatorioPDF = async (id: string) => {
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
};
