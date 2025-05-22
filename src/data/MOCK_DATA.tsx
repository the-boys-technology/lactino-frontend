export type RowData = {
  id: number;
  data_de_obtencao: string;
  data_de_validade: string;
  nome: string;
  origem: string;
  fornecedor: string;
  turno: string;
  finalidade: string;
  descricao: string;
  status: string;
};

export const MOCK_DATA: RowData[] = [
  {
    id: 1,
    nome: "Leite Integral",
    descricao: "Leite com sabor suave e textura aveludada, ideal para consumo diário.",
    data_de_obtencao: "2025-05-10T07:30:00Z",
    origem: "Fazenda Aurora",
    turno: "Matutino",
    data_de_validade: "2025-05-20T23:59:59Z",
    status: "Disponível",
    finalidade: "Consumo",
    fornecedor: "Fazenda Aurora"
  },
  {
    id: 2,
    nome: "Leite Desnatado",
    descricao: "Bebida láctea leve e refrescante, com aroma delicado de capim fresco.",
    data_de_obtencao: "2025-05-11T14:45:00Z",
    origem: "Laticínios Brasil",
    turno: "Vespertino",
    data_de_validade: "2025-05-18T23:59:59Z",
    status: "Utilizado",
    finalidade: "Processamento",
    fornecedor: "Laticínios Brasil"
  },
  {
    id: 3,
    nome: "Leite Zero Lactose",
    descricao: "Formulação sem lactose, com consistência cremosa e sabor doce moderado.",
    data_de_obtencao: "2025-05-09T20:15:00Z",
    origem: "Fazenda Verde",
    turno: "Noturno",
    data_de_validade: "2025-05-16T23:59:59Z",
    status: "Disponível",
    finalidade: "Venda",
    fornecedor: "Fazenda Verde"
  },
  {
    id: 4,
    nome: "Leite Orgânico",
    descricao: "Leite orgânico com notas de pastagem natural e leve acidez equilibrada.",
    data_de_obtencao: "2025-04-25T06:10:00Z",
    origem: "EcoMilk",
    turno: "Matutino",
    data_de_validade: "2025-05-05T23:59:59Z",
    status: "Vencido",
    finalidade: "Consumo",
    fornecedor: "EcoMilk"
  },
  {
    id: 5,
    nome: "Iogurte Natural",
    descricao: "Iogurte encorpado com toque levemente ácido e consistência firme.",
    data_de_obtencao: "2025-05-12T08:00:00Z",
    origem: "Fazenda do Vale",
    turno: "Matutino",
    data_de_validade: "2025-05-17T23:59:59Z",
    status: "Descartado",
    finalidade: "Consumo",
    fornecedor: "Fazenda do Vale"
  },
  {
    id: 6,
    nome: "Manteiga Cremosa",
    descricao: "Manteiga macia com aroma amanteigado intenso e sabor rico e cremoso.",
    data_de_obtencao: "2025-05-11T19:30:00Z",
    origem: "Laticínios Sul",
    turno: "Noturno",
    data_de_validade: "2025-06-01T23:59:59Z",
    status: "Disponível",
    finalidade: "Culinária",
    fornecedor: "Laticínios Sul"
  },
  {
    id: 7,
    nome: "Creme de Leite",
    descricao: "Creme de leite fluido, perfeito para dar cremosidade a receitas culinárias.",
    data_de_obtencao: "2025-05-13T15:20:00Z",
    origem: "Fazenda Bela",
    turno: "Vespertino",
    data_de_validade: "2025-05-25T23:59:59Z",
    status: "Disponível",
    finalidade: "Culinária",
    fornecedor: "Fazenda Bela"
  },
  {
    id: 8,
    nome: "Queijo Minas Frescal",
    descricao: "Queijo fresco de textura macia e sabor levemente cítrico, ideal para lanches.",
    data_de_obtencao: "2025-05-12T16:50:00Z",
    origem: "Queijaria Pires",
    turno: "Vespertino",
    data_de_validade: "2025-05-22T23:59:59Z",
    status: "Utilizado",
    finalidade: "Venda",
    fornecedor: "Queijaria Pires"
  },
  {
    id: 9,
    nome: "Leite em Pó",
    descricao: "Leite em pó granuloso, fácil de dissolver, com sabor próximo ao fresco.",
    data_de_obtencao: "2025-05-08T10:10:00Z",
    origem: "Laticínios Premium",
    turno: "Matutino",
    data_de_validade: "2026-05-08T23:59:59Z",
    status: "Disponível",
    finalidade: "Industrialização",
    fornecedor: "Laticínios Premium"
  },
  {
    id: 10,
    nome: "Ricota Artesanal",
    descricao: "Ricota artesanal de textura leve, com sabor suave e fresco.",
    data_de_obtencao: "2025-05-09",
    origem: "Queijos da Serra",
    turno: "Noturno",
    data_de_validade: "2025-05-19T23:59:59Z",
    status: "Vencido",
    finalidade: "Venda",
    fornecedor: "Queijos da Serra"
  }
];
