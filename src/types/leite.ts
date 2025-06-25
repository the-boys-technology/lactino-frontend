import { CampoConfig } from "./campos";

const camposLeite: CampoConfig[] = [
  { name: "nome",        type: "text",  placeholder: "Nome" },
  { name: "descricao",   type: "text",  placeholder: "Descrição" },
  { name: "dataObtencao",type: "date",  placeholder: "Data de obtenção" },
  { name: "origem",      type: "text",  placeholder: "Origem" },
  {
    name: "turno",
    type: "select",
    label: "Turno:",
    options: [
      { label: "Matutino",   value: "MATUTINO" },
      { label: "Vespertino", value: "VESPERTINO" },
      { label: "Noturno",    value: "NOTURNO" }
    ]
  },
  //{ name: "dataValidade",    type: "date",  placeholder: "Data de validade" },
  {
    name: "status",
    type: "select",
    label: "Status:",
    options: [
      { label: "Disponível", value: "DISPONIVEL" },
      { label: "Utilizado",  value: "UTILIZADO" },
      { label: "Vencido",    value: "VENCIDO" },
      { label: "Descartado", value: "DESCARTADO" }
    ]
  },
  { name: "finalidade",  type: "text",  placeholder: "Finalidade" },
  { name: "fornecedorId",  type: "text",  placeholder: "Fornecedor" }
];
