export interface ItemRelatorio {
  produtoId: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface RelatorioPedidoTipo {
  transacaoId: string;
  data: string;
  clienteNome?: string;
  clienteEmail?: string;
  clienteLocalizacao?: string;
  fornecedorNome?: string;
  fornecedorEmail?: string;
  fornecedorLocalizacao?: string;
  formaPagamento: string;
  valorTotal: number;
  descricao: string;
  itens: ItemRelatorio[];
}