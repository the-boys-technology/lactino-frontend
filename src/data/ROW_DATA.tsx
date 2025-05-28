export type RowData = {
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
};
