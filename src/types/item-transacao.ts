export enum CategoriaItem {
  LEITE = "LEITE",
  LATICINIO = "LATICINIO",
  INSUMO = "INSUMO",
}

export interface ItemTransacao {
  [x: string]: any;
  id: number;
  transacaoId: number;
  produtoId: string | undefined;
  quantidade: number;
  precoUnitario: number;
  categoria: CategoriaItem;
  unidadeDeMedida: string | undefined;
}