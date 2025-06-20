import { ItemTransacao } from "./item-transacao";

export enum TipoTransacao {
  COMPRA = "COMPRA",
  VENDA = "VENDA",
}

export enum FormaPagamento {
  PIX = "PIX",
  CARTAO = "CARTAO",
  DINHEIRO = "DINHEIRO",
  BOLETO = "BOLETO",
}

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  data: string;
  valorTotal: number;
  formaPagamento: FormaPagamento;
  clienteId?: number;
  fornecedorId?: number;
  leiteId?: number;
  laticinioId?: number;
  descricao: string;
  itens: ItemTransacao[];
}
