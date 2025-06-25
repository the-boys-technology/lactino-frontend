import { Transacao } from "./transacao";

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  localizacao: string;
  transacoes?: Transacao[];
}