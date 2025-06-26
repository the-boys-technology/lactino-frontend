import { Transacao } from "./transacao";

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  localizacao: string;
  transacoes?: Transacao[];
}