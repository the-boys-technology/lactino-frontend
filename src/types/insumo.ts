export interface Insumo {
  id: string;
  nome: string;
  categoria: 'Ração' | 'Remédios' | 'Outros' | string;
  unidadeMedida: string;
  quantidadeTotal: number;
  quantidadeMinima: number;
  validade: string;
  preco: number;
  fornecedor: string; 
  status: 'Ativo' | 'Vencido' | 'Esgotado' | string;
}