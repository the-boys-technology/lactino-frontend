// Tipos de notificações
export type TipoNotificacao = 'LEITE' | 'LATICINIO' | 'INSUMO';
export type PrioridadeNotificacao = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';

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

// Interfaces para filtros
export interface FiltroNotificacoes {
  tipo?: TipoNotificacao;
  prioridade?: PrioridadeNotificacao;
  dataInicio?: string;
  dataFim?: string;
  pagina?: number;
  itensPorPagina?: number;
  ordenarPor?: 'data_criacao' | 'prioridade';
  ordem?: 'asc' | 'desc';
}