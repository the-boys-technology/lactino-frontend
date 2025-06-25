export type TipoNotificacao = "LEITE" | "LATICINIO" | "INSUMO" | "GERAL";

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  data_criacao: string;
  lida: boolean;
  usuario_id: number;
  referencia_id?: number;
  referencia_tipo?: TipoNotificacao;
}
