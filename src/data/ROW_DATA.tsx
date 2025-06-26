export type RowDataLeite = {
  id: string;                   
  nome: string;
  descricao: string;
  dataObtencao: string;         
  dataValidade: string;
  origem: string;
  turno: "MATUTINO" | "VESPERTINO" | "NOTURNO";
  status: "DISPONIVEL" | "UTILIZADO" | "VENCIDO" | "DESCARTADO";
  finalidade: string;
  fornecedorId: string;
  fornecedor?: {
    nome: string;
    email: string;
    localizacao: string;
  };
};

export type RowDataLaticinio = {
  id: string;                   
  nome: string;
  descricao: string;
  dataProducao: string;         
  dataValidade: string;
  tipoProduto: string;
  status: "DISPONIVEL" | "VENDIDO" | "VENCIDO" | "DESCARTADO";
  leite?: Pick<RowDataLeite, 'nome' | 'origem'>;
  leiteUtilizadoId: string;
};
