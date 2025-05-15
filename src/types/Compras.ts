export enum TipoInsumo {
  "Medicamento",
  "Ração",
  "Vacina",
  "Leite",
  "Queijo",
  "Outro",
}
export enum FormaPagamento {
  "Dinheiro",
  "Cartão",
  "Boleto",
  "Pix",
  "Outro",
}

export interface Compra {
  tipoInsumo?: TipoInsumo | undefined;
  produto: string;
  dataCompra: Date;
  formaPagamento?: FormaPagamento | undefined;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  validadeProduto: Date;
  fornecedor: string | undefined;
  observacao?: string;
}