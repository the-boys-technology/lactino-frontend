import { Transacao } from "./transacao";

export interface Fornecedor {
  id: string;
  nome: string;
  email?: string;
  localizacao?: string;
  transacoes?: Transacao[];
}