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

export enum CategoriaItem {
  LEITE = "LEITE",
  LATICINIO = "LATICINIO",
  INSUMO = "INSUMO",
}

export interface Transacao {
  id: number;
  tipo: TipoTransacao;
  data: string; // ISO Date string
  valorTotal: number;
  formaPagamento: FormaPagamento;
  clienteId?: number;
  fornecedorId?: number;
  leiteId?: number;
  laticinioId?: number;
  descricao: string;
  itens: ItemTransacao[];
}

export interface ItemTransacao {
  id: number;
  transacaoId: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  categoria: CategoriaItem;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  localizacao: string;
  transacoes?: Transacao[];
}

export interface Fornecedor {
  id: number;
  nome: string;
  email: string;
  localizacao: string;
  transacoes?: Transacao[];
}
