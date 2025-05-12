export type TipoInsumo = "Medicamento" | "Ração" | "Vacina" | "Outro";
export type FormaPagamento = "Dinheiro" | "Cartão" | "Boleto" | "Pix" | "Outro";

export interface Compra {
  tipoInsumo: TipoInsumo;
  produto: string;
  dataCompra: Date;
  formaPagamento: FormaPagamento;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  validadeProduto: Date;
  fornecedor: string;
  observacao: string;
}