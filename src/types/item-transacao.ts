export enum CategoriaItem {
  LEITE = "LEITE",
  LATICINIO = "LATICINIO",
  INSUMO = "INSUMO",
}

export interface ItemTransacao {
  id: number;
  transacaoId: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  categoria: CategoriaItem;
}