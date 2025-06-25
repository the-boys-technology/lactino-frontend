import { api } from "./api";
import { Notificacao } from "../types/notificacao";

export const buscarNotificacoes = () =>
  api.get<Notificacao[]>("/notificacoes");

export const buscarNotificacoesNaoLidas = () =>
  api.get<Notificacao[]>("/notificacoes/nao-lidas");

export const marcarNotificacaoComoLida = (id: string) =>
  api.put(`/notificacoes/${id}/marcar-lida`);

export const removerNotificacao = (id: string) =>
  api.delete(`/notificacoes/${id}`);
