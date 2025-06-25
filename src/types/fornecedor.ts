import { Transacao } from "./transacao";

export interface Fornecedor {
  id: number;
  nome: string;
  email?: string;
  localizacao?: string;
  transacoes?: Transacao[];
}